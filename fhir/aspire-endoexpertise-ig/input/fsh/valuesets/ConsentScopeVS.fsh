ValueSet: ConsentScopeVS
Id: consent-scope-vs
Title: "Endometriosis Consent Scope Value Set"
Description: "Value set defining endometriosis-specific consent scopes used within the ASPIRE EndoExpertise platform."
* ^status = #draft

* include codes from system ConsentScopeCS

CodeSystem: ConsentScopeCS
Id: consent-scope-cs
Title: "Endometriosis Consent Scope Code System"
Description: "Code system for endometriosis-specific consent scopes."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #registry-participation "Registry Participation" "Consent to include de-identified clinical data in the ASPIRE surgical registry"
* #video-recording "Video Recording" "Consent for video recording of surgical procedures"
* #video-education "Video Education" "Consent for use of surgical video in medical education"
* #video-research "Video Research" "Consent for use of surgical video in research"
* #data-research "Data Research" "Consent for use of clinical data in research"
* #biobank "Biobanking" "Consent for collection and storage of biological samples"
* #cross-centre-sharing "Cross-Centre Sharing" "Consent for sharing clinical data across ASPIRE network centres"
* #ai-analysis "AI Analysis" "Consent for AI-assisted analysis of clinical data or surgical video"
* #proms-collection "PROMs Collection" "Consent for collection and use of patient-reported outcome measures"
* #international-sharing "International Data Sharing" "Consent for sharing de-identified data with international registries"
