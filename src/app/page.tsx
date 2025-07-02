'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { GridEditor } from '@/features/grid-editor/components/GridEditor';
import { CodeTabs } from '@/features/code-generation/components/CodeTabs';
import { PreviewPane } from '@/features/preview/components/PreviewPane';
import { useStore } from '@/lib/store';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Script from 'next/script';

export default function Home() {
  const { viewMode } = useStore();
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BentoBoxer",
    "alternateName": "Bento Grid Editor",
    "description": "Create stunning bento box layouts with our intuitive drag-and-drop editor. Generate responsive CSS/HTML code for dashboard designs, portfolios, and modern web interfaces.",
    "url": "https://bentoboxer.com",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Drag and drop grid editor",
      "Live preview with zoom controls",
      "CSS and HTML code generation",
      "Responsive grid layouts",
      "Keyboard shortcuts",
      "Undo/redo functionality",
      "Export to multiple formats"
    ],
    "screenshot": "https://bentoboxer.com/logo.png",
    "author": {
      "@type": "Organization",
      "name": "BentoBoxer Team"
    }
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AppLayout>
        {renderMainContent()}
      </AppLayout>
    </>
  );
}
