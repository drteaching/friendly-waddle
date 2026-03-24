// ASPIRE Consensus Feature Definitions
// All 38 features organised by domain with tier requirements, evidence types, and gentle nudge messages
// Reference: ASPIRE EndoExpertise Accreditation Framework

import { AccreditationTier, EvidenceType, FeatureDomain } from '../types/accreditation';

/** Represents a single ASPIRE accreditation feature definition */
export interface AspireFeatureDefinition {
  /** Unique feature identifier (1–38) */
  id: number;
  /** The domain this feature belongs to */
  domain: FeatureDomain;
  /** Feature title as per the ASPIRE Consensus */
  title: string;
  /** Detailed description of the feature requirements */
  description: string;
  /** Which accreditation tiers require this feature */
  requiredForTiers: AccreditationTier[];
  /** Types of evidence that may be submitted for this feature */
  evidenceTypes: EvidenceType[];
  /** Criteria used to assess whether the feature is met */
  assessmentCriteria: string;
  /** Supportive message shown when the feature is not yet met */
  gentleNudgeMessage: string;
}

const ALL_TIERS: AccreditationTier[] = ['EndoAware', 'EndoAdvanced', 'EndoNetwork', 'EndoCentre'];
const NETWORK_AND_CENTRE: AccreditationTier[] = ['EndoNetwork', 'EndoCentre'];
const ADVANCED_NETWORK_CENTRE: AccreditationTier[] = ['EndoAdvanced', 'EndoNetwork', 'EndoCentre'];
const CENTRE_ONLY: AccreditationTier[] = ['EndoCentre'];

/**
 * Complete list of the 38 ASPIRE EndoExpertise accreditation features.
 * Each feature is categorised by domain and specifies which tiers it applies to,
 * acceptable evidence types, assessment criteria, and a gentle nudge message
 * to encourage organisations towards compliance.
 */
export const ASPIRE_FEATURES: readonly AspireFeatureDefinition[] = [
  // ──────────────────────────────────────────────────────────────
  // Domain: Network Importance (Features 1–3) — All Tiers
  // ──────────────────────────────────────────────────────────────
  {
    id: 1,
    domain: 'network_importance',
    title: 'Formal Network Participation Agreement',
    description:
      'The organisation has a formal, signed agreement to participate in a recognised endometriosis network, demonstrating commitment to collaborative care and shared standards.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['collaboration_agreement'],
    assessmentCriteria:
      'A current, signed network participation agreement is on file, specifying roles, responsibilities, and referral pathways.',
    gentleNudgeMessage:
      'Joining a network opens up referral pathways and peer support. Would you like to browse our partner directory for networks accepting new members?',
  },
  {
    id: 2,
    domain: 'network_importance',
    title: 'Defined Referral Pathways',
    description:
      'Clear, documented referral pathways exist between the organisation and other network members, ensuring patients can access the appropriate level of care without unnecessary delays.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['collaboration_agreement', 'other'],
    assessmentCriteria:
      'Documented referral pathways are available, including criteria for escalation and expected timeframes for patient transfer.',
    gentleNudgeMessage:
      'Establishing referral pathways helps patients reach the right care sooner. Consider reviewing our referral pathway templates to get started.',
  },
  {
    id: 3,
    domain: 'network_importance',
    title: 'Network Communication and Governance',
    description:
      'Regular communication mechanisms and governance structures are in place within the network, including scheduled meetings, shared protocols, and outcome reporting.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['mdt_minutes', 'collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of at least quarterly network meetings with documented minutes, and a governance framework outlining decision-making processes.',
    gentleNudgeMessage:
      'Regular network meetings strengthen collaboration and improve patient outcomes. Our Case Hub can help facilitate and document these discussions.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Organisational — Customer Service (Features 4–10) — EndoNetwork, EndoCentre
  // ──────────────────────────────────────────────────────────────
  {
    id: 4,
    domain: 'org_customer_service',
    title: 'Patient-Centred Communication Standards',
    description:
      'The organisation demonstrates patient-centred communication practices, including timely responses to enquiries, accessible information, and culturally safe interactions.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['patient_portal_screenshot', 'endocare_questionnaire', 'other'],
    assessmentCriteria:
      'Evidence of communication policies, patient feedback mechanisms, and response-time benchmarks being met.',
    gentleNudgeMessage:
      'Patients value responsive communication. Consider implementing a patient portal to streamline enquiries and improve satisfaction.',
  },
  {
    id: 5,
    domain: 'org_customer_service',
    title: 'Appointment Access and Timeliness',
    description:
      'The organisation provides timely access to appointments, with transparent wait-time information and processes to prioritise urgent cases.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['other'],
    assessmentCriteria:
      'Documented wait-time data, triage protocols for urgent referrals, and evidence of meeting published access targets.',
    gentleNudgeMessage:
      'Reducing wait times makes a real difference to patients living with endometriosis. Explore our resource library for scheduling optimisation strategies.',
  },
  {
    id: 6,
    domain: 'org_customer_service',
    title: 'Patient Information and Education Resources',
    description:
      'Comprehensive, evidence-based patient information and education resources are available, covering diagnosis, treatment options, self-management, and support services.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['patient_portal_screenshot', 'other'],
    assessmentCriteria:
      'A library of patient-facing resources is maintained, reviewed at least annually, and accessible in multiple formats.',
    gentleNudgeMessage:
      'Well-informed patients have better outcomes. Our resource library includes templates and guides you can adapt for your practice.',
  },
  {
    id: 7,
    domain: 'org_customer_service',
    title: 'Patient Feedback and Complaints Process',
    description:
      'A formal process exists for collecting, reviewing, and acting on patient feedback and complaints, with evidence of quality improvement actions taken.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['endocare_questionnaire', 'other'],
    assessmentCriteria:
      'A documented complaints and feedback policy, with evidence of regular review and at least two quality improvement actions in the past 12 months.',
    gentleNudgeMessage:
      'Patient feedback is a powerful driver of improvement. The EndoCare questionnaire can help you gather structured feedback efficiently.',
  },
  {
    id: 8,
    domain: 'org_customer_service',
    title: 'Continuity of Care Coordination',
    description:
      'The organisation ensures continuity of care through coordinated handovers, consistent care teams, and clear documentation shared with the patient and their providers.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['patient_portal_screenshot', 'other'],
    assessmentCriteria:
      'Evidence of care coordination processes, including handover protocols, shared care plans, and patient access to their own records.',
    gentleNudgeMessage:
      'Continuity of care reduces duplication and improves the patient experience. The EndoPassport can help patients and providers stay connected.',
  },
  {
    id: 9,
    domain: 'org_customer_service',
    title: 'Culturally Safe and Inclusive Practice',
    description:
      'The organisation demonstrates culturally safe and inclusive practices, including staff training, accessible services for diverse populations, and acknowledgement of Indigenous health perspectives.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['cme_certificate', 'other'],
    assessmentCriteria:
      'Evidence of cultural safety training for staff, accessibility audits, and inclusive communication materials.',
    gentleNudgeMessage:
      'Culturally safe practice ensures all patients feel welcome and understood. Consider enrolling your team in cultural safety training programmes.',
  },
  {
    id: 10,
    domain: 'org_customer_service',
    title: 'Patient Support Services and Advocacy',
    description:
      'The organisation provides or facilitates access to patient support services, including peer support, advocacy, counselling, and self-management programmes.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of formal links to patient support organisations, availability of support services, and patient awareness of these resources.',
    gentleNudgeMessage:
      'Support services make a meaningful difference to patients\u2019 wellbeing. Our partner directory can connect you with advocacy and support organisations.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Organisational — Care (Features 11–19) — EndoNetwork, EndoCentre
  // ──────────────────────────────────────────────────────────────
  {
    id: 11,
    domain: 'org_care',
    title: 'Multidisciplinary Team Composition',
    description:
      'The organisation has access to a multidisciplinary team (MDT) with the necessary specialties for comprehensive endometriosis care, including gynaecology, colorectal surgery, urology, pain medicine, fertility, nursing, and allied health.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['collaboration_agreement', 'mdt_minutes', 'other'],
    assessmentCriteria:
      'A documented MDT membership list covering required specialties, with evidence of active participation from each discipline.',
    gentleNudgeMessage:
      'A comprehensive MDT ensures patients receive holistic care. Our partner directory can help identify specialists to complement your team.',
  },
  {
    id: 12,
    domain: 'org_care',
    title: 'Regular MDT Meetings and Case Review',
    description:
      'The MDT meets regularly to review complex cases, with documented decisions, attendance records, and follow-up actions.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['mdt_minutes', 'other'],
    assessmentCriteria:
      'Evidence of at least monthly MDT meetings with documented attendance, case discussions, and agreed management plans.',
    gentleNudgeMessage:
      'Regular MDT meetings improve decision-making for complex cases. The Case Hub makes it easy to present and document cases for discussion.',
  },
  {
    id: 13,
    domain: 'org_care',
    title: 'Evidence-Based Clinical Protocols',
    description:
      'The organisation uses evidence-based clinical protocols for the diagnosis and management of endometriosis, aligned with current guidelines (e.g., RANZCOG, ESHRE, NICE).',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['other'],
    assessmentCriteria:
      'Documented clinical protocols are available, reviewed at least every two years, and aligned with recognised guidelines.',
    gentleNudgeMessage:
      'Evidence-based protocols reduce variation and improve outcomes. Our resource library includes protocol templates aligned with current guidelines.',
  },
  {
    id: 14,
    domain: 'org_care',
    title: 'Imaging and Diagnostic Standards',
    description:
      'The organisation ensures access to high-quality imaging for endometriosis, including specialised ultrasound and MRI, performed by practitioners with appropriate training.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['cme_certificate', 'collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of access to specialised imaging services, practitioner qualifications, and quality assurance processes for imaging.',
    gentleNudgeMessage:
      'Accurate imaging is foundational to good surgical planning. Consider connecting with a trained sonologist through our network directory.',
  },
  {
    id: 15,
    domain: 'org_care',
    title: 'Hormonal and Medical Management',
    description:
      'The organisation provides or coordinates access to comprehensive hormonal and medical management options for endometriosis, with individualised treatment planning.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['other'],
    assessmentCriteria:
      'Evidence of a range of medical management options being offered, with documented patient-centred treatment planning.',
    gentleNudgeMessage:
      'Comprehensive medical management is a key part of the care pathway. Our resource library includes treatment planning templates.',
  },
  {
    id: 16,
    domain: 'org_care',
    title: 'Pain Management Services',
    description:
      'The organisation provides or coordinates access to multimodal pain management services, including pharmacological, interventional, physiotherapy, and psychological approaches.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of access to multimodal pain management services, with documented referral pathways and collaborative care plans.',
    gentleNudgeMessage:
      'Pain management is central to quality of life for patients with endometriosis. Our partner directory can help you connect with pain specialists.',
  },
  {
    id: 17,
    domain: 'org_care',
    title: 'Fertility Services Coordination',
    description:
      'The organisation provides or coordinates access to fertility services, including counselling, fertility preservation, and assisted reproductive technology, with clear referral pathways.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of fertility service access, documented referral pathways, and pre-surgical fertility counselling protocols.',
    gentleNudgeMessage:
      'Fertility is a priority concern for many patients. Establishing clear referral pathways to fertility specialists benefits your patients.',
  },
  {
    id: 18,
    domain: 'org_care',
    title: 'Nursing and Allied Health Integration',
    description:
      'Endometriosis-trained nursing and allied health professionals are integrated into the care team, providing specialised support across the patient journey.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['cme_certificate', 'collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of nursing and allied health roles within the team, with documented training and scope of practice.',
    gentleNudgeMessage:
      'Integrated nursing and allied health support enhances patient care. Consider training programmes to upskill your team in endometriosis care.',
  },
  {
    id: 19,
    domain: 'org_care',
    title: 'Patient-Reported Outcome Measures (PROMs)',
    description:
      'The organisation routinely collects and uses Patient-Reported Outcome Measures (PROMs) to evaluate treatment effectiveness and inform quality improvement.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['outcome_data', 'endocare_questionnaire', 'other'],
    assessmentCriteria:
      'Evidence of routine PROMs collection using validated instruments (e.g., EHP-5, EHP-30, EQ-5D), with data used for quality improvement.',
    gentleNudgeMessage:
      'PROMs provide invaluable insight into the patient experience. Our platform can automate PROMs collection and reporting for your practice.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Clinical — Surgery (Features 20–26) — EndoAdvanced, EndoNetwork, EndoCentre
  // ──────────────────────────────────────────────────────────────
  {
    id: 20,
    domain: 'clinical_surgery',
    title: 'Surgical Volume and Case Complexity',
    description:
      'The surgeon or unit demonstrates sufficient surgical volume and case complexity for endometriosis, meeting minimum thresholds for annual case numbers.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'outcome_data'],
    assessmentCriteria:
      'Surgical logbook evidence demonstrating minimum annual case numbers with appropriate case-mix complexity, including deep infiltrating endometriosis.',
    gentleNudgeMessage:
      'Building surgical volume takes time. Consider collaborative operating with experienced colleagues to develop your caseload and skills.',
  },
  {
    id: 21,
    domain: 'clinical_surgery',
    title: 'Surgical Outcomes and Complication Rates',
    description:
      'The surgeon or unit tracks and reports surgical outcomes and complication rates, benchmarked against published standards and peer performance.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'outcome_data', 'registry_submission'],
    assessmentCriteria:
      'Documented outcome data including complication rates, re-operation rates, and patient-reported outcomes, with evidence of peer benchmarking.',
    gentleNudgeMessage:
      'Tracking outcomes drives continuous improvement. Our Surgical Performance module can automate outcome tracking and peer comparison.',
  },
  {
    id: 22,
    domain: 'clinical_surgery',
    title: 'Standardised Surgical Classification',
    description:
      'The organisation uses standardised classification systems for endometriosis (e.g., #Enzian, rASRM) to document disease extent and surgical findings.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'other'],
    assessmentCriteria:
      'Evidence of consistent use of standardised classification (preferably #Enzian) in operative reports and case documentation.',
    gentleNudgeMessage:
      'Standardised classification improves communication and data quality. Our surgical log includes built-in #Enzian and rASRM scoring tools.',
  },
  {
    id: 23,
    domain: 'clinical_surgery',
    title: 'Video Documentation of Procedures',
    description:
      'Surgical procedures are routinely video-recorded for quality assurance, teaching, and audit purposes, with appropriate patient consent.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'other'],
    assessmentCriteria:
      'Evidence of routine video documentation with documented consent processes and secure storage compliant with data protection requirements.',
    gentleNudgeMessage:
      'Video documentation supports learning and quality assurance. Our Video Vault provides secure, consent-managed storage for surgical recordings.',
  },
  {
    id: 24,
    domain: 'clinical_surgery',
    title: 'Collaborative Surgical Practice',
    description:
      'The surgeon demonstrates collaborative surgical practice, including co-operating with colorectal surgeons, urologists, and other specialists for complex cases.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'collaboration_agreement', 'mdt_minutes'],
    assessmentCriteria:
      'Surgical logbook evidence of collaborative cases, with documented co-surgeon involvement and pre-operative MDT planning.',
    gentleNudgeMessage:
      'Collaborative surgery improves outcomes for complex cases. Our network can help you connect with surgeons for joint operating opportunities.',
  },
  {
    id: 25,
    domain: 'clinical_surgery',
    title: 'Surgical Safety and Checklist Compliance',
    description:
      'The organisation demonstrates compliance with surgical safety checklists, including endometriosis-specific safety items adapted from the WHO Surgical Safety Checklist.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['surgical_log', 'other'],
    assessmentCriteria:
      'Evidence of surgical safety checklist use with completion rates above 95%, including endometriosis-specific items.',
    gentleNudgeMessage:
      'Safety checklists save lives. Our AI Surgical Audit assistant can help automate checklist compliance during procedures.',
  },
  {
    id: 26,
    domain: 'clinical_surgery',
    title: 'Post-operative Care and Follow-up',
    description:
      'The organisation has structured post-operative care pathways, including follow-up scheduling, PROMs collection, complication monitoring, and long-term management planning.',
    requiredForTiers: ADVANCED_NETWORK_CENTRE,
    evidenceTypes: ['outcome_data', 'endocare_questionnaire', 'other'],
    assessmentCriteria:
      'Documented post-operative care pathways with evidence of structured follow-up, PROMs collection at defined timepoints, and long-term care planning.',
    gentleNudgeMessage:
      'Structured follow-up improves long-term outcomes. Our platform can automate PROMs scheduling and follow-up reminders for your patients.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Clinical — Pain (Features 27–29) — All Tiers (subset for EndoAware)
  // ──────────────────────────────────────────────────────────────
  {
    id: 27,
    domain: 'clinical_pain',
    title: 'Pain Assessment and Documentation',
    description:
      'The organisation routinely assesses and documents pain using validated tools, including pain mapping, symptom severity scales, and functional impact measures.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['endocare_questionnaire', 'outcome_data', 'other'],
    assessmentCriteria:
      'Evidence of routine pain assessment using validated instruments, with documentation in patient records and use in treatment planning.',
    gentleNudgeMessage:
      'Thorough pain assessment guides better treatment decisions. Our symptom diary tools can help patients track and report their pain patterns.',
  },
  {
    id: 28,
    domain: 'clinical_pain',
    title: 'Multimodal Pain Management Pathways',
    description:
      'The organisation offers or coordinates access to multimodal pain management, including pharmacological, physiotherapy, psychological, and complementary approaches.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['collaboration_agreement', 'other'],
    assessmentCriteria:
      'Evidence of multimodal pain management availability, documented referral pathways, and individualised pain management plans.',
    gentleNudgeMessage:
      'Multimodal approaches improve pain outcomes. Our partner directory can help you connect with pain management specialists in your area.',
  },
  {
    id: 29,
    domain: 'clinical_pain',
    title: 'Long-term Pain Outcome Tracking',
    description:
      'The organisation tracks long-term pain outcomes for patients with endometriosis, using PROMs and clinical assessments to evaluate treatment effectiveness over time.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['outcome_data', 'endocare_questionnaire', 'other'],
    assessmentCriteria:
      'Evidence of longitudinal pain outcome data collection, with at least 12-month follow-up for surgical patients and regular reviews for medical management.',
    gentleNudgeMessage:
      'Tracking pain outcomes over time reveals what works best for your patients. Our PROMs system can automate this data collection.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Clinical — Fertility (Features 30–33) — All Tiers (subset for EndoAware)
  // ──────────────────────────────────────────────────────────────
  {
    id: 30,
    domain: 'clinical_fertility',
    title: 'Fertility Impact Counselling',
    description:
      'The organisation provides fertility impact counselling for patients with endometriosis, including discussion of fertility preservation options prior to surgery.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['other'],
    assessmentCriteria:
      'Evidence of pre-surgical fertility counselling processes, documented patient discussions, and referral pathways to fertility specialists.',
    gentleNudgeMessage:
      'Fertility counselling empowers patients to make informed decisions. Consider establishing a standard pre-surgical fertility discussion protocol.',
  },
  {
    id: 31,
    domain: 'clinical_fertility',
    title: 'Endometriosis Fertility Index (EFI) Documentation',
    description:
      'The organisation routinely calculates and documents the Endometriosis Fertility Index (EFI) for relevant patients, guiding post-surgical fertility management.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['surgical_log', 'outcome_data'],
    assessmentCriteria:
      'Evidence of EFI calculation in surgical reports for patients of reproductive age, with documentation of how EFI informs management planning.',
    gentleNudgeMessage:
      'The EFI helps guide post-surgical fertility decisions. Our surgical log includes built-in EFI calculation to streamline this process.',
  },
  {
    id: 32,
    domain: 'clinical_fertility',
    title: 'Fertility Outcome Tracking',
    description:
      'The organisation tracks fertility outcomes for patients with endometriosis, including pregnancy rates, time to conception, and assisted reproduction outcomes.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['outcome_data', 'registry_submission'],
    assessmentCriteria:
      'Evidence of fertility outcome data collection, with documented pregnancy rates and time-to-conception data for post-surgical patients.',
    gentleNudgeMessage:
      'Tracking fertility outcomes helps demonstrate the impact of your care. Our registry tools can help automate this data collection.',
  },
  {
    id: 33,
    domain: 'clinical_fertility',
    title: 'Fertility Service Integration',
    description:
      'The organisation demonstrates integration between endometriosis surgical services and fertility services, with coordinated care pathways and shared decision-making.',
    requiredForTiers: ALL_TIERS,
    evidenceTypes: ['collaboration_agreement', 'mdt_minutes'],
    assessmentCriteria:
      'Evidence of formal collaboration between surgical and fertility teams, joint care pathways, and MDT discussions involving fertility specialists.',
    gentleNudgeMessage:
      'Integrated fertility care improves outcomes for patients wanting to conceive. Our network can help you establish collaborative relationships.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Training (Features 34–35) — EndoNetwork, EndoCentre
  // ──────────────────────────────────────────────────────────────
  {
    id: 34,
    domain: 'training',
    title: 'Training Positions and Supervision',
    description:
      'The organisation offers formal training positions in endometriosis surgery and care, with structured supervision, competency assessment, and training curricula.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['training_position_docs', 'cme_certificate', 'other'],
    assessmentCriteria:
      'Evidence of accredited training positions, documented supervision arrangements, competency frameworks, and trainee feedback processes.',
    gentleNudgeMessage:
      'Training the next generation is vital for the specialty. Our platform can help you structure training programmes and track trainee progress.',
  },
  {
    id: 35,
    domain: 'training',
    title: 'Continuing Medical Education Programme',
    description:
      'The organisation delivers or participates in continuing medical education (CME) activities related to endometriosis, contributing to the professional development of the wider community.',
    requiredForTiers: NETWORK_AND_CENTRE,
    evidenceTypes: ['cme_certificate', 'other'],
    assessmentCriteria:
      'Evidence of CME activities delivered or attended, with documented learning outcomes and contribution to CPD requirements.',
    gentleNudgeMessage:
      'CME activities benefit your team and the wider community. Our CPD tracker can help you plan and document your educational programme.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Research (Feature 36) — EndoCentre only
  // ──────────────────────────────────────────────────────────────
  {
    id: 36,
    domain: 'research',
    title: 'Active Research Programme',
    description:
      'The organisation maintains an active research programme in endometriosis, including clinical trials, observational studies, or translational research, with ethics approval and published outputs.',
    requiredForTiers: CENTRE_ONLY,
    evidenceTypes: ['research_output', 'other'],
    assessmentCriteria:
      'Evidence of current research activities with ethics approval, published outputs within the past three years, and research governance structures.',
    gentleNudgeMessage:
      'Research drives advances in endometriosis care. Consider collaborating with established research groups to develop your programme.',
  },

  // ──────────────────────────────────────────────────────────────
  // Domain: Research (Features 37–38) — EndoCentre only
  // ──────────────────────────────────────────────────────────────
  {
    id: 37,
    domain: 'research',
    title: 'Registry Participation and Data Contribution',
    description:
      'The organisation contributes de-identified data to national and/or international endometriosis registries (e.g., EPHECT), supporting evidence generation and quality benchmarking.',
    requiredForTiers: CENTRE_ONLY,
    evidenceTypes: ['registry_submission', 'outcome_data'],
    assessmentCriteria:
      'Evidence of active registry participation, with documented data submissions and compliance with de-identification requirements.',
    gentleNudgeMessage:
      'Registry participation strengthens the evidence base for endometriosis care. Our registry module can streamline your data submission process.',
  },
  {
    id: 38,
    domain: 'research',
    title: 'Innovation and Quality Improvement',
    description:
      'The organisation demonstrates a commitment to innovation and quality improvement in endometriosis care, including adoption of new technologies, participation in quality improvement collaboratives, and evaluation of novel approaches.',
    requiredForTiers: CENTRE_ONLY,
    evidenceTypes: ['research_output', 'outcome_data', 'other'],
    assessmentCriteria:
      'Evidence of quality improvement projects, innovation adoption, and participation in improvement collaboratives within the past two years.',
    gentleNudgeMessage:
      'Innovation and quality improvement set centres apart. Our platform provides benchmarking data and tools to support your improvement journey.',
  },
] as const;

/** Total number of features in the ASPIRE accreditation framework */
export const ASPIRE_FEATURE_COUNT = 38;

/** Lookup a feature definition by its ID */
export function getFeatureById(id: number): AspireFeatureDefinition | undefined {
  return ASPIRE_FEATURES.find((f) => f.id === id);
}

/** Retrieve all features required for a given accreditation tier */
export function getFeaturesForTier(tier: AccreditationTier): AspireFeatureDefinition[] {
  return ASPIRE_FEATURES.filter((f) => f.requiredForTiers.includes(tier));
}

/** Retrieve all features belonging to a given domain */
export function getFeaturesByDomain(domain: FeatureDomain): AspireFeatureDefinition[] {
  return ASPIRE_FEATURES.filter((f) => f.domain === domain);
}
