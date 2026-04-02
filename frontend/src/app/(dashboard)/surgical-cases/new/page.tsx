'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EnzianScoreForm } from '@/components/surgical/enzian-score-form';
import { createSurgicalCase } from '@/lib/hooks';

const PLACEHOLDER_ORG_ID = '00000000-0000-0000-0000-000000000001';
const PLACEHOLDER_SURGEON_ID = '00000000-0000-0000-0000-000000000002';

interface EnzianScores {
  P: string;
  O: string;
  T: string;
  A: string;
  B: string;
  C: string;
  FA: string;
  FB: string;
  FI: string;
  FU: string;
  FO: string;
}

const defaultEnzianScores: EnzianScores = {
  P: '0',
  O: '0',
  T: '0',
  A: '0',
  B: '0',
  C: '0',
  FA: '0',
  FB: '0',
  FI: '0',
  FU: '0',
  FO: '0',
};

const procedureLabels: Record<string, string> = {
  lap_excision: 'Laparoscopic excision of deep infiltrating endometriosis',
  diagnostic_lap: 'Diagnostic laparoscopy with biopsy',
  robotic_excision: 'Robotic-assisted excision of rectovaginal endometriosis',
  hysterectomy: 'Laparoscopic hysterectomy',
  other: 'Other',
};

const stageLabels: Record<string, string> = {
  I: 'Stage I \u2014 Minimal',
  II: 'Stage II \u2014 Mild',
  III: 'Stage III \u2014 Moderate',
  IV: 'Stage IV \u2014 Severe',
};

function formatEnzianSummary(scores: EnzianScores): string {
  const keys: Array<keyof EnzianScores> = ['P', 'O', 'T', 'A', 'B', 'C', 'FA', 'FB', 'FI', 'FU', 'FO'];
  const parts = keys
    .filter((k) => scores[k] !== '0')
    .map((k) => `${k}${scores[k]}`);
  return parts.length > 0 ? parts.join(' ') : 'No involvement recorded';
}

export default function NewSurgicalCasePage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'enzian' | 'review'>('details');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [date, setDate] = useState('');
  const [patientId, setPatientId] = useState('');
  const [procedureType, setProcedureType] = useState('');
  const [endometriosisStage, setEndometriosisStage] = useState('');
  const [operativeNotes, setOperativeNotes] = useState('');
  const [operativeTimeMinutes, setOperativeTimeMinutes] = useState('');
  const [estimatedBloodLossMl, setEstimatedBloodLossMl] = useState('');
  const [enzianScores, setEnzianScores] = useState<EnzianScores>(defaultEnzianScores);

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMessage(null);

    const enzianScoreNumbers: Record<string, number> = {};
    for (const [k, v] of Object.entries(enzianScores)) {
      enzianScoreNumbers[k] = parseInt(v, 10);
    }

    const payload: Record<string, unknown> = {
      organisationId: PLACEHOLDER_ORG_ID,
      surgeonId: PLACEHOLDER_SURGEON_ID,
      procedureDate: date,
      procedureType,
      endometriosisStage: endometriosisStage || undefined,
      enzianScore: enzianScoreNumbers,
      operativeNotes: operativeNotes || undefined,
      operativeTimeMinutes: operativeTimeMinutes ? parseInt(operativeTimeMinutes, 10) : undefined,
      estimatedBloodLossMl: estimatedBloodLossMl ? parseInt(estimatedBloodLossMl, 10) : undefined,
      patientId: patientId || undefined,
    };

    try {
      await createSurgicalCase(payload);
      setSuccessMessage('Surgical case created successfully.');
      setTimeout(() => {
        router.push('/surgical-cases');
      }, 1500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to create surgical case.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          {successMessage} Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Log New Surgical Case</h1>

      {errorMessage && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm">
        {(['details', 'enzian', 'review'] as const).map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors ${
              step === s
                ? 'bg-teal-100 text-teal-800'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current text-white text-xs">
              {i + 1}
            </span>
            <span className={step === s ? 'text-teal-800' : ''}>
              {s === 'details'
                ? 'Case Details'
                : s === 'enzian'
                  ? '#Enzian Score'
                  : 'Review'}
            </span>
          </button>
        ))}
      </div>

      {/* Step: Case Details */}
      {step === 'details' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="date">Date of Surgery</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="patient-id">Patient ID (optional)</Label>
                <Input
                  id="patient-id"
                  placeholder="e.g. UUID or reference"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="procedure">Procedure</Label>
              <Select value={procedureType} onValueChange={setProcedureType}>
                <SelectTrigger id="procedure">
                  <SelectValue placeholder="Select procedure type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lap_excision">
                    Laparoscopic excision of deep infiltrating endometriosis
                  </SelectItem>
                  <SelectItem value="diagnostic_lap">
                    Diagnostic laparoscopy with biopsy
                  </SelectItem>
                  <SelectItem value="robotic_excision">
                    Robotic-assisted excision of rectovaginal endometriosis
                  </SelectItem>
                  <SelectItem value="hysterectomy">
                    Laparoscopic hysterectomy
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="rasrm">Endometriosis Stage (rASRM)</Label>
              <Select value={endometriosisStage} onValueChange={setEndometriosisStage}>
                <SelectTrigger id="rasrm">
                  <SelectValue placeholder="Select rASRM stage..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="I">Stage I — Minimal</SelectItem>
                  <SelectItem value="II">Stage II — Mild</SelectItem>
                  <SelectItem value="III">Stage III — Moderate</SelectItem>
                  <SelectItem value="IV">Stage IV — Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="op-time">Operative Time (minutes)</Label>
                <Input
                  id="op-time"
                  type="number"
                  min="0"
                  placeholder="e.g. 120"
                  value={operativeTimeMinutes}
                  onChange={(e) => setOperativeTimeMinutes(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ebl">Estimated Blood Loss (mL)</Label>
                <Input
                  id="ebl"
                  type="number"
                  min="0"
                  placeholder="e.g. 200"
                  value={estimatedBloodLossMl}
                  onChange={(e) => setEstimatedBloodLossMl(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="notes">Operative Notes</Label>
              <Textarea
                id="notes"
                placeholder="Describe the surgical findings and technique..."
                rows={4}
                value={operativeNotes}
                onChange={(e) => setOperativeNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep('enzian')}>
                Next: #Enzian Score
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step: #Enzian Classification */}
      {step === 'enzian' && (
        <div className="space-y-4">
          <EnzianScoreForm
            initialScores={enzianScores}
            onChange={(scores) => setEnzianScores(scores)}
          />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('details')}>
              Back
            </Button>
            <Button onClick={() => setStep('review')}>Next: Review</Button>
          </div>
        </div>
      )}

      {/* Step: Review */}
      {step === 'review' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Review &amp; Submit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Please review the case details and #Enzian classification before
              submitting. You can return to previous steps to make changes.
            </p>

            <div className="rounded-md bg-gray-50 p-4 text-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <span className="font-medium text-gray-700">Date of Surgery: </span>
                  <span className="text-gray-900">
                    {date
                      ? new Date(date).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '\u2014'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Patient ID: </span>
                  <span className="text-gray-900">{patientId || '\u2014'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Procedure: </span>
                  <span className="text-gray-900">
                    {procedureType ? procedureLabels[procedureType] || procedureType : '\u2014'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Endometriosis Stage: </span>
                  <span className="text-gray-900">
                    {endometriosisStage ? stageLabels[endometriosisStage] || endometriosisStage : '\u2014'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Operative Time: </span>
                  <span className="text-gray-900">
                    {operativeTimeMinutes ? `${operativeTimeMinutes} min` : '\u2014'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Est. Blood Loss: </span>
                  <span className="text-gray-900">
                    {estimatedBloodLossMl ? `${estimatedBloodLossMl} mL` : '\u2014'}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">#Enzian Score: </span>
                <span className="font-mono text-teal-800">{formatEnzianSummary(enzianScores)}</span>
              </div>

              {operativeNotes && (
                <div>
                  <span className="font-medium text-gray-700">Operative Notes: </span>
                  <span className="text-gray-900">{operativeNotes}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('enzian')}>
                Back
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={handleSubmit}
                disabled={submitting || !date || !procedureType}
              >
                {submitting ? 'Submitting...' : 'Submit Case'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
