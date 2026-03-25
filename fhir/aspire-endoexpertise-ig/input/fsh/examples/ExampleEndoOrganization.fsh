Instance: ExampleEndoOrganization
InstanceOf: EndoOrganization
Usage: #example
Title: "Example Tier 3 Endometriosis Centre"
Description: "An example of a Tier 3 advanced endometriosis centre accredited within the ASPIRE EndoExpertise network."

* identifier[0].system = "http://ns.electronichealth.net.au/id/hi/hpio/1.0"
* identifier[0].value = "8003621566684455"
* identifier[1].system = "https://aspire.org/fhir/endoexpertise/network-id"
* identifier[1].value = "ASPIRE-ORG-0042"
* active = true
* name = "Melbourne Advanced Endometriosis Centre"
* type[0].coding[0].system = "http://terminology.hl7.org/CodeSystem/organization-type"
* type[0].coding[0].code = #prov
* type[0].coding[0].display = "Healthcare Provider"
* telecom[0].system = #phone
* telecom[0].value = "+61 3 9876 5432"
* telecom[0].use = #work
* telecom[1].system = #email
* telecom[1].value = "info@melbourneendo.example.com.au"
* telecom[1].use = #work
* address[0].use = #work
* address[0].type = #physical
* address[0].line = "123 Collins Street"
* address[0].city = "Melbourne"
* address[0].state = "VIC"
* address[0].postalCode = "3000"
* address[0].country = "AU"

* extension[accreditationTier].valueCodeableConcept.coding[0].system = "https://aspire.org/fhir/endoexpertise/CodeSystem/accreditation-tier-cs"
* extension[accreditationTier].valueCodeableConcept.coding[0].code = #tier-3
* extension[accreditationTier].valueCodeableConcept.coding[0].display = "Tier 3 — Advanced"
* extension[accreditationStatus].valueCode = #accredited
* extension[accreditationValidUntil].valueDate = "2027-06-30"
