// Main application layout wrapper combining header, sidebar and content

'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStore } from '@/lib/store';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { viewMode, editorViewMode } = useStore();
  
  // Reduce padding in preview mode for better space utilization
  // Also reduce padding for home page and editor views that don't need it
  const contentPadding = 
    viewMode === 'home' ? 'p-0' : 
    (viewMode === 'editor' && editorViewMode === 'preview') ? 'p-0' : 
    'p-0';

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300 min-w-0">
          <div className={`${contentPadding} h-full`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}