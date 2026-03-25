// AI Orchestration types for consultation and surgical audit AI assistants
// Covers ambient clinical documentation, surgical safety checklists, and video augmentation

export type AiSessionStatus = 'initiated' | 'listening' | 'processing' | 'draft_ready' | 'clinician_reviewed' | 'finalised';
export type AuditSessionStatus = 'standby' | 'active' | 'paused' | 'completed';

export interface AiConsultationSession {
  id: string;
  practitionerRef: string;
  patientRef: string;
  status: AiSessionStatus;
  startedAt: Date;
  endedAt?: Date;
  patientConsentRef: string;
  practitionerOptIn: boolean;
  draftNote: {
    content: string;
    format: 'soap' | 'custom';
    clinicianEdits: EditDiff[];
    signedOff: boolean;
    signedOffAt?: Date;
  };
  draftLetters: DraftLetter[];
  passportUpdate?: Record<string, unknown>;
  bookingFormPrepopulation?: Record<string, unknown>;
  registryContribution?: Record<string, unknown>;
  reflectiveEditTime: number;
  cpdMicroCredit: number;
  audioRetained: boolean;
  audioScheduledDeletion?: Date;
}

export interface EditDiff {
  field: string;
  originalValue: string;
  editedValue: string;
  editedAt: Date;
}

export interface DraftLetter {
  type: 'referral' | 'discharge' | 'patient_info' | 'gp_summary';
  content: string;
  signedOff: boolean;
}

export interface SurgicalAuditSession {
  id: string;
  caseRef: string;
  activatedBy: string;
  status: AuditSessionStatus;
  teamConsentRefs: string[];
  patientConsentRef: string;
  safetyChecklist: {
    enabled: boolean;
    template: 'who_standard' | 'aspire_adapted' | 'custom';
    items: ChecklistItem[];
    completionRate: number;
  };
  teamPerformanceMonitoring: {
    enabled: boolean;
    nudges: SafetyNudge[];
  };
  automatedDocumentation: {
    enabled: boolean;
    draftOperativeReport: string;
    procedureCodes: string[];
    complicationFlags: string[];
    mdtSummary: string;
  };
  videoAugmentation: {
    enabled: boolean;
    annotations: VideoAnnotation[];
  };
  postCaseSummary: {
    content: string;
    clinicianReviewed: boolean;
    clinicianSignedOff: boolean;
  };
}

export interface ChecklistItem {
  id: string;
  phase: 'sign_in' | 'time_out' | 'sign_out';
  description: string;
  endoSpecific: boolean;
  status: 'pending' | 'completed_verbal' | 'completed_manual' | 'skipped';
  completedAt?: Date;
  aiDetected: boolean;
}

export interface SafetyNudge {
  timestamp: Date;
  message: string;
  priority: 'info' | 'attention' | 'critical';
  acknowledged: boolean;
  acknowledgedBy?: string;
}

export interface VideoAnnotation {
  timestamp: number;
  type: 'safety_checklist' | 'instrument_change' | 'anatomy_landmark' | 'complication_flag' | 'team_communication' | 'lesion_detection';
  content: string;
  confidence?: number;
  aiGenerated: boolean;
  clinicianReviewed: boolean;
  clinicianApproved?: boolean;
}
