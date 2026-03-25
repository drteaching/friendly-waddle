ValueSet: PainManagementDisciplineVS
Id: pain-management-discipline-vs
Title: "Pain Management Discipline Value Set"
Description: "Value set defining the disciplines involved in multidisciplinary pain management for endometriosis patients."
* ^status = #draft

* include codes from system PainManagementDisciplineCS

CodeSystem: PainManagementDisciplineCS
Id: pain-management-discipline-cs
Title: "Pain Management Discipline Code System"
Description: "Code system for disciplines contributing to multidisciplinary endometriosis pain management."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #gynaecology "Gynaecology" "Gynaecological surgical and medical management"
* #pain-medicine "Pain Medicine" "Specialist pain medicine"
* #pelvic-physio "Pelvic Floor Physiotherapy" "Pelvic floor physiotherapy and rehabilitation"
* #psychology "Psychology" "Psychological support and pain psychology"
* #psychiatry "Psychiatry" "Psychiatric assessment and management"
* #dietetics "Dietetics" "Dietary assessment and nutritional management"
* #general-practice "General Practice" "Primary care and general practice coordination"
* #colorectal-surgery "Colorectal Surgery" "Colorectal surgical expertise for bowel endometriosis"
* #urology "Urology" "Urological expertise for urinary tract endometriosis"
* #fertility-medicine "Fertility Medicine" "Reproductive medicine and fertility services"
* #nursing "Endometriosis Nursing" "Specialist endometriosis nursing care"
* #social-work "Social Work" "Social work and support services"
* #occupational-therapy "Occupational Therapy" "Occupational therapy for functional rehabilitation"
* #sexology "Sexology" "Sexual health and intimacy counselling"
