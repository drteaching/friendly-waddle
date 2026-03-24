import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CpdActivity } from './entities/cpd-activity.entity';

@Injectable()
export class CpdService {
  constructor(
    @InjectRepository(CpdActivity)
    private readonly activityRepo: Repository<CpdActivity>,
  ) {}

  /** Log a new CPD activity. */
  async logActivity(data: Partial<CpdActivity>): Promise<CpdActivity> {
    const activity = this.activityRepo.create(data);
    return this.activityRepo.save(activity);
  }

  /** List CPD activities with optional filtering by practitioner or organisation. */
  async getActivities(filters: {
    practitionerId?: string;
    organisationId?: string;
  }): Promise<CpdActivity[]> {
    const where: any = {};
    if (filters.practitionerId) where.practitionerId = filters.practitionerId;
    if (filters.organisationId) where.organisationId = filters.organisationId;
    return this.activityRepo.find({ where, order: { activityDate: 'DESC' } });
  }

  /** Retrieve a CPD activity by ID. */
  async getActivityById(id: string): Promise<CpdActivity> {
    const activity = await this.activityRepo.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`CPD activity ${id} not found`);
    }
    return activity;
  }

  /** Update a CPD activity. */
  async updateActivity(id: string, data: Partial<CpdActivity>): Promise<CpdActivity> {
    const activity = await this.getActivityById(id);
    Object.assign(activity, data);
    return this.activityRepo.save(activity);
  }

  /** Soft-delete a CPD activity. */
  async deleteActivity(id: string): Promise<void> {
    const activity = await this.getActivityById(id);
    await this.activityRepo.softRemove(activity);
  }

  /**
   * Retrieve the full CPD record for a practitioner.
   * Includes total hours, verified hours, and a breakdown by activity type
   * for the current calendar year.
   */
  async getRecord(practitionerId: string): Promise<{
    practitionerId: string;
    totalHours: number;
    verifiedHours: number;
    byActivityType: Record<string, number>;
    currentYear: number;
    activities: CpdActivity[];
  }> {
    const currentYear = new Date().getFullYear();
    const activities = await this.activityRepo
      .createQueryBuilder('cpd')
      .where('cpd.practitionerId = :practitionerId', { practitionerId })
      .andWhere('EXTRACT(YEAR FROM cpd.activityDate) = :year', { year: currentYear })
      .orderBy('cpd.activityDate', 'DESC')
      .getMany();

    let totalHours = 0;
    let verifiedHours = 0;
    const byActivityType: Record<string, number> = {};

    for (const activity of activities) {
      const hours = Number(activity.cpdHours);
      totalHours += hours;
      if (activity.status === 'verified') {
        verifiedHours += hours;
      }
      byActivityType[activity.activityType] =
        (byActivityType[activity.activityType] || 0) + hours;
    }

    return {
      practitionerId,
      totalHours: Math.round(totalHours * 100) / 100,
      verifiedHours: Math.round(verifiedHours * 100) / 100,
      byActivityType,
      currentYear,
      activities,
    };
  }

  /**
   * Generate a quarterly CPD report for a practitioner.
   * Summarises activities, total hours, and identifies areas where
   * the practitioner may need additional development.
   */
  async generateQuarterlyReport(
    practitionerId: string,
    quarter?: number,
    year?: number,
  ): Promise<{
    practitionerId: string;
    reportPeriod: string;
    quarter: number;
    year: number;
    totalHours: number;
    verifiedHours: number;
    byActivityType: Record<string, number>;
    activitiesCount: number;
    suggestedFocusAreas: string[];
  }> {
    const now = new Date();
    const reportYear = year || now.getFullYear();
    const reportQuarter = quarter || Math.floor(now.getMonth() / 3) + 1;

    // Calculate quarter date boundaries
    const quarterStartMonth = (reportQuarter - 1) * 3;
    const startDate = new Date(reportYear, quarterStartMonth, 1);
    const endDate = new Date(reportYear, quarterStartMonth + 3, 0);

    const activities = await this.activityRepo
      .createQueryBuilder('cpd')
      .where('cpd.practitionerId = :practitionerId', { practitionerId })
      .andWhere('cpd.activityDate >= :startDate', { startDate: startDate.toISOString().split('T')[0] })
      .andWhere('cpd.activityDate <= :endDate', { endDate: endDate.toISOString().split('T')[0] })
      .orderBy('cpd.activityDate', 'DESC')
      .getMany();

    let totalHours = 0;
    let verifiedHours = 0;
    const byActivityType: Record<string, number> = {};

    for (const activity of activities) {
      const hours = Number(activity.cpdHours);
      totalHours += hours;
      if (activity.status === 'verified') {
        verifiedHours += hours;
      }
      byActivityType[activity.activityType] =
        (byActivityType[activity.activityType] || 0) + hours;
    }

    // Identify suggested focus areas based on ASPIRE requirements
    const suggestedFocusAreas: string[] = [];
    const expectedTypes = ['conference', 'workshop', 'case_review', 'audit', 'teaching'];
    for (const expectedType of expectedTypes) {
      if (!byActivityType[expectedType]) {
        suggestedFocusAreas.push(
          `Consider recording ${expectedType.replace('_', ' ')} activities to broaden your CPD profile`,
        );
      }
    }

    // Check minimum quarterly hours threshold (12.5 hours per quarter = 50 per year)
    if (totalHours < 12.5) {
      suggestedFocusAreas.push(
        `You have recorded ${totalHours} hours this quarter. The recommended minimum is 12.5 hours per quarter to achieve 50 hours annually.`,
      );
    }

    return {
      practitionerId,
      reportPeriod: `Q${reportQuarter} ${reportYear}`,
      quarter: reportQuarter,
      year: reportYear,
      totalHours: Math.round(totalHours * 100) / 100,
      verifiedHours: Math.round(verifiedHours * 100) / 100,
      byActivityType,
      activitiesCount: activities.length,
      suggestedFocusAreas,
    };
  }
}
