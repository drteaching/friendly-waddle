ValueSet: EndometriosisLesionLocationVS
Id: endometriosis-lesion-location-vs
Title: "Endometriosis Lesion Location Value Set"
Description: "Value set defining anatomical locations where endometriosis lesions may be identified during surgical assessment."
* ^status = #draft

* include codes from system EndometriosisLesionLocationCS

CodeSystem: EndometriosisLesionLocationCS
Id: endometriosis-lesion-location-cs
Title: "Endometriosis Lesion Location Code System"
Description: "Code system for anatomical sites of endometriosis lesion involvement."
* ^status = #draft
* ^caseSensitive = true
* ^content = #complete

* #peritoneum-anterior "Anterior Peritoneum" "Peritoneal surface anterior to the uterus"
* #peritoneum-posterior "Posterior Peritoneum" "Peritoneal surface posterior to the uterus including cul-de-sac"
* #ovary-left "Left Ovary" "Endometriosis involving the left ovary"
* #ovary-right "Right Ovary" "Endometriosis involving the right ovary"
* #fallopian-tube-left "Left Fallopian Tube" "Endometriosis involving the left fallopian tube"
* #fallopian-tube-right "Right Fallopian Tube" "Endometriosis involving the right fallopian tube"
* #uterosacral-ligament-left "Left Uterosacral Ligament" "Endometriosis involving the left uterosacral ligament"
* #uterosacral-ligament-right "Right Uterosacral Ligament" "Endometriosis involving the right uterosacral ligament"
* #rectovaginal-septum "Rectovaginal Septum" "Endometriosis involving the rectovaginal septum"
* #vagina "Vagina" "Endometriosis involving the vaginal wall"
* #rectum "Rectum" "Endometriosis involving the rectum"
* #sigmoid "Sigmoid Colon" "Endometriosis involving the sigmoid colon"
* #appendix "Appendix" "Endometriosis involving the appendix"
* #small-bowel "Small Bowel" "Endometriosis involving the small bowel"
* #bladder "Bladder" "Endometriosis involving the urinary bladder"
* #ureter-left "Left Ureter" "Endometriosis involving the left ureter"
* #ureter-right "Right Ureter" "Endometriosis involving the right ureter"
* #pelvic-sidewall-left "Left Pelvic Sidewall" "Endometriosis involving the left pelvic sidewall"
* #pelvic-sidewall-right "Right Pelvic Sidewall" "Endometriosis involving the right pelvic sidewall"
* #diaphragm "Diaphragm" "Endometriosis involving the diaphragm"
* #abdominal-wall "Abdominal Wall" "Endometriosis involving the abdominal wall"
* #adenomyosis "Adenomyosis" "Endometriosis within the myometrium (adenomyosis)"
