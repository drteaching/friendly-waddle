Extension: EnzianScore
Id: enzian-score
Title: "Enzian Classification Score"
Description: "A complex extension representing the revised Enzian classification for deep endometriosis, with compartments A (vagina/rectovaginal septum), B (uterosacral ligaments/pelvic sidewall), C (rectum/sigmoid), T (tubal/ovarian), and additional peritoneal (P) and ovarian (O) compartments."
Context: Procedure
* extension contains
    compartmentA 0..1 and
    compartmentB 0..1 and
    compartmentC 0..1 and
    compartmentT 0..1 and
    compartmentP 0..1 and
    compartmentO 0..1 and
    totalScore 0..1

* extension[compartmentA] ^short = "Compartment A — Vagina / Rectovaginal septum"
* extension[compartmentA].value[x] only Coding
* extension[compartmentA].valueCoding from EnzianCompartmentVS (required)

* extension[compartmentB] ^short = "Compartment B — Uterosacral ligaments / Pelvic sidewall"
* extension[compartmentB].value[x] only Coding
* extension[compartmentB].valueCoding from EnzianCompartmentVS (required)

* extension[compartmentC] ^short = "Compartment C — Rectum / Sigmoid colon"
* extension[compartmentC].value[x] only Coding
* extension[compartmentC].valueCoding from EnzianCompartmentVS (required)

* extension[compartmentT] ^short = "Compartment T — Tubal and ovarian endometriosis"
* extension[compartmentT].value[x] only Coding
* extension[compartmentT].valueCoding from EnzianCompartmentVS (required)

* extension[compartmentP] ^short = "Peritoneal endometriosis involvement"
* extension[compartmentP].value[x] only Coding
* extension[compartmentP].valueCoding from EnzianCompartmentVS (required)

* extension[compartmentO] ^short = "Ovarian endometrioma involvement"
* extension[compartmentO].value[x] only Coding
* extension[compartmentO].valueCoding from EnzianCompartmentVS (required)

* extension[totalScore] ^short = "Overall Enzian total score summary"
* extension[totalScore].value[x] only string
