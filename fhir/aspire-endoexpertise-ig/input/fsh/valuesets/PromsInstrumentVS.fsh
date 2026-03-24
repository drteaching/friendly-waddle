ValueSet: PromsInstrumentVS
Id: proms-instrument-vs
Title: "PROMs Instrument Value Set"
Description: "Value set defining validated patient-reported outcome measure (PROM) instruments used within the ASPIRE EndoExpertise platform."
* ^status = #draft

* include codes from system PromsInstrumentCS

CodeSystem: PromsInstrumentCS
Id: proms-instrument-cs
Title: "PROMs Instrument Code System"
Description: "Code system for patient-reported outcome measure instruments relevant to endometriosis care."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #ehp-30 "EHP-30" "Endometriosis Health Profile-30 questionnaire"
* #ehp-5 "EHP-5" "Endometriosis Health Profile-5 (short form)"
* #eq-5d-5l "EQ-5D-5L" "EuroQol 5-Dimension 5-Level quality of life instrument"
* #sf-36 "SF-36" "Short Form 36-item health survey"
* #sf-12 "SF-12" "Short Form 12-item health survey"
* #vas-pain "VAS Pain" "Visual Analogue Scale for pain assessment"
* #nrs-pain "NRS Pain" "Numeric Rating Scale for pain assessment"
* #bpi "BPI" "Brief Pain Inventory"
* #promis-pain "PROMIS Pain Interference" "PROMIS Pain Interference short form"
* #promis-fatigue "PROMIS Fatigue" "PROMIS Fatigue short form"
* #phq-9 "PHQ-9" "Patient Health Questionnaire-9 for depression screening"
* #gad-7 "GAD-7" "Generalised Anxiety Disorder-7 questionnaire"
* #fsfi "FSFI" "Female Sexual Function Index"
* #wpai "WPAI" "Work Productivity and Activity Impairment questionnaire"
* #pgic "PGIC" "Patient Global Impression of Change"
