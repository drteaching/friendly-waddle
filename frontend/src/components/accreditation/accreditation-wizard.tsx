'use client';

import { useState } from 'react';

const domains = [
  { key: 'network_importance', label: 'Networks of Expertise', features: [1, 2, 3] },
  { key: 'org_customer_service', label: 'Customer Service', features: [4, 5, 6, 7, 8, 9, 10] },
  { key: 'org_care', label: 'Organisation of Care', features: [11, 12, 13, 14, 15, 16, 17, 18, 19] },
  { key: 'clinical_surgery', label: 'Gynaecological Surgery', features: [20, 21, 22, 23, 24, 25, 26] },
  { key: 'clinical_pain', label: 'Pain Management', features: [27, 28, 29, 30, 31, 32, 33] },
  { key: 'clinical_fertility', label: 'Fertility Treatment', features: [34, 35] },
  { key: 'training', label: 'Training', features: [36] },
  { key: 'research', label: 'Research', features: [37, 38] },
];

export function AccreditationWizard() {
  const [currentDomain, setCurrentDomain] = useState(0);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex space-x-1">
        {domains.map((domain, index) => (
          <button
            key={domain.key}
            onClick={() => setCurrentDomain(index)}
            className={`flex-1 h-2 rounded-full transition-colours ${
              index <= currentDomain ? 'bg-teal-600' : 'bg-gray-200'
            }`}
            aria-label={domain.label}
          />
        ))}
      </div>

      {/* Current domain */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          {domains[currentDomain].label}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Assess your compliance with features {domains[currentDomain].features[0]}–
          {domains[currentDomain].features[domains[currentDomain].features.length - 1]}
        </p>

        <div className="space-y-4">
          {domains[currentDomain].features.map((featureId) => (
            <div key={featureId} className="border rounded-md p-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    Feature {featureId}
                  </span>
                </div>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option value="">Select...</option>
                  <option value="fully_met">Fully Met</option>
                  <option value="partially_met">Partially Met</option>
                  <option value="not_met">Not Met</option>
                  <option value="not_applicable">Not Applicable</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentDomain(Math.max(0, currentDomain - 1))}
          disabled={currentDomain === 0}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentDomain(Math.min(domains.length - 1, currentDomain + 1))}
          className="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          {currentDomain === domains.length - 1 ? 'Review & Submit' : 'Next Domain'}
        </button>
      </div>
    </div>
  );
}
