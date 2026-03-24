// Security types for role-based access control, access policies, and break-the-glass events
// Covers all practitioner, patient, and administrative roles within the ASPIRE platform

export enum Role {
  PATIENT = 'patient',
  PATIENT_ADVOCATE = 'patient_advocate',
  GP = 'gp',
  GYNAECOLOGIST = 'gynaecologist',
  ADVANCED_SURGEON = 'advanced_surgeon',
  COLORECTAL_SURGEON = 'colorectal_surgeon',
  UROLOGIST = 'urologist',
  FERTILITY_SPECIALIST = 'fertility_specialist',
  PAIN_SPECIALIST = 'pain_specialist',
  ANAESTHETIST = 'anaesthetist',
  SONOLOGIST = 'sonologist',
  ENDO_NURSE = 'endo_nurse',
  ENDO_COACH = 'endo_coach',
  PHYSIOTHERAPIST = 'physiotherapist',
  PSYCHOLOGIST = 'psychologist',
  ACUPUNCTURIST = 'acupuncturist',
  DIETICIAN = 'dietician',
  CLINIC_ADMIN = 'clinic_admin',
  NETWORK_ADMIN = 'network_admin',
  ACCREDITATION_REVIEWER = 'accreditation_reviewer',
  ASPIRE_BOARD = 'aspire_board',
  RESEARCHER = 'researcher',
  REGISTRY_ANALYST = 'registry_analyst',
  SYSTEM_ADMIN = 'system_admin',
  AUDITOR = 'auditor',
}

export interface AccessPolicy {
  effect: 'allow' | 'deny';
  conditions: {
    userRole: Role[];
    resourceType: string;
    resourceSensitivity: 'public' | 'clinical' | 'sensitive' | 'restricted';
    patientRelationship?: 'direct_care' | 'network_member' | 'researcher' | 'none';
    purpose?: 'treatment' | 'audit' | 'research' | 'accreditation';
    timeConstraint?: { validFrom: Date; validUntil: Date };
  };
}

export interface BreakTheGlassEvent {
  id: string;
  practitionerRef: string;
  patientRef: string;
  reason: string;
  elevatedPermissions: string[];
  activatedAt: Date;
  expiresAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewOutcome?: 'justified' | 'unjustified' | 'needs_investigation';
}
