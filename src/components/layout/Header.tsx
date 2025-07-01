// Main application header with navigation and branding

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ExportDialog } from '@/features/code-generation/components/ExportDialog';
import { Menu, Download, Eye, FileText, Edit3 } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const { toggleSidebar, viewMode, setViewMode, outputFormat, setOutputFormat } = useStore();

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="BentoBoxer Logo"
              width={24}
              height={24}
              className="rounded mt-1"
            />
            <h1 className="heading-3 tracking-tight">BentoBoxer</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
          
          <ExportDialog>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </ExportDialog>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}