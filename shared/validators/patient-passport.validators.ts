// Zod validation schemas for patient passport data
// Covers consent management and data sharing preferences

import { z } from 'zod';

/** Valid consent scopes that a patient may grant */
export const ConsentScopeSchema = z.enum([
  'clinical_data',
  'registry_deidentified',
  'research_identified',
  'ai_consultation',
  'ai_surgical_audit',
  'video_storage',
  'video_teaching',
]);

/** Consent lifecycle statuses */
export const ConsentStatusSchema = z.enum(['active', 'revoked', 'expired']);

/** Schema for a patient consent record */
export const PatientConsentSchema = z.object({
  id: z.string().uuid(),
  scope: ConsentScopeSchema,
  grantedTo: z.string().min(1),
  status: ConsentStatusSchema,
  grantedAt: z.coerce.date(),
  revokedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
}).refine(
  (data) => {
    // A revoked consent must have a revocation date
    if (data.status === 'revoked') {
      return data.revokedAt !== undefined;
    }
    return true;
  },
  {
    message: 'Revoked consents must include a revokedAt date',
  }
).refine(
  (data) => {
    // Revocation date must not precede the grant date
    if (data.revokedAt && data.grantedAt) {
      return data.revokedAt >= data.grantedAt;
    }
    return true;
  },
  {
    message: 'revokedAt must not be earlier than grantedAt',
  }
);

/** Categories of patient data subject to sharing preferences */
export const DataCategorySchema = z.enum([
  'symptom_diary',
  'surgical_records',
  'proms',
  'imaging',
  'consultation_notes',
  'fertility_data',
]);

/** Levels of data sharing a patient may choose */
export const SharingLevelSchema = z.enum([
  'none',
  'my_network_only',
  'deidentified_research',
  'all_consented',
]);

/** Schema for an organisation-specific sharing override */
export const SharingOverrideSchema = z.object({
  organisationId: z.string().uuid(),
  sharing: SharingLevelSchema,
});

/** Schema for a patient's data sharing preference for a given data category */
export const DataSharingPreferenceSchema = z.object({
  dataCategory: DataCategorySchema,
  defaultSharing: SharingLevelSchema,
  overrides: z.array(SharingOverrideSchema),
});

// Inferred types from schemas (useful for runtime-validated data)
export type ValidatedPatientConsent = z.infer<typeof PatientConsentSchema>;
export type ValidatedDataSharingPreference = z.infer<typeof DataSharingPreferenceSchema>;
