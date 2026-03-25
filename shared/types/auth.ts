/**
 * Authentication and authorisation types for the ASPIRE EndoExpertise Platform.
 * Covers role-based access control, access policies, and break-the-glass events
 * for emergency clinical access scenarios.
 *
 * The Role enum reflects the multidisciplinary team model central to
 * endometriosis care, encompassing surgical, pain management, fertility,
 * and allied health disciplines.
 */

/** All recognised roles within the ASPIRE EndoExpertise Platform. */
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

/**
 * Defines a granular access policy for resources within the platform.
 * Policies are evaluated in order; the first matching policy determines access.
 */
export interface AccessPolicy {
  /** Whether this policy grants or denies access. */
  effect: 'allow' | 'deny';
  conditions: {
    /** Roles to which this policy applies. */
    userRole: Role[];
    /** The type of resource being accessed (e.g., 'surgical_case', 'patient_passport'). */
    resourceType: string;
    /** Sensitivity classification of the resource. */
    resourceSensitivity: 'public' | 'clinical' | 'sensitive' | 'restricted';
    /** The practitioner's relationship to the patient, if applicable. */
    patientRelationship?: 'direct_care' | 'network_member' | 'researcher' | 'none';
    /** The purpose for which access is being requested. */
    purpose?: 'treatment' | 'audit' | 'research' | 'accreditation';
    /** Optional time window during which the policy is valid. */
    timeConstraint?: { validFrom: Date; validUntil: Date };
  };
}

/**
 * Records an emergency access override ("break the glass") event.
 * These events are audited and must be retrospectively reviewed by an authorised officer.
 * Common in clinical settings where a practitioner outside the immediate care team
 * requires urgent access to patient data.
 */
export interface BreakTheGlassEvent {
  id: string;
  practitionerRef: string;
  patientRef: string;
  /** Free-text justification provided by the practitioner at the time of access. */
  reason: string;
  /** List of permission strings that were temporarily elevated. */
  elevatedPermissions: string[];
  activatedAt: Date;
  expiresAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewOutcome?: 'justified' | 'unjustified' | 'needs_investigation';
}
