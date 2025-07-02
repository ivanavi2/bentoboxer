// Main application header with navigation and branding

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ExportDialog } from '@/features/code-generation/components/ExportDialog';
import { Menu, Download, Eye, FileText, Edit3, Undo, Redo, MoreHorizontal } from 'lucide-react';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export function Header() {
  const { toggleSidebar, viewMode, setViewMode, outputFormat, setOutputFormat } = useStore();
  const { canUndo, canRedo, undo, redo } = useUndoRedo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-12 sm:h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
            data-sidebar-button
          >
            <Menu className="h-4 w-4" />
          </Button>
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
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant={viewMode === 'edit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('edit')}
          >
            <Edit3 className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('preview')}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button
            variant={viewMode === 'code' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('code')}
          >
            <FileText className="h-4 w-4 mr-1" />
            Code
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <Button
            variant={outputFormat === 'vanilla' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputFormat('vanilla')}
          >
            CSS
          </Button>
          <Button
            variant={outputFormat === 'tailwind' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputFormat('tailwind')}
          >
            Tailwind
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <ExportDialog>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </ExportDialog>
          
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-1">
          {/* Essential view mode buttons */}
          <Button
            variant={viewMode === 'edit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('edit')}
            className="px-2"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'preview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('preview')}
            className="px-2"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'code' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('code')}
            className="px-2"
          >
            <FileText className="h-4 w-4" />
          </Button>
          
          {/* Mobile menu dropdown */}
          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setOutputFormat('vanilla')}
                className={outputFormat === 'vanilla' ? 'bg-accent' : ''}
              >
                CSS Format
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOutputFormat('tailwind')}
                className={outputFormat === 'tailwind' ? 'bg-accent' : ''}
              >
                Tailwind Format
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={undo} disabled={!canUndo}>
                <Undo className="h-4 w-4 mr-2" />
                Undo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={redo} disabled={!canRedo}>
                <Redo className="h-4 w-4 mr-2" />
                Redo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ExportDialog>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
              </ExportDialog>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}