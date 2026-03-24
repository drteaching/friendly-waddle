import { JourneyCard } from '@/components/patient/journey-card';

/** Placeholder timeline data — will be fetched from the API. */
const mockTimeline = [
  {
    date: '2025-11-18',
    type: 'surgery' as const,
    title: 'Diagnostic laparoscopy with biopsy',
    description:
      'Laparoscopic assessment confirming Stage II endometriosis with peritoneal and ovarian involvement. Biopsies taken for histological confirmation.',
    provider: 'Dr A. Nguyen — Royal Women\'s Hospital',
    isCurrent: true,
  },
  {
    date: '2025-09-05',
    type: 'investigation' as const,
    title: 'MRI pelvis',
    description:
      'Pelvic MRI indicating possible deep infiltrating endometriosis involving the left uterosacral ligament.',
    provider: 'Imaging Central — Melbourne',
  },
  {
    date: '2025-07-22',
    type: 'consultation' as const,
    title: 'Pain management review',
    description:
      'Reviewed current analgesic regimen. Commenced trial of pelvic floor physiotherapy referral.',
    provider: 'Dr R. Patel — Endometriosis Care Clinic',
  },
  {
    date: '2025-05-10',
    type: 'medication' as const,
    title: 'Commenced hormonal therapy',
    description:
      'Started on dienogest 2mg daily for symptom management pending surgical planning.',
    provider: 'Dr A. Nguyen — Royal Women\'s Hospital',
  },
  {
    date: '2025-03-15',
    type: 'consultation' as const,
    title: 'Initial specialist consultation',
    description:
      'Referred by GP for investigation of chronic pelvic pain and suspected endometriosis. Detailed history taken and investigation plan formulated.',
    provider: 'Dr A. Nguyen — Royal Women\'s Hospital',
  },
  {
    date: '2019-08-03',
    type: 'milestone' as const,
    title: 'Endometriosis diagnosis confirmed',
    description:
      'Histological confirmation of endometriosis following initial laparoscopy.',
    provider: 'Previous Provider',
  },
];

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Journey Timeline</h1>
        <p className="mt-1 text-sm text-gray-500">
          A chronological view of your endometriosis care journey. This timeline
          is built from data shared by your care providers.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-4 pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200" />

        {mockTimeline.map((event, index) => (
          <div key={index} className="relative">
            {/* Dot on the timeline */}
            <div
              className={`absolute -left-6 top-5 h-3 w-3 rounded-full border-2 border-white ${
                event.isCurrent ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            />
            <JourneyCard {...event} />
          </div>
        ))}
      </div>
    </div>
  );
}
