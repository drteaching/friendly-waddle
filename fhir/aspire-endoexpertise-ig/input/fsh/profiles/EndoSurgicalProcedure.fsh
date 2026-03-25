Profile: EndoSurgicalProcedure
Parent: Procedure
Id: endo-surgical-procedure
Title: "Endometriosis Surgical Procedure"
Description: "Profile for endometriosis surgical procedures, capturing Enzian classification scores, Endometriosis Fertility Index (EFI), multidisciplinary collaboration details, and video documentation references."

* ^status = #draft

* status MS
* code 1..1 MS
* subject 1..1 MS
* performed[x] 1..1 MS
* performer 1..* MS
* performer.actor MS
* performer.function MS
* bodySite MS
* outcome MS
* complication MS
* report MS
* note MS

* extension contains
    EnzianScore named enzianScore 0..1 MS and
    EndometriosisFertilityIndex named efi 0..1 MS and
    CollaborationDetail named collaboration 0..* MS and
    VideoDocumentation named videoDocumentation 0..* MS and
    AiAssistedFlag named aiAssisted 0..1 MS

Extension: EndometriosisFertilityIndex
Id: endometriosis-fertility-index
Title: "Endometriosis Fertility Index"
Description: "The calculated Endometriosis Fertility Index (EFI) score for the patient at the time of surgical assessment."
Context: Procedure
* value[x] only integer
* valueInteger ^short = "EFI score (0–10)"

Extension: CollaborationDetail
Id: collaboration-detail
Title: "Multidisciplinary Collaboration Detail"
Description: "Details of multidisciplinary collaboration during the surgical procedure, referencing participating practitioners and their disciplines."
Context: Procedure
* extension contains
    discipline 1..1 and
    practitioner 1..1
* extension[discipline].value[x] only CodeableConcept
* extension[discipline].valueCodeableConcept from PainManagementDisciplineVS (extensible)
* extension[discipline] ^short = "The collaborating discipline"
* extension[practitioner].value[x] only Reference(Practitioner)
* extension[practitioner] ^short = "Reference to the collaborating practitioner"

Extension: VideoDocumentation
Id: video-documentation
Title: "Video Documentation"
Description: "Reference to video recordings captured during the surgical procedure, stored in the Video Vault."
Context: Procedure
* extension contains
    videoReference 1..1 and
    videoSegment 0..1 and
    consentReference 0..1
* extension[videoReference].value[x] only Reference(Media)
* extension[videoReference] ^short = "Reference to the video resource"
* extension[videoSegment].value[x] only string
* extension[videoSegment] ^short = "Identifier for the specific video segment"
* extension[consentReference].value[x] only Reference(Consent)
* extension[consentReference] ^short = "Reference to patient consent for video recording"
