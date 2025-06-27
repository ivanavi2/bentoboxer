// Sidebar component for configuration controls and navigation

'use client';

import { useStore } from '@/lib/store';
import { ConfigPanel } from '@/features/configuration/components/ConfigPanel';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { sidebarOpen } = useStore();

  return (
    <aside
      className={cn(
        "w-80 bg-muted/50 border-r transition-all duration-300 overflow-y-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Configuration</h2>
        <ConfigPanel />
      </div>
    </aside>
  );
}