'use client';

import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-centre border-b bg-white px-4 shadow-sm md:px-6">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuToggle}
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search */}
      <div className="ml-4 flex flex-1 items-centre">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search cases, providers, features..."
            className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-300"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-centre gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="User profile"
        >
          <User className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </header>
  );
}
