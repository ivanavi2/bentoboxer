// Editor controls component with all editing functionality moved from header

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ExportDialog } from '@/features/code-generation/components/ExportDialog';
import { Menu, Download, Eye, FileText, Edit3, Undo, Redo, MoreHorizontal } from 'lucide-react';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export function EditorControls() {
  const { toggleSidebar, editorViewMode, setEditorViewMode, outputFormat, setOutputFormat } = useStore();
  const { canUndo, canRedo, undo, redo } = useUndoRedo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <h2 className="heading-5">Editor</h2>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant={editorViewMode === 'edit' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('edit')}
          title="Edit Mode"
        >
          <Edit3 className="h-4 w-4 lg:mr-1" />
          <span className="hidden lg:inline">Edit</span>
        </Button>
        <Button
          variant={editorViewMode === 'preview' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('preview')}
          title="Preview Mode"
        >
          <Eye className="h-4 w-4 lg:mr-1" />
          <span className="hidden lg:inline">Preview</span>
        </Button>
        <Button
          variant={editorViewMode === 'code' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('code')}
          title="Code Mode"
        >
          <FileText className="h-4 w-4 lg:mr-1" />
          <span className="hidden lg:inline">Code</span>
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
          <Button variant="outline" size="sm" title="Export">
            <Download className="h-4 w-4 lg:mr-1" />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </ExportDialog>
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden items-center gap-1">
        {/* Essential view mode buttons */}
        <Button
          variant={editorViewMode === 'edit' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('edit')}
          className="px-2"
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          variant={editorViewMode === 'preview' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('preview')}
          className="px-2"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant={editorViewMode === 'code' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setEditorViewMode('code')}
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
            <DropdownMenuItem onClick={toggleSidebar}>
              <Menu className="h-4 w-4 mr-2" />
              Toggle Configuration
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
      </div>
    </div>
  );
}