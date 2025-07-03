// Main application layout wrapper combining header, sidebar and content

'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStore } from '@/lib/store';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { viewMode } = useStore();
  
  // Reduce padding in preview mode for better space utilization
  const contentPadding = viewMode === 'preview' ? 'p-2' : 'p-2 sm:p-4 md:p-6';

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300 min-w-0">
          <div className={contentPadding}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}