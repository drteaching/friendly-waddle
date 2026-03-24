import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistryEntry } from './entities/registry-entry.entity';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(RegistryEntry)
    private readonly entryRepo: Repository<RegistryEntry>,
  ) {}

  /** Create a new registry entry. */
  async createEntry(data: Partial<RegistryEntry>): Promise<RegistryEntry> {
    const entry = this.entryRepo.create(data);
    return this.entryRepo.save(entry);
  }

  /** List registry entries with optional filtering. */
  async getEntries(filters: {
    organisationId?: string;
    registryType?: string;
  }): Promise<RegistryEntry[]> {
    const where: any = {};
    if (filters.organisationId) where.organisationId = filters.organisationId;
    if (filters.registryType) where.registryType = filters.registryType;
    return this.entryRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  /** Retrieve a registry entry by ID. */
  async getEntryById(id: string): Promise<RegistryEntry> {
    const entry = await this.entryRepo.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException(`Registry entry ${id} not found`);
    }
    return entry;
  }

  /** Update a registry entry. */
  async updateEntry(id: string, data: Partial<RegistryEntry>): Promise<RegistryEntry> {
    const entry = await this.getEntryById(id);
    Object.assign(entry, data);
    return this.entryRepo.save(entry);
  }

  /**
   * Retrieve benchmarking data across participating centres.
   * Aggregates de-identified outcome data to allow centres to compare
   * their performance against the national average.
   */
  async getBenchmarks(registryType?: string): Promise<{
    totalEntries: number;
    totalCentres: number;
    averageAge: number;
    stageDistribution: Record<string, number>;
    averageOutcomes: Record<string, number>;
  }> {
    const where: any = { isDeIdentified: true };
    if (registryType) where.registryType = registryType;

    const entries = await this.entryRepo.find({ where });

    const totalEntries = entries.length;
    const centreIds = new Set(entries.map((e) => e.organisationId));
    const totalCentres = centreIds.size;

    // Average patient age
    const agesAtProcedure = entries
      .filter((e) => e.patientAgeAtProcedure != null)
      .map((e) => e.patientAgeAtProcedure!);
    const averageAge = agesAtProcedure.length > 0
      ? Math.round(
          agesAtProcedure.reduce((sum, age) => sum + age, 0) / agesAtProcedure.length,
        )
      : 0;

    // Stage distribution
    const stageDistribution: Record<string, number> = {};
    for (const entry of entries) {
      const stage = entry.endometriosisStage || 'unspecified';
      stageDistribution[stage] = (stageDistribution[stage] || 0) + 1;
    }

    // Aggregate average outcomes from JSONB outcome data
    const averageOutcomes: Record<string, number> = {};
    // TODO: Implement specific outcome metric aggregation based on registry requirements

    return {
      totalEntries,
      totalCentres,
      averageAge,
      stageDistribution,
      averageOutcomes,
    };
  }
}
