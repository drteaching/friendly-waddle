/**
 * Accreditation types for the ASPIRE EndoExpertise Platform.
 * Covers tiered accreditation (EndoAware through EndoCentre),
 * feature assessments against the 38 consensus features,
 * evidence uploads, and gentle nudges for continuous improvement.
 */

/** The four accreditation tiers in the ASPIRE framework, from foundational to comprehensive. */
export type AccreditationTier = 'EndoAware' | 'EndoAdvanced' | 'EndoNetwork' | 'EndoCentre';

/** Workflow status of an accreditation application. */
export type AccreditationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'conditional' | 'denied';

/** Self-assessment score assigned by the applicant organisation for each feature. */
export type FeatureSelfScore = 'fully_met' | 'partially_met' | 'not_met' | 'not_applicable';

/** Score assigned by an ASPIRE accreditation reviewer after evidence verification. */
export type ReviewerScore = 'verified' | 'insufficient' | 'needs_revision';

/** Categories of evidence that may be uploaded to support feature compliance. */
export type EvidenceType =
  | 'surgical_log'
  | 'mdt_minutes'
  | 'patient_portal_screenshot'
  | 'cme_certificate'
  | 'collaboration_agreement'
  | 'outcome_data'
  | 'registry_submission'
  | 'training_position_docs'
  | 'research_output'
  | 'endocare_questionnaire'
  | 'other';

/** The eight ASPIRE consensus feature domains. */
export type FeatureDomain =
  | 'network_importance'
  | 'org_customer_service'
  | 'org_care'
  | 'clinical_surgery'
  | 'clinical_pain'
  | 'clinical_fertility'
  | 'training'
  | 'research';

/**
 * A complete accreditation application submitted by an organisation
 * seeking recognition at a particular ASPIRE tier.
 */
export interface AccreditationApplication {
  id: string;
  /** Reference to the applying organisation. */
  organisationId: string;
  /** The tier being applied for. */
  tier: AccreditationTier;
  /** Current status in the review workflow. */
  status: AccreditationStatus;
  /** Individual assessments for each of the 38 consensus features. */
  featureAssessments: FeatureAssessment[];
  /** Supporting evidence documents uploaded by the applicant. */
  evidenceUploads: EvidenceUpload[];
  /** Notes left by accreditation reviewers during the assessment. */
  reviewerNotes: ReviewerNote[];
  /** Date from which accreditation is valid, once approved. */
  validFrom?: Date;
  /** Expiry date of the accreditation (typically 3-5 years). */
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Assessment of a single ASPIRE consensus feature within an accreditation application.
 * Each of the 38 features is assessed individually by the applicant and then reviewed.
 */
export interface FeatureAssessment {
  /** The feature identifier (1-38). */
  featureId: number;
  /** The domain to which this feature belongs. */
  domain: FeatureDomain;
  /** The applicant's self-assessed score. */
  selfScore: FeatureSelfScore;
  /** References to evidence uploads supporting this assessment. */
  evidenceIds: string[];
  /** Free-text notes from the applicant about how this feature is met. */
  notes: string;
  /** Score assigned by the reviewer, if reviewed. */
  reviewerScore?: ReviewerScore;
  /** Comment from the reviewer, if reviewed. */
  reviewerComment?: string;
}

/**
 * An evidence document uploaded in support of an accreditation application.
 * All clinical evidence must be de-identified before upload.
 */
export interface EvidenceUpload {
  id: string;
  /** The category of evidence. */
  type: EvidenceType;
  /** Secure URL to the uploaded file. */
  fileUrl: string;
  /** Whether the document has been de-identified (required for clinical data). */
  deIdentified: boolean;
  uploadedAt: Date;
  /** When the evidence was verified by a reviewer. */
  verifiedAt?: Date;
  /** Reference to the reviewer who verified the evidence. */
  verifiedBy?: string;
}

/** A note left by an accreditation reviewer during the assessment process. */
export interface ReviewerNote {
  id: string;
  reviewerId: string;
  /** If set, the note pertains to a specific feature; otherwise it is general. */
  featureId?: number;
  content: string;
  createdAt: Date;
}

/**
 * A gentle nudge is a supportive, non-punitive prompt encouraging organisations
 * to address gaps in their accreditation profile. The ASPIRE philosophy emphasises
 * encouragement over enforcement.
 */
export interface GentleNudge {
  /** The feature this nudge relates to. */
  featureId: number;
  /** The encouraging message shown to the organisation. */
  message: string;
  /** The type of action suggested to address the gap. */
  actionType: 'partner_directory' | 'resource_link' | 'training_suggestion' | 'peer_example';
  /** Optional URL for the suggested action. */
  actionUrl?: string;
  /** Whether the nudge can be dismissed by the user. */
  dismissible: boolean;
}
