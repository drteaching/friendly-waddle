Instance: ExampleEndoPractitionerRole
InstanceOf: EndoPractitionerRole
Usage: #example
Title: "Example Advanced Endometriosis Surgeon"
Description: "An example of an advanced endometriosis surgeon practitioner role within the ASPIRE EndoExpertise network."

* active = true
* practitioner = Reference(Practitioner/example-surgeon)
* organization = Reference(ExampleEndoOrganization)
* code[0].coding[0].system = "http://snomed.info/sct"
* code[0].coding[0].code = #304292004
* code[0].coding[0].display = "Surgeon"
* specialty[0].coding[0].system = "http://snomed.info/sct"
* specialty[0].coding[0].code = #394586005
* specialty[0].coding[0].display = "Gynaecology"

* extension[surgeonTier].valueCode = #tier-3
* extension[caseload].extension[totalCases].valueInteger = 847
* extension[caseload].extension[periodCases].valueInteger = 124
* extension[caseload].extension[periodStart].valueDate = "2025-07-01"
* extension[caseload].extension[periodEnd].valueDate = "2026-06-30"
* extension[caseload].extension[complexCases].valueInteger = 68
* extension[caseload].extension[moderateCases].valueInteger = 39
* extension[caseload].extension[simpleCases].valueInteger = 17
* extension[cpdHours].extension[totalHours].valueDecimal = 312.5
* extension[cpdHours].extension[periodHours].valueDecimal = 48.0
* extension[cpdHours].extension[periodStart].valueDate = "2025-07-01"
* extension[cpdHours].extension[periodEnd].valueDate = "2026-06-30"
* extension[cpdHours].extension[requiredHours].valueDecimal = 40.0
* extension[cpdHours].extension[lastActivityDate].valueDateTime = "2026-03-15T09:00:00+11:00"
