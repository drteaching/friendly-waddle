/**
 * Surgical case types for recording endometriosis procedures.
 * Supports the revised ENZIAN classification (2021), rASRM staging,
 * PROMs scheduling, and complication tracking per Clavien-Dindo.
 */

/**
 * A comprehensive record of a single endometriosis surgical procedure.
 * Links to video vault, AI audit sessions, and PROMs follow-up scheduling.
 */
export interface SurgicalCase {
  id: string;
  /** De-identified patient reference. */
  patientRef: string;
  /** Primary operating surgeon reference. */
  surgeonRef: string;
  /** Organisation where the procedure was performed. */
  organisationRef: string;
  procedureDate: Date;
  /** Free-text description of the procedure(s) performed. */
  procedureType: string;
  /** Clinical indication for surgery. */
  indication: string;
  /** Surgical approach used. */
  approach: 'laparoscopic' | 'robotic' | 'open' | 'combined';
  /** References to other surgeons involved (e.g., colorectal, urology). */
  collaboratingSurgeons: string[];
  /** Intra-operative and post-operative complications. */
  complications: ComplicationEntry[];
  /** Overall surgical outcome. */
  outcome: 'complete_excision' | 'partial_excision' | 'diagnostic_only' | 'abandoned';
  /** Revised ENZIAN classification score for deep endometriosis. */
  enzianClassification?: EnzianScore;
  /** rASRM (revised American Society for Reproductive Medicine) stage. */
  asrmStage?: 'I' | 'II' | 'III' | 'IV';
  /** Endometriosis Fertility Index (0-10). */
  efi?: number;
  /** Total operative time in minutes. */
  operativeTime: number;
  /** Estimated blood loss in millilitres. */
  bloodLoss: number;
  /** Reference to the associated surgical video in the Video Vault. */
  videoId?: string;
  /** Reference to the AI surgical audit session, if activated. */
  auditAiSessionId?: string;
  /** Scheduled patient-reported outcome measures for follow-up. */
  promsSchedule: PromsScheduleEntry[];
}

/**
 * The revised ENZIAN classification (2021) for deep endometriosis.
 * Compartments A-C represent anterior/posterior pelvic locations,
 * while F, O, T represent extra-pelvic, ovarian, and tubal involvement.
 */
export interface EnzianScore {
  /** Compartment A: vagina, rectovaginal septum. Left and right severity (0-3). */
  compartmentA: { left: number; right: number };
  /** Compartment B: uterosacral ligaments, pelvic sidewall. Left and right severity (0-3). */
  compartmentB: { left: number; right: number };
  /** Compartment C: rectum/sigmoid involvement. Severity (0-3). */
  compartmentC: number;
  /** Compartment F: other far locations (e.g., diaphragm, abdominal wall). */
  compartmentF: { locations: string[] };
  /** Compartment O: ovarian endometrioma. Left and right presence. */
  compartmentO: { left: boolean; right: boolean };
  /** Compartment T: tubal status. Left and right descriptions. */
  compartmentT: { left: string; right: string };
  /** Compartment P: peritoneal endometriosis. Severity (0-3). */
  compartmentP: number;
}

/**
 * Scheduled patient-reported outcome measure entry.
 * Instruments aligned with the COMET (Core Outcome Measures in Endometriosis Trials) initiative.
 */
export interface PromsScheduleEntry {
  /** The PROMs instrument to administer. */
  instrument: 'EHP5' | 'EHP30' | 'PROMIS' | 'PGI_I' | 'EQ5D' | 'QoR15';
  /** When the PROMs questionnaire is scheduled to be sent. */
  scheduledAt: Date;
  /** When the questionnaire was actually sent to the patient. */
  sentAt?: Date;
  /** When the patient completed the questionnaire. */
  completedAt?: Date;
  /** Reference to the patient's response data. */
  responseRef?: string;
}

/**
 * Records a complication arising during or after the surgical procedure.
 */
export interface ComplicationEntry {
  id: string;
  /** Type of complication (e.g., 'ureteral injury', 'bowel perforation'). */
  type: string;
  /** Severity grading (consider Clavien-Dindo for future refinement). */
  severity: 'minor' | 'major';
  /** Detailed description of the complication. */
  description: string;
  /** Reference to the clinician who managed the complication. */
  managedBy?: string;
}
