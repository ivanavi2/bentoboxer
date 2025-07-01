// Live preview component showing the rendered bento grid layout

'use client';

import React, { useMemo, useState } from 'react';
import { usePreview } from '../hooks/usePreview';
import { ZoomControls } from './ZoomControls';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PreviewPaneProps {
  className?: string;
}

export function PreviewPane({ className }: PreviewPaneProps) {
  const {
    previewContent,
    previewState,
    outputFormat,
    zoomIn,
    zoomOut,
    resetZoom,
    availableZoomLevels
  } = usePreview();

  const [previewError, setPreviewError] = useState<string | null>(null);

  // Generate the complete HTML document for srcdoc
  const previewDocument = useMemo(() => {
    const { html, css } = previewContent;
    
    if (outputFormat === 'tailwind') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { 
      margin: 0; 
      padding: 20px; 
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
    }
    .preview-container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ${css.includes('.preview-empty') ? css : ''}
  </style>
</head>
<body>
  <div class="preview-container">
    ${html}
  </div>
</body>
</html>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    body { 
      margin: 0; 
      padding: 20px; 
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
    }
    .preview-container {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ${css}
  </style>
</head>
<body>
  <div class="preview-container">
    ${html}
  </div>
</body>
</html>`;
    }
  }, [previewContent, outputFormat]);

  // Handle iframe events
  const handleIframeLoad = () => {
    setPreviewError(null);
  };

  const handleIframeError = () => {
    setPreviewError('Preview failed to load. Please refresh the page.');
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Preview Header with Zoom Controls */}
      <div className="flex-shrink-0 p-4 border-b bg-background flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Live Preview
        </div>
        <ZoomControls 
          zoom={previewState.zoom}
          availableZoomLevels={availableZoomLevels}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
        />
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex flex-col p-4 bg-muted/30 min-h-0">
        <div className="flex-1 flex items-center justify-center">
          {previewError ? (
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{previewError}</AlertDescription>
            </Alert>
          ) : (
            <Card className="preview-frame overflow-hidden shadow-lg w-full h-full p-0">
              <div 
                className="relative bg-white overflow-auto"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              >

                {/* Preview Iframe */}
                <iframe
                  srcDoc={previewDocument}
                  className="border-0 origin-top-left"
                  sandbox="allow-scripts"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title="Grid Preview"
                  style={{
                    transform: `scale(${previewState.zoom})`,
                    width: previewState.zoom !== 1 ? `${100 / previewState.zoom}%` : '100%',
                    height: previewState.zoom !== 1 ? `${100 / previewState.zoom}%` : '100%',
                    minWidth: previewState.zoom < 1 ? `${100 / previewState.zoom}%` : '100%',
                    minHeight: previewState.zoom < 1 ? `${100 / previewState.zoom}%` : '100%'
                  }}
                />

                {/* Loading Overlay */}
                {!previewContent.html && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="text-sm text-muted-foreground">
                      Loading preview...
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Preview Info */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Live preview • Updates automatically
          </p>
          <p className="text-xs text-muted-foreground">
            Format: {outputFormat === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}
          </p>
        </div>
      </div>
    </div>
  );
}