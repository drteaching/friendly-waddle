import { AccreditationWizard } from '@/components/accreditation/accreditation-wizard';

export default function AccreditationApplyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Accreditation Application
      </h1>
      <AccreditationWizard />
    </div>
  );
}
