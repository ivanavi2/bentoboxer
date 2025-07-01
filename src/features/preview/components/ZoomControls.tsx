// Zoom controls component for preview pane

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  className?: string;
  zoom: number;
  availableZoomLevels: number[];
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function ZoomControls({ 
  className, 
  zoom, 
  availableZoomLevels, 
  onZoomIn, 
  onZoomOut, 
  onResetZoom 
}: ZoomControlsProps) {
  const currentZoomIndex = availableZoomLevels.indexOf(zoom);
  const canZoomIn = currentZoomIndex < availableZoomLevels.length - 1;
  const canZoomOut = currentZoomIndex > 0;
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Zoom Out */}
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom Out (Ctrl+-)"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      {/* Zoom Level Display */}
      <div className="text-sm font-medium text-muted-foreground min-w-[3rem] text-center">
        {zoomPercentage}%
      </div>

      {/* Zoom In */}
      <Button
        variant="outline"
        size="sm"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        title="Zoom In (Ctrl++)"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      {/* Reset Zoom */}
      <Button
        variant="outline"
        size="sm"
        onClick={onResetZoom}
        disabled={zoom === 1}
        title="Reset Zoom (Ctrl+0)"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}