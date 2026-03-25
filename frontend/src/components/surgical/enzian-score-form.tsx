'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * #Enzian classification form for deep endometriosis.
 *
 * The #Enzian system uses a matrix of compartments (P, O, T — peritoneal,
 * ovarian, tubal/deep infiltrating) and locations (A — rectovaginal septum /
 * vagina, B — uterosacral ligaments / pelvic sidewall, C — rectum /
 * sigmoid) each scored 0–3 based on lesion size.
 *
 * Additional compartments FA, FB, FI, FU and FO capture extra-pelvic and
 * other manifestations.
 */

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

const defaultScores: EnzianScores = {
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

const compartmentLabels: Record<keyof EnzianScores, string> = {
  P: 'P — Peritoneum',
  O: 'O — Ovary',
  T: 'T — Tubal / Deep Infiltrating',
  A: 'A — Rectovaginal Septum / Vagina',
  B: 'B — Uterosacral Ligaments / Pelvic Sidewall',
  C: 'C — Rectum / Sigmoid',
  FA: 'FA — Adenomyosis',
  FB: 'FB — Bladder',
  FI: 'FI — Intrinsic Ureteral',
  FU: 'FU — Other Urinary Tract',
  FO: 'FO — Other Locations',
};

const scoreOptions = [
  { value: '0', label: '0 — No disease' },
  { value: '1', label: '1 — < 1 cm' },
  { value: '2', label: '2 — 1–3 cm' },
  { value: '3', label: '3 — > 3 cm' },
];

interface EnzianScoreFormProps {
  /** Initial scores to populate the form. */
  initialScores?: Partial<EnzianScores>;
  /** Callback fired when any compartment score changes. */
  onChange?: (scores: EnzianScores) => void;
}

export function EnzianScoreForm({
  initialScores,
  onChange,
}: EnzianScoreFormProps) {
  const [scores, setScores] = useState<EnzianScores>({
    ...defaultScores,
    ...initialScores,
  });

  const handleChange = (compartment: keyof EnzianScores, value: string) => {
    const updated = { ...scores, [compartment]: value };
    setScores(updated);
    onChange?.(updated);
  };

  /** Build the summary string, e.g. "P3 O2 T1 A1 B2 C0". */
  const summary = (Object.keys(scores) as Array<keyof EnzianScores>)
    .filter((k) => scores[k] !== '0')
    .map((k) => `${k}${scores[k]}`)
    .join(' ') || 'No involvement recorded';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">#Enzian Classification</CardTitle>
        <p className="text-xs text-gray-500">
          Score each compartment based on largest lesion diameter.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary compartments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            ['P', 'O', 'T', 'A', 'B', 'C'] as Array<keyof EnzianScores>
          ).map((compartment) => (
            <div key={compartment} className="space-y-1">
              <Label className="text-xs">
                {compartmentLabels[compartment]}
              </Label>
              <Select
                value={scores[compartment]}
                onValueChange={(v) => handleChange(compartment, v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scoreOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Additional (F) compartments */}
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-teal-700 hover:text-teal-800">
            Additional Compartments (F)
          </summary>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              ['FA', 'FB', 'FI', 'FU', 'FO'] as Array<keyof EnzianScores>
            ).map((compartment) => (
              <div key={compartment} className="space-y-1">
                <Label className="text-xs">
                  {compartmentLabels[compartment]}
                </Label>
                <Select
                  value={scores[compartment]}
                  onValueChange={(v) => handleChange(compartment, v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scoreOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </details>

        {/* Summary */}
        <div className="rounded-md bg-teal-50 px-4 py-3">
          <p className="text-xs text-gray-500">Score Summary</p>
          <p className="mt-1 font-mono text-sm font-semibold text-teal-800">
            {summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
