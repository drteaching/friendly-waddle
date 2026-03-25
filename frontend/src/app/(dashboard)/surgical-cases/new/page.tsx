'use client';

import { useState } from 'react';
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

export default function NewSurgicalCasePage() {
  const [step, setStep] = useState<'details' | 'enzian' | 'review'>('details');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Log New Surgical Case</h1>

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
                <Input id="date" type="date" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="patient-ref">Patient Reference</Label>
                <Input
                  id="patient-ref"
                  placeholder="e.g. PT-1234"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="procedure">Procedure</Label>
              <Select>
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
              <Label htmlFor="rasrm">rASRM Stage</Label>
              <Select>
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

            <div className="space-y-1">
              <Label htmlFor="notes">Operative Notes</Label>
              <Textarea
                id="notes"
                placeholder="Describe the surgical findings and technique..."
                rows={4}
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
          <EnzianScoreForm />
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
            <div className="rounded-md bg-gray-50 p-4 text-sm text-gray-500">
              Case summary will be displayed here once the form state is
              connected to the API.
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('enzian')}>
                Back
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Submit Case
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
