import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Patient } from './entities/patient.entity';
import { PatientConsent } from './entities/patient-consent.entity';

@Injectable()
export class PatientPassportService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(PatientConsent)
    private readonly consentRepo: Repository<PatientConsent>,
  ) {}

  /** Register a new patient on the platform. */
  async createPatient(data: Partial<Patient>): Promise<Patient> {
    const patient = this.patientRepo.create(data);
    return this.patientRepo.save(patient);
  }

  /** Retrieve a patient by ID. */
  async getPatientById(id: string): Promise<Patient> {
    const patient = await this.patientRepo.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient ${id} not found`);
    }
    return patient;
  }

  /** Update patient details. */
  async updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
    const patient = await this.getPatientById(id);
    Object.assign(patient, data);
    return this.patientRepo.save(patient);
  }

  /**
   * Retrieve the patient passport - a consolidated summary view of the
   * patient's clinical journey, consent status, and provider relationships.
   */
  async getPassport(patientId: string): Promise<{
    patient: Patient;
    consentSummary: Record<string, { granted: boolean; grantedAt: Date | null; expiryDate: Date | null }>;
    sharedProviders: Array<{ organisationId: string; dataCategories: string[]; sharedAt: Date }>;
  }> {
    const patient = await this.getPatientById(patientId);
    const consentSummary = await this.getConsentSummary(patientId);
    const sharedProviders = patient.sharedProviders || [];

    return {
      patient,
      consentSummary,
      sharedProviders,
    };
  }

  /**
   * Record or update a consent decision for a patient.
   */
  async updateConsent(
    patientId: string,
    data: Partial<PatientConsent>,
  ): Promise<PatientConsent> {
    await this.getPatientById(patientId);
    const consent = this.consentRepo.create({
      ...data,
      patientId,
      grantedAt: data.isGranted ? new Date() : null,
    });
    return this.consentRepo.save(consent);
  }

  /** Retrieve all consent records for a patient. */
  async getConsents(patientId: string): Promise<PatientConsent[]> {
    return this.consentRepo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Add a journey entry to the patient's endometriosis timeline.
   * Journey entries are stored as JSONB on the patient record.
   */
  async addJourneyEntry(
    patientId: string,
    entry: {
      entryType: string;
      title: string;
      description?: string;
      entryDate: string;
      practitionerId?: string;
      organisationId?: string;
      metadata?: Record<string, any>;
    },
  ): Promise<Patient> {
    const patient = await this.getPatientById(patientId);
    const journeyTimeline = patient.journeyTimeline || [];
    journeyTimeline.push({
      ...entry,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    });
    patient.journeyTimeline = journeyTimeline;
    return this.patientRepo.save(patient);
  }

  /** Retrieve the full journey timeline for a patient, ordered chronologically. */
  async getJourneyTimeline(patientId: string): Promise<any[]> {
    const patient = await this.getPatientById(patientId);
    const timeline = patient.journeyTimeline || [];
    return timeline.sort(
      (a: any, b: any) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
    );
  }

  /** List providers the patient has shared their data with. */
  async getMyProviders(patientId: string): Promise<
    Array<{ organisationId: string; dataCategories: string[]; sharedAt: Date }>
  > {
    const patient = await this.getPatientById(patientId);
    return patient.sharedProviders || [];
  }

  /**
   * Share patient data with a provider organisation.
   * Records the sharing relationship and the categories of data shared.
   */
  async shareWithProvider(
    patientId: string,
    organisationId: string,
    dataCategories: string[],
  ): Promise<Patient> {
    const patient = await this.getPatientById(patientId);
    const sharedProviders = patient.sharedProviders || [];

    // Check for existing sharing relationship
    const existingIndex = sharedProviders.findIndex(
      (p: any) => p.organisationId === organisationId,
    );

    if (existingIndex >= 0) {
      // Update existing sharing
      sharedProviders[existingIndex].dataCategories = dataCategories;
    } else {
      // Create new sharing relationship
      sharedProviders.push({
        organisationId,
        dataCategories,
        sharedAt: new Date(),
      });
    }

    patient.sharedProviders = sharedProviders;
    return this.patientRepo.save(patient);
  }

  /**
   * Revoke data access for a provider organisation.
   * Removes the sharing relationship entirely.
   */
  async revokeProviderAccess(
    patientId: string,
    organisationId: string,
  ): Promise<Patient> {
    const patient = await this.getPatientById(patientId);
    const sharedProviders = (patient.sharedProviders || []).filter(
      (p: any) => p.organisationId !== organisationId,
    );
    patient.sharedProviders = sharedProviders;
    return this.patientRepo.save(patient);
  }

  /**
   * Export all patient data for data portability purposes.
   * Compiles the patient record, consent history, journey timeline,
   * and provider sharing information into a single export package.
   */
  async exportMyData(patientId: string): Promise<{
    exportDate: string;
    patient: Patient;
    consents: PatientConsent[];
    journeyTimeline: any[];
    sharedProviders: any[];
  }> {
    const patient = await this.getPatientById(patientId);
    const consents = await this.getConsents(patientId);
    const journeyTimeline = await this.getJourneyTimeline(patientId);

    return {
      exportDate: new Date().toISOString(),
      patient,
      consents,
      journeyTimeline,
      sharedProviders: patient.sharedProviders || [],
    };
  }

  // ---- Internal consent evaluation helpers ----

  /** Evaluate all active consents for a patient and return a summary. */
  private async getConsentSummary(
    patientId: string,
  ): Promise<Record<string, { granted: boolean; grantedAt: Date | null; expiryDate: Date | null }>> {
    const consents = await this.consentRepo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });

    const summary: Record<string, { granted: boolean; grantedAt: Date | null; expiryDate: Date | null }> = {};
    const seen = new Set<string>();

    for (const consent of consents) {
      if (seen.has(consent.consentType)) continue;
      seen.add(consent.consentType);

      const isExpired = consent.expiryDate && new Date(consent.expiryDate) < new Date();
      const isActive = consent.isGranted && !consent.withdrawnAt && !isExpired;

      summary[consent.consentType] = {
        granted: !!isActive,
        grantedAt: consent.grantedAt,
        expiryDate: consent.expiryDate,
      };
    }

    return summary;
  }
}
