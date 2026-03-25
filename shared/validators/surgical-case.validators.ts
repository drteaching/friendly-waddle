// Zod validation schemas for surgical case data
// Covers case recording, ENZIAN classification, complications, and PROMs scheduling

import { z } from 'zod';

/** Schema for an ENZIAN classification score */
export const EnzianScoreSchema = z.object({
  compartmentA: z.object({
    left: z.number().int().min(0),
    right: z.number().int().min(0),
  }),
  compartmentB: z.object({
    left: z.number().int().min(0),
    right: z.number().int().min(0),
  }),
  compartmentC: z.number().int().min(0),
  compartmentF: z.object({
    locations: z.array(z.string()),
  }),
  compartmentO: z.object({
    left: z.boolean(),
    right: z.boolean(),
  }),
  compartmentT: z.object({
    left: z.string(),
    right: z.string(),
  }),
  compartmentP: z.number().int().min(0),
});

/** Schema for a complication entry recorded against a surgical case */
export const ComplicationEntrySchema = z.object({
  id: z.string().uuid(),
  type: z.string().min(1),
  severity: z.enum(['minor', 'major']),
  description: z.string().min(1),
  managedBy: z.string().optional(),
});

/** Schema for a PROMs schedule entry linked to a surgical case */
export const PromsScheduleEntrySchema = z.object({
  instrument: z.enum(['EHP5', 'EHP30', 'PROMIS', 'PGI_I', 'EQ5D', 'QoR15']),
  scheduledAt: z.coerce.date(),
  sentAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().optional(),
  responseRef: z.string().optional(),
});

/** Schema for a complete surgical case record */
export const SurgicalCaseSchema = z.object({
  id: z.string().uuid(),
  patientRef: z.string().uuid(),
  surgeonRef: z.string().uuid(),
  organisationRef: z.string().uuid(),
  procedureDate: z.coerce.date(),
  procedureType: z.string().min(1),
  indication: z.string().min(1),
  approach: z.enum(['laparoscopic', 'robotic', 'open', 'combined']),
  collaboratingSurgeons: z.array(z.string()),
  complications: z.array(ComplicationEntrySchema),
  outcome: z.enum([
    'complete_excision',
    'partial_excision',
    'diagnostic_only',
    'abandoned',
  ]),
  enzianClassification: EnzianScoreSchema.optional(),
  asrmStage: z.enum(['I', 'II', 'III', 'IV']).optional(),
  efi: z.number().int().min(0).max(10).optional(),
  operativeTime: z.number().min(0).describe('Operative time in minutes'),
  bloodLoss: z.number().min(0).describe('Estimated blood loss in millilitres'),
  videoId: z.string().optional(),
  auditAiSessionId: z.string().optional(),
  promsSchedule: z.array(PromsScheduleEntrySchema),
});

// Inferred types from schemas (useful for runtime-validated data)
export type ValidatedSurgicalCase = z.infer<typeof SurgicalCaseSchema>;
export type ValidatedEnzianScore = z.infer<typeof EnzianScoreSchema>;
export type ValidatedComplicationEntry = z.infer<typeof ComplicationEntrySchema>;
export type ValidatedPromsScheduleEntry = z.infer<typeof PromsScheduleEntrySchema>;
