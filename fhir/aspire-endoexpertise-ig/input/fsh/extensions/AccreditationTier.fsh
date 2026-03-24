Extension: AccreditationTier
Id: accreditation-tier
Title: "Accreditation Tier"
Description: "The accreditation tier assigned to an organisation or practitioner within the ASPIRE EndoExpertise network, reflecting their assessed level of capability for endometriosis care."
Context: Organization, PractitionerRole, Basic
* value[x] only CodeableConcept
* valueCodeableConcept from AccreditationTierVS (required)

ValueSet: AccreditationTierVS
Id: accreditation-tier-vs
Title: "Accreditation Tier Value Set"
Description: "Value set defining the accreditation tiers within the ASPIRE EndoExpertise network."
* ^status = #draft
* include codes from system AccreditationTierCS
