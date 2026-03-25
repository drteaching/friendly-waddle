ValueSet: EnzianCompartmentVS
Id: enzian-compartment-vs
Title: "Enzian Compartment Grade Value Set"
Description: "Value set defining the severity grades for individual compartments in the revised Enzian classification system for deep endometriosis."
* ^status = #draft

* include codes from system EnzianCompartmentCS

CodeSystem: EnzianCompartmentCS
Id: enzian-compartment-cs
Title: "Enzian Compartment Grade Code System"
Description: "Code system for Enzian classification compartment severity grades."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #0 "Grade 0 — No involvement" "No endometriosis involvement in this compartment"
* #1 "Grade 1 — Less than 1 cm" "Endometriosis lesion less than 1 cm in this compartment"
* #2 "Grade 2 — 1 to 3 cm" "Endometriosis lesion 1 to 3 cm in this compartment"
* #3 "Grade 3 — Greater than 3 cm" "Endometriosis lesion greater than 3 cm in this compartment"
