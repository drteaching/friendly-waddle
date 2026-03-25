interface ComplianceChartProps {
  percentage: number;
}

export function ComplianceChart({ percentage }: ComplianceChartProps) {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Feature Compliance</h3>
      <div className="flex items-centre justify-centre">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0d9488"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
            />
            <text x="18" y="20.35" className="fill-gray-900 text-[0.5em] font-bold" textAnchor="middle">
              {percentage}%
            </text>
          </svg>
        </div>
      </div>
      <p className="text-centre text-sm text-gray-500 mt-2">
        of applicable features met
      </p>
    </div>
  );
}
