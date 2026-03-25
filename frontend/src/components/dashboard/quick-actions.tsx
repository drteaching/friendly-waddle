import Link from 'next/link';

const actions = [
  { label: 'Log Surgical Case', href: '/cases/new' },
  { label: 'Start AI Session', href: '/ai/new' },
  { label: 'View PROMS', href: '/cases?tab=proms' },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="block w-full text-left px-4 py-2 text-sm rounded-md border border-gray-200 hover:bg-teal-50 hover:border-teal-200 transition-colours"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
