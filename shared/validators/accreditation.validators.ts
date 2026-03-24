// Zod validation schemas for accreditation-related data
// Ensures data integrity for applications, feature assessments, and evidence uploads

import { z } from 'zod';

/** Valid accreditation tiers within the ASPIRE framework */
export const AccreditationTierSchema = z.enum([
  'EndoAware',
  'EndoAdvanced',
  'EndoNetwork',
  'EndoCentre',
]);

/** Application lifecycle statuses */
export const AccreditationStatusSchema = z.enum([
  'draft',
  'submitted',
  'under_review',
  'approved',
  'conditional',
  'denied',
]);

/** Self-assessment scores for feature compliance */
export const FeatureSelfScoreSchema = z.enum([
  'fully_met',
  'partially_met',
  'not_met',
  'not_applicable',
]);

/** Reviewer-assigned scores after evidence verification */
export const ReviewerScoreSchema = z.enum([
  'verified',
  'insufficient',
  'needs_revision',
]);

/** Accepted evidence document types */
export const EvidenceTypeSchema = z.enum([
  'surgical_log',
  'mdt_minutes',
  'patient_portal_screenshot',
  'cme_certificate',
  'collaboration_agreement',
  'outcome_data',
  'registry_submission',
  'training_position_docs',
  'research_output',
  'endocare_questionnaire',
  'other',
]);

/** Feature domain categories */
export const FeatureDomainSchema = z.enum([
  'network_importance',
  'org_customer_service',
  'org_care',
  'clinical_surgery',
  'clinical_pain',
  'clinical_fertility',
  'training',
  'research',
]);

/** Schema for a single feature assessment within an accreditation application */
export const FeatureAssessmentSchema = z.object({
  featureId: z.number().int().min(1).max(38),
  domain: FeatureDomainSchema,
  selfScore: FeatureSelfScoreSchema,
  evidenceIds: z.array(z.string().uuid()),
  notes: z.string(),
  reviewerScore: ReviewerScoreSchema.optional(),
  reviewerComment: z.string().optional(),
});

/** Schema for an uploaded evidence document */
export const EvidenceUploadSchema = z.object({
  id: z.string().uuid(),
  type: EvidenceTypeSchema,
  fileUrl: z.string().url(),
  deIdentified: z.boolean(),
  uploadedAt: z.coerce.date(),
  verifiedAt: z.coerce.date().optional(),
  verifiedBy: z.string().optional(),
});

/** Schema for a reviewer note attached to an application or feature */
export const ReviewerNoteSchema = z.object({
  id: z.string().uuid(),
  reviewerId: z.string().uuid(),
  featureId: z.number().int().min(1).max(38).optional(),
  content: z.string().min(1),
  createdAt: z.coerce.date(),
});

/** Schema for a complete accreditation application */
export const AccreditationApplicationSchema = z.object({
  id: z.string().uuid(),
  organisationId: z.string().uuid(),
  tier: AccreditationTierSchema,
  status: AccreditationStatusSchema,
  featureAssessments: z.array(FeatureAssessmentSchema),
  evidenceUploads: z.array(EvidenceUploadSchema),
  reviewerNotes: z.array(ReviewerNoteSchema),
  validFrom: z.coerce.date().optional(),
  validUntil: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).refine(
  (data) => {
    // If approved, validFrom and validUntil should be present
    if (data.status === 'approved') {
      return data.validFrom !== undefined && data.validUntil !== undefined;
    }
    return true;
  },
  {
    message: 'Approved applications must have validFrom and validUntil dates',
  }
);

/** Schema for a gentle nudge suggestion */
export const GentleNudgeSchema = z.object({
  featureId: z.number().int().min(1).max(38),
  message: z.string().min(1),
  actionType: z.enum([
    'partner_directory',
    'resource_link',
    'training_suggestion',
    'peer_example',
  ]),
  actionUrl: z.string().url().optional(),
  dismissible: z.boolean(),
});

// Inferred types from schemas (useful for runtime-validated data)
export type ValidatedAccreditationApplication = z.infer<typeof AccreditationApplicationSchema>;
export type ValidatedFeatureAssessment = z.infer<typeof FeatureAssessmentSchema>;
export type ValidatedEvidenceUpload = z.infer<typeof EvidenceUploadSchema>;
export type ValidatedGentleNudge = z.infer<typeof GentleNudgeSchema>;
