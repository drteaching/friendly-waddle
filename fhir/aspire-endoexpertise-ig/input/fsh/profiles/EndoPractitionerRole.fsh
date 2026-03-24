Profile: EndoPractitionerRole
Parent: PractitionerRole
Id: endo-practitioner-role
Title: "Endometriosis Practitioner Role"
Description: "Profile for practitioner roles within ASPIRE-accredited endometriosis centres, capturing surgeon tier, caseload metrics, and continuing professional development hours."

* ^status = #draft

* practitioner 1..1 MS
* organization 1..1 MS
* code 1..* MS
* specialty 1..* MS
* active 1..1 MS

* extension contains
    SurgeonTier named surgeonTier 0..1 MS and
    CaseloadMetrics named caseload 0..1 MS and
    CpdTracking named cpdHours 0..1 MS

Extension: SurgeonTier
Id: surgeon-tier
Title: "Surgeon Tier"
Description: "The classified tier of the surgeon based on training, experience, and demonstrated competency within the ASPIRE framework."
Context: PractitionerRole
* value[x] only code
* valueCode from SurgeonTierVS (required)

ValueSet: SurgeonTierVS
Id: surgeon-tier-vs
Title: "Surgeon Tier Value Set"
Description: "Tiers classifying surgeon competency levels within the ASPIRE EndoExpertise network."
* ^status = #draft
* AccreditationTierCS#tier-1 "Tier 1 — Foundation"
* AccreditationTierCS#tier-2 "Tier 2 — Intermediate"
* AccreditationTierCS#tier-3 "Tier 3 — Advanced"
