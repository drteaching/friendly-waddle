'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Award,
  Stethoscope,
  Users,
  GraduationCap,
  Map,
  Menu,
  X,
  LogOut,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Accreditation', href: '/accreditation/apply', icon: Award },
  { name: 'Surgical Cases', href: '/surgical-cases', icon: Stethoscope },
  { name: 'Case Hub', href: '/case-hub', icon: Users },
  { name: 'CPD Tracker', href: '/cpd', icon: GraduationCap },
  { name: 'Network Map', href: '/network', icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* Branding */}
      <div className="flex items-center shrink-0 px-4 py-5">
        <span className="text-xl font-bold text-teal-700">ASPIRE</span>
        <span className="ml-1 text-sm text-gray-500">EndoExpertise</span>
      </div>

      {/* Navigation links */}
      <nav className="mt-2 flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500',
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer links */}
      <div className="border-t px-2 py-3 space-y-1">
        <Link
          href="/admin/reviews"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <Shield className="h-4 w-4" />
          Admin
        </Link>
        <a
          href="/api/auth/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-md md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-gray-600" />
        ) : (
          <Menu className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-white transition-transform duration-200 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:bg-white">
        {navContent}
      </aside>
    </>
  );
}
