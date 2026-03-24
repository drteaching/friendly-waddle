/**
 * Patient EndoPassport types for the patient-facing portal.
 * Covers consent management, journey timeline, symptom diaries,
 * PROMs responses, and data sharing preferences.
 *
 * The EndoPassport is the patient's portable health record within the
 * ASPIRE ecosystem, ensuring continuity of care across network centres.
 */

/**
 * The patient's comprehensive endometriosis health passport.
 * Aggregates all patient-facing data into a single portable record
 * that travels with the patient across ASPIRE network centres.
 */
export interface EndoPassport {
  patientId: string;
  consents: PatientConsent[];
  journeyEntries: JourneyEntry[];
  symptomDiaries: SymptomDiaryEntry[];
  clinicalSummaries: ClinicalSummary[];
  carePlans: any[];
  promsHistory: PromsResponse[];
  myProviders: ProviderLink[];
  dataSharingPreferences: DataSharingPreference[];
}

export type ConsentScope = 'clinical_data' | 'registry_deidentified' | 'research_identified' | 'ai_consultation' | 'ai_surgical_audit' | 'video_storage' | 'video_teaching';
export type ConsentStatus = 'active' | 'revoked' | 'expired';

export interface PatientConsent {
  id: string;
  scope: ConsentScope;
  grantedTo: string;
  status: ConsentStatus;
  grantedAt: Date;
  revokedAt?: Date;
  expiresAt?: Date;
}

export interface JourneyEntry {
  id: string;
  date: Date;
  type: 'consultation' | 'surgery' | 'imaging' | 'proms' | 'symptom_update' | 'note';
  title: string;
  summary: string;
  providerRef?: string;
  linkedResourceRef?: string;
}

export interface SymptomDiaryEntry {
  id: string;
  date: Date;
  painScore: number;
  symptoms: string[];
  notes?: string;
}

export interface ClinicalSummary {
  id: string;
  date: Date;
  providerRef: string;
  summary: string;
  carePlanRef?: string;
}

export interface ProviderLink {
  id: string;
  practitionerId: string;
  practitionerName: string;
  role: string;
  organisationName: string;
  addedAt: Date;
}

export type DataCategory = 'symptom_diary' | 'surgical_records' | 'proms' | 'imaging' | 'consultation_notes' | 'fertility_data';
export type SharingLevel = 'none' | 'my_network_only' | 'deidentified_research' | 'all_consented';

export interface DataSharingPreference {
  dataCategory: DataCategory;
  defaultSharing: SharingLevel;
  overrides: { organisationId: string; sharing: SharingLevel }[];
}

/**
 * A completed patient-reported outcome measure (PROMs) response.
 * PROMs are critical for measuring treatment effectiveness and
 * contributing to national/international outcome registries.
 */
export interface PromsResponse {
  id: string;
  /** Reference to the patient who completed the questionnaire. */
  patientRef: string;
  /** Reference to the associated surgical case, if applicable. */
  caseRef?: string;
  /** The PROMs instrument used. */
  instrument: 'EHP5' | 'EHP30' | 'PROMIS' | 'PGI_I' | 'EQ5D' | 'QoR15';
  /** Raw response data keyed by question identifier. */
  responses: Record<string, number | string>;
  /** Calculated total or composite score. */
  totalScore: number;
  /** When the patient completed the questionnaire. */
  completedAt: Date;
  /** Timepoint relative to surgery (e.g., 'baseline', '6_weeks', '6_months', '12_months'). */
  timepoint: string;
}
