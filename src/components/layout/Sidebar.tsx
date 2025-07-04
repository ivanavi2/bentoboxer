// Sidebar component for configuration controls and navigation

'use client';

import { useStore } from '@/lib/store';
import { ConfigPanel } from '@/features/configuration/components/ConfigPanel';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { sidebarOpen, viewMode } = useStore();

  // Only show sidebar in editor mode
  if (viewMode !== 'editor') {
    return null;
  }

  return (
    <aside
      className={cn(
        "bg-muted/50 border-r transition-all duration-300 overflow-hidden",
        sidebarOpen ? "w-80" : "w-0"
      )}
    >
      <div className="p-4 w-80 overflow-y-auto h-full">
        <h2 className="text-lg font-semibold mb-4">Configuration</h2>
        <ConfigPanel />
      </div>
    </aside>
  );
}