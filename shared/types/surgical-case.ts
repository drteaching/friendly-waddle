// Surgical case types for recording endometriosis procedures
// Supports ENZIAN classification, ASRM staging, and PROMs scheduling

export interface SurgicalCase {
  id: string;
  patientRef: string;
  surgeonRef: string;
  organisationRef: string;
  procedureDate: Date;
  procedureType: string;
  indication: string;
  approach: 'laparoscopic' | 'robotic' | 'open' | 'combined';
  collaboratingSurgeons: string[];
  complications: ComplicationEntry[];
  outcome: 'complete_excision' | 'partial_excision' | 'diagnostic_only' | 'abandoned';
  enzianClassification?: EnzianScore;
  asrmStage?: 'I' | 'II' | 'III' | 'IV';
  efi?: number;
  operativeTime: number;
  bloodLoss: number;
  videoId?: string;
  auditAiSessionId?: string;
  promsSchedule: PromsScheduleEntry[];
}

export interface EnzianScore {
  compartmentA: { left: number; right: number };
  compartmentB: { left: number; right: number };
  compartmentC: number;
  compartmentF: { locations: string[] };
  compartmentO: { left: boolean; right: boolean };
  compartmentT: { left: string; right: string };
  compartmentP: number;
}

export interface ComplicationEntry {
  id: string;
  type: string;
  severity: 'minor' | 'major';
  description: string;
  managedBy?: string;
}

export interface PromsScheduleEntry {
  instrument: 'EHP5' | 'EHP30' | 'PROMIS' | 'PGI_I' | 'EQ5D' | 'QoR15';
  scheduledAt: Date;
  sentAt?: Date;
  completedAt?: Date;
  responseRef?: string;
}
