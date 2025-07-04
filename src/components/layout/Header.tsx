// Main application header with simple navigation and branding

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Home, Edit3 } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const { viewMode, setViewMode } = useStore();

  return (
    <header className="h-12 sm:h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Image
            src="/logo.png"
            alt="BentoBoxer Logo"
            width={20}
            height={20}
            className="rounded mt-1 sm:w-6 sm:h-6"
          />
          <h1 className="hidden sm:block text-base font-semibold tracking-tight">BentoBoxer</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'home' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('home')}
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Button>
          <Button
            variant={viewMode === 'editor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('editor')}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Editor
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}