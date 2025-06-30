'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { GridEditor } from '@/features/grid-editor/components/GridEditor';
import { CodeTabs } from '@/features/code-generation/components/CodeTabs';
import { useStore } from '@/lib/store';

export default function Home() {
  const { viewMode } = useStore();

  return (
    <AppLayout>
      {viewMode === 'edit' ? (
        <GridEditor />
      ) : (
        <div className="p-6">
          <CodeTabs />
        </div>
      )}
    </AppLayout>
  );
}
