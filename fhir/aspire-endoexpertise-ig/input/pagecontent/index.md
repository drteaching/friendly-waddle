# ASPIRE EndoExpertise Implementation Guide

## Introduction

The ASPIRE EndoExpertise Implementation Guide (IG) defines FHIR profiles, extensions, value sets, and code systems to support the digital infrastructure of the ASPIRE EndoExpertise Platform — a comprehensive accreditation, surgical registry, and clinical data exchange system for endometriosis centres of excellence across Australia and New Zealand.

This IG is built on FHIR R4 (4.0.1) and extends the [AU Base](https://build.fhir.org/ig/hl7au/au-fhir-base/) and [AU Core](https://build.fhir.org/ig/hl7au/au-fhir-core/) profiles to ensure alignment with Australian national standards.

## Scope

The ASPIRE EndoExpertise IG covers the following functional areas:

- **Accreditation Management** — Profiles and extensions to represent the three-tier accreditation framework for endometriosis centres and surgeons, including the 38 consensus features used for assessment.
- **Surgical Registry** — Structured capture of endometriosis surgical procedures using the revised Enzian classification, Endometriosis Fertility Index (EFI), and EPHect-compliant data fields.
- **Multidisciplinary Collaboration** — Representation of the disciplines involved in holistic endometriosis care, from pain management through to fertility services.
- **Patient Consent** — Endometriosis-specific consent scopes covering registry participation, video recording, AI-assisted analysis, and cross-centre data sharing.
- **Patient-Reported Outcomes** — Standardised PROMs instruments validated for endometriosis care.
- **AI-Assisted Workflows** — Flagging and metadata capture for artificial intelligence-assisted clinical assessments and surgical procedures.
- **Video Vault Integration** — References to surgical video documentation with appropriate consent linkage.

## Key Profiles

| Profile | Base Resource | Description |
|---------|--------------|-------------|
| [EndoOrganization](StructureDefinition-endo-organization.html) | Organization | Endometriosis centre with accreditation tier and network membership |
| [EndoPractitionerRole](StructureDefinition-endo-practitioner-role.html) | PractitionerRole | Surgeon or clinician with caseload and CPD tracking |
| [EndoSurgicalProcedure](StructureDefinition-endo-surgical-procedure.html) | Procedure | Surgical procedure with Enzian scoring and collaboration details |
| [EndoAccreditation](StructureDefinition-endo-accreditation.html) | Basic | Accreditation lifecycle tracking |
| [EndoRegistryBundle](StructureDefinition-endo-registry-bundle.html) | Bundle | EPHect-compliant registry submission bundle |
| [EndoPatientConsent](StructureDefinition-endo-patient-consent.html) | Consent | Patient consent with endometriosis-specific scopes |

## Key Extensions

- **AccreditationTier** — Classifies organisations and practitioners into Tier 1 (Foundation), Tier 2 (Intermediate), or Tier 3 (Advanced).
- **EnzianScore** — Complex extension capturing the revised Enzian classification across compartments A, B, C, T, P, and O.
- **CaseloadMetrics** — Tracks surgical caseload volume and complexity breakdown.
- **CpdTracking** — Monitors continuing professional development hours against accreditation requirements.
- **AiAssistedFlag** — Identifies AI-assisted assessments with model details and confidence scores.

## Dependencies

This IG depends on:

- [HL7 FHIR AU Base 4.1.0](https://build.fhir.org/ig/hl7au/au-fhir-base/)
- [HL7 FHIR AU Core 1.0.0](https://build.fhir.org/ig/hl7au/au-fhir-core/)

## Status

This implementation guide is currently in **draft** status (version 0.1.0) and is under active development. It should not be used in production systems without further review and validation.

## Contact

- **Publisher:** ASPIRE EndoExpertise
- **Website:** [https://aspire.org](https://aspire.org)
