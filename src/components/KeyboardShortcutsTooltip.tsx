'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function KeyboardShortcutsTooltip() {
  const { shortcuts } = useKeyboardShortcuts();

  const formatKey = (key: string) => {
    return key.split('+').map((part, index, array) => (
      <React.Fragment key={part}>
        <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-muted border border-border rounded">
          {part}
        </kbd>
        {index < array.length - 1 && <span className="mx-1">+</span>}
      </React.Fragment>
    ));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-muted/50"
            aria-label="Show keyboard shortcuts"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-sm p-4" sideOffset={10} align='start'>
          <div className="space-y-4">
            <div className="heading-6 font-semibold">Keyboard Shortcuts</div>
            
            <div className="space-y-3">
              <div>
                <div className="body-small font-medium mb-2 text-muted-foreground">Navigation</div>
                <div className="space-y-1">
                  {Object.entries(shortcuts.navigation).map(([key, description]) => (
                    <div key={key} className="flex items-center justify-between gap-3">
                      <span className="caption text-foreground">{description}</span>
                      <div className="flex items-center">
                        {formatKey(key)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="body-small font-medium mb-2 text-muted-foreground">View Modes</div>
                <div className="space-y-1">
                  {Object.entries(shortcuts.views).map(([key, description]) => (
                    <div key={key} className="flex items-center justify-between gap-3">
                      <span className="caption text-foreground">{description}</span>
                      <div className="flex items-center">
                        {formatKey(key)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="body-small font-medium mb-2 text-muted-foreground">Actions</div>
                <div className="space-y-1">
                  {Object.entries(shortcuts.actions).map(([key, description]) => (
                    <div key={key} className="flex items-center justify-between gap-3">
                      <span className="caption text-foreground">{description}</span>
                      <div className="flex items-center">
                        {formatKey(key)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}