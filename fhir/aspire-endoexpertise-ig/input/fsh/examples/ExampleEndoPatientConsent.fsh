Instance: ExampleEndoPatientConsent
InstanceOf: EndoPatientConsent
Usage: #example
Title: "Example Endometriosis Patient Consent"
Description: "An example of patient consent for registry participation, video recording, and AI-assisted analysis within the ASPIRE EndoExpertise platform."

* status = #active
* scope.coding[0].system = "http://terminology.hl7.org/CodeSystem/consentscope"
* scope.coding[0].code = #patient-privacy
* scope.coding[0].display = "Privacy Consent"
* scope.coding[endoScope][0].system = "https://aspire.org/fhir/endoexpertise/CodeSystem/consent-scope-cs"
* scope.coding[endoScope][0].code = #registry-participation
* scope.coding[endoScope][0].display = "Registry Participation"
* scope.coding[endoScope][1].system = "https://aspire.org/fhir/endoexpertise/CodeSystem/consent-scope-cs"
* scope.coding[endoScope][1].code = #video-recording
* scope.coding[endoScope][1].display = "Video Recording"
* scope.coding[endoScope][2].system = "https://aspire.org/fhir/endoexpertise/CodeSystem/consent-scope-cs"
* scope.coding[endoScope][2].code = #ai-analysis
* scope.coding[endoScope][2].display = "AI Analysis"
* category[0].coding[0].system = "http://loinc.org"
* category[0].coding[0].code = #59284-0
* category[0].coding[0].display = "Consent Document"
* patient = Reference(Patient/example-patient)
* dateTime = "2026-03-08T14:30:00+11:00"
* performer[0] = Reference(Patient/example-patient)
* organization[0] = Reference(ExampleEndoOrganization)

* policy[0].authority = "https://aspire.org"
* policy[0].uri = "https://aspire.org/policies/data-governance-v2"

* provision.type = #permit
* provision.period.start = "2026-03-08"
* provision.period.end = "2031-03-08"
* provision.purpose[0].system = "http://terminology.hl7.org/CodeSystem/v3-ActReason"
* provision.purpose[0].code = #HRESCH
* provision.purpose[0].display = "Healthcare Research"
