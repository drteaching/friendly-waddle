export function GentleNudges() {
  const nudges = [
    {
      featureId: 29,
      message: 'Your patients may benefit from access to a pelvic floor physiotherapist. Would you like to explore network partners?',
      actionType: 'partner_directory' as const,
    },
    {
      featureId: 8,
      message: 'Regular MDT meetings strengthen collaborative care. Consider scheduling your first case discussion.',
      actionType: 'resource_link' as const,
    },
  ];

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Suggestions for Growth</h3>
      <div className="space-y-3">
        {nudges.map((nudge) => (
          <div
            key={nudge.featureId}
            className="p-3 rounded-md bg-amber-50 border border-amber-200 text-sm text-amber-800"
          >
            <p>{nudge.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
