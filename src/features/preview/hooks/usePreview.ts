// Custom hook for managing preview state

import { useState, useMemo, useCallback, useEffect, useDeferredValue } from 'react';
import { useStore } from '@/lib/store';
import { useCodeGeneration } from '@/features/code-generation/hooks/useCodeGeneration';

export interface PreviewState {
  zoom: number;
  isFullscreen: boolean;
}

export const ZOOM_LEVELS = [0.25, 0.5, 0.75, 1, 1.25, 1.5];

export function usePreview() {
  const { config, outputFormat } = useStore();
  const { generatedCode } = useCodeGeneration();
  
  // Preview state
  const [previewState, setPreviewState] = useState<PreviewState>({
    zoom: 1,
    isFullscreen: false
  });

  // Use React's deferred value for intelligent scheduling
  const deferredConfig = useDeferredValue(config);
  

  // Generate preview content based on current output format
  const previewContent = useMemo(() => {
    if (!deferredConfig.boxes.length) {
      return {
        html: '<div class="preview-empty">Add boxes to see preview</div>',
        css: '.preview-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #6b7280; font-family: system-ui; }',
        complete: ''
      };
    }

    return {
      html: generatedCode.previewHtml || generatedCode.html,
      css: generatedCode.css,
      complete: generatedCode.complete
    };
  }, [deferredConfig, generatedCode]);

  // Actions
  const setZoom = useCallback((zoom: number) => {
    const clampedZoom = Math.max(0.25, Math.min(2, zoom));
    setPreviewState(prev => ({ ...prev, zoom: clampedZoom }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    setPreviewState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  }, []);

  const zoomIn = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(previewState.zoom);
    const nextIndex = Math.min(ZOOM_LEVELS.length - 1, currentIndex + 1);
    setZoom(ZOOM_LEVELS[nextIndex]);
  }, [previewState.zoom, setZoom]);

  const zoomOut = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(previewState.zoom);
    const nextIndex = Math.max(0, currentIndex - 1);
    setZoom(ZOOM_LEVELS[nextIndex]);
  }, [previewState.zoom, setZoom]);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, [setZoom]);

  // Keyboard shortcuts for preview controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [zoomIn, zoomOut, resetZoom]);

  return {
    // State
    previewState,
    previewContent,
    outputFormat,
    
    // Actions
    setZoom,
    toggleFullscreen,
    zoomIn,
    zoomOut,
    resetZoom,
    
    // Utils
    availableZoomLevels: ZOOM_LEVELS
  };
}