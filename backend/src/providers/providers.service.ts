import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Organisation } from './entities/organisation.entity';
import { Practitioner } from './entities/practitioner.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationRepo: Repository<Organisation>,
    @InjectRepository(Practitioner)
    private readonly practitionerRepo: Repository<Practitioner>,
  ) {}

  // ---- Organisation methods ----

  /** Register a new healthcare organisation. */
  async createOrganisation(data: Partial<Organisation>): Promise<Organisation> {
    const organisation = this.organisationRepo.create(data);
    return this.organisationRepo.save(organisation);
  }

  /** List organisations with optional search filtering. */
  async getOrganisations(search?: string): Promise<Organisation[]> {
    if (search) {
      return this.organisationRepo.find({
        where: { name: Like(`%${search}%`) },
        order: { name: 'ASC' },
      });
    }
    return this.organisationRepo.find({ order: { name: 'ASC' } });
  }

  /** Retrieve an organisation by its UUID. */
  async getOrganisationById(id: string): Promise<Organisation> {
    const organisation = await this.organisationRepo.findOne({ where: { id } });
    if (!organisation) {
      throw new NotFoundException(`Organisation ${id} not found`);
    }
    return organisation;
  }

  /** Update an existing organisation's details. */
  async updateOrganisation(id: string, data: Partial<Organisation>): Promise<Organisation> {
    const organisation = await this.getOrganisationById(id);
    Object.assign(organisation, data);
    return this.organisationRepo.save(organisation);
  }

  /** Soft-delete an organisation. */
  async deleteOrganisation(id: string): Promise<void> {
    const organisation = await this.getOrganisationById(id);
    await this.organisationRepo.softRemove(organisation);
  }

  // ---- Practitioner methods ----

  /** Register a new practitioner. */
  async createPractitioner(data: Partial<Practitioner>): Promise<Practitioner> {
    const practitioner = this.practitionerRepo.create(data);
    return this.practitionerRepo.save(practitioner);
  }

  /** List practitioners with optional organisation filtering. */
  async getPractitioners(organisationId?: string): Promise<Practitioner[]> {
    const where: any = {};
    if (organisationId) {
      where.organisationId = organisationId;
    }
    return this.practitionerRepo.find({ where, order: { lastName: 'ASC' } });
  }

  /** Retrieve a practitioner by their UUID. */
  async getPractitionerById(id: string): Promise<Practitioner> {
    const practitioner = await this.practitionerRepo.findOne({ where: { id } });
    if (!practitioner) {
      throw new NotFoundException(`Practitioner ${id} not found`);
    }
    return practitioner;
  }

  /** Update an existing practitioner's details. */
  async updatePractitioner(id: string, data: Partial<Practitioner>): Promise<Practitioner> {
    const practitioner = await this.getPractitionerById(id);
    Object.assign(practitioner, data);
    return this.practitionerRepo.save(practitioner);
  }

  /** Soft-delete a practitioner. */
  async deletePractitioner(id: string): Promise<void> {
    const practitioner = await this.getPractitionerById(id);
    await this.practitionerRepo.softRemove(practitioner);
  }
}
