'use client';

import { ConsentToggle } from '@/components/patient/consent-toggle';

const consents = [
  {
    id: 'share_surgical_data',
    label: 'Share Surgical Case Data',
    description:
      'Allow your surgical records (including #Enzian scores and operative notes) to be shared with your care team for coordinated treatment planning.',
    defaultGranted: true,
  },
  {
    id: 'share_proms',
    label: 'Share Patient-Reported Outcome Measures',
    description:
      'Allow your PROMS responses to be included in anonymised quality benchmarking to help improve endometriosis care across the network.',
    defaultGranted: true,
  },
  {
    id: 'share_mdt',
    label: 'Include in MDT Discussions',
    description:
      'Permit your de-identified case data to be presented at multidisciplinary team meetings for expert clinical input.',
    defaultGranted: true,
  },
  {
    id: 'research_registry',
    label: 'Research Registry Participation',
    description:
      'Allow your anonymised data to be included in the ASPIRE research registry for studies aimed at improving endometriosis outcomes.',
    defaultGranted: false,
  },
  {
    id: 'share_gp',
    label: 'Share with General Practitioner',
    description:
      'Enable automatic sharing of visit summaries and care plans with your nominated GP to support continuity of care.',
    defaultGranted: false,
  },
];

export default function ConsentsPage() {
  const handleToggle = (consentId: string, granted: boolean) => {
    // TODO: Persist consent change via the API
    console.log(`Consent ${consentId}: ${granted ? 'granted' : 'revoked'}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Your Consents
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          You are in control of how your health data is used. Toggle each
          consent on or off at any time. Changes take effect immediately.
        </p>
      </div>

      <div className="space-y-3">
        {consents.map((c) => (
          <ConsentToggle
            key={c.id}
            consentId={c.id}
            label={c.label}
            description={c.description}
            defaultGranted={c.defaultGranted}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400">
        For more information about how your data is used, please refer to our{' '}
        <a href="#" className="underline hover:text-gray-600">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
