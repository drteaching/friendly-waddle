Profile: EndoAccreditation
Parent: Basic
Id: endo-accreditation
Title: "Endometriosis Accreditation"
Description: "A Basic resource used to track the accreditation lifecycle for organisations and practitioners within the ASPIRE EndoExpertise network."

* ^status = #draft

* code 1..1 MS
* code = http://aspire.org/fhir/endoexpertise/CodeSystem/aspire-feature-cs#accreditation
* subject 1..1 MS
* subject ^short = "Reference to the Organisation or PractitionerRole being accredited"
* created 1..1 MS
* author MS
* author ^short = "The assessor or accreditation body responsible"

* extension contains
    AccreditationTier named tier 1..1 MS and
    AccreditationStatus named status 1..1 MS and
    AccreditationValidUntil named validUntil 0..1 MS and
    AccreditationApplicationDate named applicationDate 0..1 MS and
    AccreditationDecisionDate named decisionDate 0..1 MS and
    AccreditationEvidenceCount named evidenceCount 0..1 MS

Extension: AccreditationApplicationDate
Id: accreditation-application-date
Title: "Accreditation Application Date"
Description: "The date on which the accreditation application was submitted."
Context: Basic
* value[x] only dateTime

Extension: AccreditationDecisionDate
Id: accreditation-decision-date
Title: "Accreditation Decision Date"
Description: "The date on which the accreditation decision was made."
Context: Basic
* value[x] only dateTime

Extension: AccreditationEvidenceCount
Id: accreditation-evidence-count
Title: "Accreditation Evidence Count"
Description: "The number of evidence items submitted as part of the accreditation application."
Context: Basic
* value[x] only integer
