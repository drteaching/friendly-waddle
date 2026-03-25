'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ConsentToggleProps {
  /** Unique identifier for the consent item. */
  consentId: string;
  /** Human-readable label for the data-sharing consent. */
  label: string;
  /** Explanatory text shown below the label. */
  description: string;
  /** Initial consent state. */
  defaultGranted?: boolean;
  /** Called when the patient toggles consent on or off. */
  onToggle?: (consentId: string, granted: boolean) => void;
}

/**
 * A patient-facing toggle for granting or revoking data-sharing consent.
 * Uses clear, plain-language descriptions in line with the Endo Passport
 * philosophy of patient empowerment.
 */
export function ConsentToggle({
  consentId,
  label,
  description,
  defaultGranted = false,
  onToggle,
}: ConsentToggleProps) {
  const [granted, setGranted] = useState(defaultGranted);

  const handleToggle = () => {
    const next = !granted;
    setGranted(next);
    onToggle?.(consentId, next);
  };

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={granted}
        aria-label={`${granted ? 'Revoke' : 'Grant'} consent for ${label}`}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
          granted ? 'bg-teal-600' : 'bg-gray-200',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
            granted ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}
