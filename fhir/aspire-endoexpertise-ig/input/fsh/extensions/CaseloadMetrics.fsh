Extension: CaseloadMetrics
Id: caseload-metrics
Title: "Caseload Metrics"
Description: "Captures the surgical caseload metrics for a practitioner, including total cases, cases in the current accreditation period, and case complexity breakdown."
Context: PractitionerRole
* extension contains
    totalCases 0..1 and
    periodCases 0..1 and
    periodStart 0..1 and
    periodEnd 0..1 and
    complexCases 0..1 and
    moderateCases 0..1 and
    simpleCases 0..1

* extension[totalCases] ^short = "Total lifetime endometriosis surgical cases"
* extension[totalCases].value[x] only integer

* extension[periodCases] ^short = "Cases within the current accreditation period"
* extension[periodCases].value[x] only integer

* extension[periodStart] ^short = "Start date of the current measurement period"
* extension[periodStart].value[x] only date

* extension[periodEnd] ^short = "End date of the current measurement period"
* extension[periodEnd].value[x] only date

* extension[complexCases] ^short = "Number of complex (deep infiltrating) endometriosis cases"
* extension[complexCases].value[x] only integer

* extension[moderateCases] ^short = "Number of moderate endometriosis cases"
* extension[moderateCases].value[x] only integer

* extension[simpleCases] ^short = "Number of simple (superficial) endometriosis cases"
* extension[simpleCases].value[x] only integer
