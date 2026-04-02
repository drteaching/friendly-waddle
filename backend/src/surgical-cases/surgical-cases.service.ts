import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { SurgicalCase } from './entities/surgical-case.entity';
import { PromsResponse } from './entities/proms-response.entity';
import { CreateCaseDto } from './dto/create-case.dto';

/** Standard PROMS collection intervals in days after the procedure date. */
const COLLECTION_INTERVALS: Record<string, number> = {
  pre_operative: -1,
  '6_weeks': 42,
  '6_months': 182,
  '12_months': 365,
};

@Injectable()
export class SurgicalCasesService {
  constructor(
    @InjectRepository(SurgicalCase)
    private readonly caseRepo: Repository<SurgicalCase>,
    @InjectRepository(PromsResponse)
    private readonly promsRepo: Repository<PromsResponse>,
  ) {}

  /** Record a new surgical case. */
  async createCase(dto: CreateCaseDto): Promise<SurgicalCase> {
    const surgicalCase = this.caseRepo.create({
      ...dto,
      procedureDate: new Date(dto.procedureDate),
    });
    return this.caseRepo.save(surgicalCase);
  }

  /** List surgical cases with optional filtering by organisation or surgeon. */
  async getCases(filters: {
    organisationId?: string;
    surgeonId?: string;
  }): Promise<SurgicalCase[]> {
    const where: any = {};
    if (filters.organisationId) where.organisationId = filters.organisationId;
    if (filters.surgeonId) where.surgeonId = filters.surgeonId;
    return this.caseRepo.find({ where, order: { procedureDate: 'DESC' } });
  }

  /** Retrieve a single surgical case by ID. */
  async getCaseById(id: string): Promise<SurgicalCase> {
    const surgicalCase = await this.caseRepo.findOne({ where: { id } });
    if (!surgicalCase) {
      throw new NotFoundException(`Surgical case ${id} not found`);
    }
    return surgicalCase;
  }

  /** Update surgical case details. */
  async updateCase(id: string, data: Partial<SurgicalCase>): Promise<SurgicalCase> {
    const surgicalCase = await this.getCaseById(id);
    Object.assign(surgicalCase, data);
    return this.caseRepo.save(surgicalCase);
  }

  /**
   * Schedule PROMS collection for a surgical case at standard intervals.
   * Creates pending questionnaire entries for each collection point.
   */
  async scheduleProms(
    surgicalCaseId: string,
    data: {
      patientId: string;
      procedureDate: string;
      questionnaireType?: string;
    },
  ): Promise<PromsResponse[]> {
    // Verify the case exists
    await this.getCaseById(surgicalCaseId);

    const procedureDate = new Date(data.procedureDate);
    const questionnaireType = data.questionnaireType || 'EHP-30';
    const responses: PromsResponse[] = [];

    for (const [collectionPoint, daysOffset] of Object.entries(COLLECTION_INTERVALS)) {
      const dueDate = new Date(procedureDate);
      dueDate.setDate(dueDate.getDate() + daysOffset);

      const response = this.promsRepo.create({
        surgicalCaseId,
        patientId: data.patientId,
        collectionPoint,
        questionnaireType,
        dueDate,
        status: collectionPoint === 'pre_operative' ? 'sent' : 'pending',
        responses: {},
      });
      responses.push(await this.promsRepo.save(response));
    }

    return responses;
  }

  /** Record a patient's PROMS response. */
  async recordPromsResponse(
    responseId: string,
    data: {
      responses: Record<string, any>;
      totalScore?: number;
    },
  ): Promise<PromsResponse> {
    const response = await this.promsRepo.findOne({ where: { id: responseId } });
    if (!response) {
      throw new NotFoundException(`PROMS response ${responseId} not found`);
    }

    response.responses = data.responses;
    if (data.totalScore !== undefined) {
      response.totalScore = data.totalScore;
    }
    response.status = 'completed';
    response.completedAt = new Date();

    return this.promsRepo.save(response);
  }

  /** Retrieve all PROMS responses for a given surgical case. */
  async getPromsResponses(surgicalCaseId: string): Promise<PromsResponse[]> {
    return this.promsRepo.find({
      where: { surgicalCaseId },
      order: { dueDate: 'ASC' },
    });
  }

  /**
   * Generate an aggregated outcome dashboard for surgical cases.
   * Summarises key metrics including complication rates, operative times,
   * and PROMS completion rates.
   */
  async getOutcomeDashboard(organisationId?: string): Promise<{
    totalCases: number;
    averageOperativeTimeMinutes: number;
    complicationRate: number;
    promsCompletionRate: number;
    casesByStage: Record<string, number>;
  }> {
    const where: any = {};
    if (organisationId) where.organisationId = organisationId;

    const cases = await this.caseRepo.find({ where });
    const totalCases = cases.length;

    // Calculate average operative time
    const casesWithTime = cases.filter((c) => c.operativeTimeMinutes != null);
    const averageOperativeTimeMinutes = casesWithTime.length > 0
      ? Math.round(
          casesWithTime.reduce((sum, c) => sum + (c.operativeTimeMinutes || 0), 0) /
          casesWithTime.length,
        )
      : 0;

    // Calculate complication rate
    const casesWithComplications = cases.filter(
      (c) => c.complicationGrade !== 'none',
    ).length;
    const complicationRate = totalCases > 0
      ? Math.round((casesWithComplications / totalCases) * 100 * 100) / 100
      : 0;

    // Calculate PROMS completion rate
    const caseIds = cases.map((c) => c.id);
    let promsCompletionRate = 0;
    if (caseIds.length > 0) {
      const allProms = await this.promsRepo
        .createQueryBuilder('proms')
        .where('proms.surgicalCaseId IN (:...caseIds)', { caseIds })
        .getMany();
      const completedProms = allProms.filter((p) => p.status === 'completed').length;
      promsCompletionRate = allProms.length > 0
        ? Math.round((completedProms / allProms.length) * 100 * 100) / 100
        : 0;
    }

    // Group cases by endometriosis stage
    const casesByStage: Record<string, number> = {};
    for (const c of cases) {
      const stage = c.endometriosisStage || 'unspecified';
      casesByStage[stage] = (casesByStage[stage] || 0) + 1;
    }

    return {
      totalCases,
      averageOperativeTimeMinutes,
      complicationRate,
      promsCompletionRate,
      casesByStage,
    };
  }
}
