Profile: EndoOrganization
Parent: Organization
Id: endo-organization
Title: "Endometriosis Centre Organisation"
Description: "Profile for organisations participating in the ASPIRE EndoExpertise network, including accreditation tier, status, validity period, and network membership details."

* ^status = #draft

* identifier 1..* MS
* identifier ^short = "Organisation identifiers including HPI-O and ASPIRE network ID"
* name 1..1 MS
* type 1..* MS
* telecom MS
* address MS
* active 1..1 MS

* extension contains
    AccreditationTier named accreditationTier 0..1 MS and
    AccreditationStatus named accreditationStatus 0..1 MS and
    AccreditationValidUntil named accreditationValidUntil 0..1 MS and
    NetworkMembers named networkMembers 0..* MS

Extension: AccreditationStatus
Id: accreditation-status
Title: "Accreditation Status"
Description: "The current accreditation status of the endometriosis centre within the ASPIRE network."
Context: Organization, Basic
* value[x] only code
* valueCode from AccreditationStatusVS (required)

Extension: AccreditationValidUntil
Id: accreditation-valid-until
Title: "Accreditation Valid Until"
Description: "The date until which the organisation's current accreditation remains valid."
Context: Organization, Basic
* value[x] only date

Extension: NetworkMembers
Id: network-members
Title: "Network Members"
Description: "References to other organisations that are members of this centre's collaborative network."
Context: Organization
* value[x] only Reference(Organization)
