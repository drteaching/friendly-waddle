ValueSet: AccreditationStatusVS
Id: accreditation-status-vs
Title: "Accreditation Status Value Set"
Description: "Value set defining the possible accreditation statuses for organisations and practitioners within the ASPIRE EndoExpertise network."
* ^status = #draft

* include codes from system AccreditationStatusCS

CodeSystem: AccreditationStatusCS
Id: accreditation-status-cs
Title: "Accreditation Status Code System"
Description: "Code system for accreditation lifecycle statuses."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #pending "Pending" "Application has been submitted and is awaiting review"
* #under-review "Under Review" "Application is currently being assessed"
* #accredited "Accredited" "Organisation or practitioner has been accredited"
* #conditional "Conditional" "Accreditation granted with conditions that must be met within a specified timeframe"
* #expired "Expired" "Accreditation has expired and requires renewal"
* #suspended "Suspended" "Accreditation has been temporarily suspended"
* #revoked "Revoked" "Accreditation has been permanently revoked"
* #withdrawn "Withdrawn" "Application has been withdrawn by the applicant"
