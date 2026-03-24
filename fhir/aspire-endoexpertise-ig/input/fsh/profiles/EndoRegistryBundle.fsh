Profile: EndoRegistryBundle
Parent: Bundle
Id: endo-registry-bundle
Title: "Endometriosis Registry Bundle"
Description: "A Bundle profile for submitting standardised EPHect-compliant registry data to the ASPIRE EndoExpertise surgical registry."

* ^status = #draft

* type = #collection
* type MS
* timestamp 1..1 MS
* identifier 1..1 MS
* identifier ^short = "Unique registry submission identifier"

* entry 1..* MS
* entry ^slicing.discriminator.type = #profile
* entry ^slicing.discriminator.path = "resource"
* entry ^slicing.rules = #open
* entry ^slicing.ordered = false
* entry ^slicing.description = "Slicing of bundle entries by resource profile"

* entry contains
    patient 1..1 MS and
    procedure 1..* MS and
    consent 1..1 MS and
    practitionerRole 1..* MS and
    organization 1..1 MS

* entry[patient].resource only Patient
* entry[patient] ^short = "The patient who is the subject of the registry submission"

* entry[procedure].resource only EndoSurgicalProcedure
* entry[procedure] ^short = "Surgical procedure(s) included in the registry submission"

* entry[consent].resource only EndoPatientConsent
* entry[consent] ^short = "Patient consent for registry data submission"

* entry[practitionerRole].resource only EndoPractitionerRole
* entry[practitionerRole] ^short = "Practitioner(s) involved in the procedures"

* entry[organization].resource only EndoOrganization
* entry[organization] ^short = "The organisation submitting the registry data"
