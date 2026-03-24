'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ClipboardList, Users, Settings } from 'lucide-react';

const adminNav = [
  { name: 'Review Queue', href: '/admin/reviews', icon: ClipboardList },
  { name: 'Providers', href: '/admin/providers', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Admin sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col border-r bg-gray-900 text-white">
        <div className="flex items-centre gap-2 px-4 py-5">
          <Shield className="h-5 w-5 text-coral-400" />
          <span className="text-lg font-bold">ASPIRE Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {adminNav.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-centre gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colours ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-700 px-4 py-3">
          <Link
            href="/dashboard"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colours"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
    </div>
  );
}
