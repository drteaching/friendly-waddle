Extension: AiAssistedFlag
Id: ai-assisted-flag
Title: "AI-Assisted Flag"
Description: "Indicates whether artificial intelligence assistance was used during an assessment, procedure, or decision, and provides details of the AI model utilised."
Context: Procedure, Observation, DiagnosticReport, Basic
* extension contains
    assisted 1..1 and
    modelName 0..1 and
    modelVersion 0..1 and
    confidence 0..1 and
    purpose 0..1

* extension[assisted] ^short = "Whether AI assistance was used"
* extension[assisted].value[x] only boolean

* extension[modelName] ^short = "Name of the AI model used"
* extension[modelName].value[x] only string

* extension[modelVersion] ^short = "Version of the AI model"
* extension[modelVersion].value[x] only string

* extension[confidence] ^short = "AI confidence score (0.0–1.0)"
* extension[confidence].value[x] only decimal

* extension[purpose] ^short = "Purpose of the AI assistance (e.g., lesion detection, classification)"
* extension[purpose].value[x] only string
