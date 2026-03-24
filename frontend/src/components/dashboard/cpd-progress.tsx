interface CpdProgressProps {
  earned: number;
  required: number;
}

export function CpdProgress({ earned, required }: CpdProgressProps) {
  const percentage = Math.round((earned / required) * 100);

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-4">CPD Progress</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{earned} hours earned</span>
          <span className="text-gray-500">{required} required</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-teal-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">{percentage}% complete this cycle</p>
      </div>
    </div>
  );
}
