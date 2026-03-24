Extension: CpdTracking
Id: cpd-tracking
Title: "CPD Tracking"
Description: "Tracks continuing professional development (CPD) hours for practitioners within the ASPIRE EndoExpertise accreditation framework."
Context: PractitionerRole
* extension contains
    totalHours 0..1 and
    periodHours 0..1 and
    periodStart 0..1 and
    periodEnd 0..1 and
    requiredHours 0..1 and
    lastActivityDate 0..1

* extension[totalHours] ^short = "Total accumulated CPD hours"
* extension[totalHours].value[x] only decimal

* extension[periodHours] ^short = "CPD hours within the current accreditation period"
* extension[periodHours].value[x] only decimal

* extension[periodStart] ^short = "Start date of the CPD measurement period"
* extension[periodStart].value[x] only date

* extension[periodEnd] ^short = "End date of the CPD measurement period"
* extension[periodEnd].value[x] only date

* extension[requiredHours] ^short = "Required CPD hours for the current accreditation period"
* extension[requiredHours].value[x] only decimal

* extension[lastActivityDate] ^short = "Date of the most recent CPD activity"
* extension[lastActivityDate].value[x] only dateTime
