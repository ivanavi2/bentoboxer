'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { GridEditor } from '@/features/grid-editor/components/GridEditor';
import { CodeTabs } from '@/features/code-generation/components/CodeTabs';
import { PreviewPane } from '@/features/preview/components/PreviewPane';
import { useStore } from '@/lib/store';

export default function Home() {
  const { viewMode } = useStore();

  const renderMainContent = () => {
    switch (viewMode) {
      case 'edit':
        return <GridEditor />;
      case 'preview':
        return <PreviewPane />;
      case 'code':
        return (
          <div className="p-6">
            <CodeTabs />
          </div>
        );
      default:
        // Fallback to edit mode for any unknown view mode
        return <GridEditor />;
    }
  };

  return (
    <AppLayout>
      {renderMainContent()}
    </AppLayout>
  );
}
