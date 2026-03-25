Instance: ExampleEndoSurgicalProcedure
InstanceOf: EndoSurgicalProcedure
Usage: #example
Title: "Example Deep Endometriosis Excision Procedure"
Description: "An example of a deep infiltrating endometriosis excision procedure with Enzian scoring, EFI, multidisciplinary collaboration, and video documentation."

* status = #completed
* code.coding[0].system = "http://snomed.info/sct"
* code.coding[0].code = #387713003
* code.coding[0].display = "Surgical procedure"
* code.text = "Laparoscopic excision of deep infiltrating endometriosis"
* subject = Reference(Patient/example-patient)
* performedDateTime = "2026-03-10T08:30:00+11:00"

* performer[0].actor = Reference(Practitioner/example-surgeon)
* performer[0].function.coding[0].system = "http://snomed.info/sct"
* performer[0].function.coding[0].code = #304292004
* performer[0].function.coding[0].display = "Surgeon"

* performer[1].actor = Reference(Practitioner/example-colorectal-surgeon)
* performer[1].function.coding[0].system = "http://snomed.info/sct"
* performer[1].function.coding[0].code = #304292004
* performer[1].function.coding[0].display = "Surgeon"

* bodySite[0].coding[0].system = "http://snomed.info/sct"
* bodySite[0].coding[0].code = #245543004
* bodySite[0].coding[0].display = "Structure of rectovaginal septum"
* bodySite[1].coding[0].system = "http://snomed.info/sct"
* bodySite[1].coding[0].code = #34402009
* bodySite[1].coding[0].display = "Rectum structure"

* outcome.coding[0].system = "http://snomed.info/sct"
* outcome.coding[0].code = #385669000
* outcome.coding[0].display = "Successful"

* note[0].text = "Complete excision of deep infiltrating endometriosis involving rectovaginal septum and anterior rectal wall. Disc resection performed by colorectal surgeon. No intraoperative complications."

* extension[enzianScore].extension[compartmentA].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentA].valueCoding.code = #2
* extension[enzianScore].extension[compartmentA].valueCoding.display = "Grade 2 — 1 to 3 cm"
* extension[enzianScore].extension[compartmentB].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentB].valueCoding.code = #1
* extension[enzianScore].extension[compartmentB].valueCoding.display = "Grade 1 — Less than 1 cm"
* extension[enzianScore].extension[compartmentC].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentC].valueCoding.code = #2
* extension[enzianScore].extension[compartmentC].valueCoding.display = "Grade 2 — 1 to 3 cm"
* extension[enzianScore].extension[compartmentT].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentT].valueCoding.code = #0
* extension[enzianScore].extension[compartmentT].valueCoding.display = "Grade 0 — No involvement"
* extension[enzianScore].extension[compartmentP].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentP].valueCoding.code = #1
* extension[enzianScore].extension[compartmentP].valueCoding.display = "Grade 1 — Less than 1 cm"
* extension[enzianScore].extension[compartmentO].valueCoding.system = "https://aspire.org/fhir/endoexpertise/CodeSystem/enzian-compartment-cs"
* extension[enzianScore].extension[compartmentO].valueCoding.code = #0
* extension[enzianScore].extension[compartmentO].valueCoding.display = "Grade 0 — No involvement"
* extension[enzianScore].extension[totalScore].valueString = "A2 B1 C2 T0 P1 O0"

* extension[efi].valueInteger = 6

* extension[collaboration][0].extension[discipline].valueCodeableConcept.coding[0].system = "https://aspire.org/fhir/endoexpertise/CodeSystem/pain-management-discipline-cs"
* extension[collaboration][0].extension[discipline].valueCodeableConcept.coding[0].code = #colorectal-surgery
* extension[collaboration][0].extension[discipline].valueCodeableConcept.coding[0].display = "Colorectal Surgery"
* extension[collaboration][0].extension[practitioner].valueReference = Reference(Practitioner/example-colorectal-surgeon)

* extension[videoDocumentation][0].extension[videoReference].valueReference = Reference(Media/example-surgical-video)
* extension[videoDocumentation][0].extension[videoSegment].valueString = "full-procedure"
* extension[videoDocumentation][0].extension[consentReference].valueReference = Reference(ExampleEndoPatientConsent)

* extension[aiAssisted].extension[assisted].valueBoolean = true
* extension[aiAssisted].extension[modelName].valueString = "EndoDetect v2.1"
* extension[aiAssisted].extension[modelVersion].valueString = "2.1.0"
* extension[aiAssisted].extension[confidence].valueDecimal = 0.92
* extension[aiAssisted].extension[purpose].valueString = "Lesion detection and classification assistance"
