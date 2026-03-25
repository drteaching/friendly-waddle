Profile: EndoPatientConsent
Parent: Consent
Id: endo-patient-consent
Title: "Endometriosis Patient Consent"
Description: "Profile for patient consent within the ASPIRE EndoExpertise platform, supporting endometriosis-specific consent scopes such as registry participation, video recording, and data sharing for research."

* ^status = #draft

* status 1..1 MS
* scope 1..1 MS
* category 1..* MS
* patient 1..1 MS
* dateTime 1..1 MS
* performer 0..* MS
* organization 0..* MS
* policy MS
* policy.authority MS
* policy.uri MS

* provision 1..1 MS
* provision.type 1..1 MS
* provision.period MS
* provision.purpose MS
* provision.class MS

* scope.coding ^slicing.discriminator.type = #pattern
* scope.coding ^slicing.discriminator.path = "$this"
* scope.coding ^slicing.rules = #open
* scope.coding contains endoScope 0..* MS
* scope.coding[endoScope] from ConsentScopeVS (extensible)
* scope.coding[endoScope] ^short = "Endometriosis-specific consent scope"
