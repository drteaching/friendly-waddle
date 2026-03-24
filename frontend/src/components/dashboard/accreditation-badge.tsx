interface AccreditationBadgeProps {
  tier: string;
  expiresAt: string;
}

export function AccreditationBadge({ tier, expiresAt }: AccreditationBadgeProps) {
  const tierColours: Record<string, string> = {
    EndoAware: 'bg-blue-100 text-blue-800',
    EndoAdvanced: 'bg-teal-100 text-teal-800',
    EndoNetwork: 'bg-purple-100 text-purple-800',
    EndoCentre: 'bg-coral-100 text-coral-800',
  };

  return (
    <div className={`inline-flex items-centre px-3 py-1 rounded-full text-sm font-medium ${tierColours[tier] || 'bg-gray-100 text-gray-800'}`}>
      <span>{tier}</span>
      <span className="ml-2 text-xs opacity-75">Expires {expiresAt}</span>
    </div>
  );
}
