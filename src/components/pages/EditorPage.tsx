// Editor page component that combines controls and main editor content

'use client';

import { useStore } from '@/lib/store';
import { EditorControls } from '@/components/editor/EditorControls';
import { GridEditor } from '@/features/grid-editor/components/GridEditor';
import { CodeTabs } from '@/features/code-generation/components/CodeTabs';
import { PreviewPane } from '@/features/preview/components/PreviewPane';

export function EditorPage() {
  const { editorViewMode } = useStore();

  const renderEditorContent = () => {
    switch (editorViewMode) {
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
        // Fallback to edit mode for any unknown editor view mode
        return <GridEditor />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <EditorControls />
      <div className="flex-1 overflow-auto">
        {renderEditorContent()}
      </div>
    </div>
  );
}