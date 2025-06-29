// Main configuration panel for grid settings and styling options

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Plus } from 'lucide-react';
import { DimensionControls } from './DimensionControls';
import { StyleControls } from './StyleControls';
import { findNextAvailablePosition } from '@/lib/utils/gridUtils';

export function ConfigPanel() {
  const { 
    config, 
    updateConfig, 
    resetConfig,
    addBox
  } = useStore();

  const handleAddBox = () => {
    const position = findNextAvailablePosition(config, 1, 1);
    
    if (!position) {
      // Grid is full, could show a notification or expand grid
      console.warn('No available space for new box');
      return;
    }
    
    const newBox = {
      id: `box-${Date.now()}`,
      x: position.x,
      y: position.y,
      width: 1,
      height: 1,
      content: `Box ${config.boxes.length + 1}`
    };
    addBox(newBox);
  };

  return (
    <div className="space-y-6">
      {/* Grid Dimensions */}
      <DimensionControls />

      {/* Container Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="heading-5">Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="width" className="body-small font-medium">Width</Label>
            <Input
              id="width"
              value={config.containerWidth}
              onChange={(e) => updateConfig({ containerWidth: e.target.value })}
              placeholder="100%"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height" className="body-small font-medium">Height</Label>
            <Input
              id="height"
              value={config.containerHeight}
              onChange={(e) => updateConfig({ containerHeight: e.target.value })}
              placeholder="600px"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="radius" className="body-small font-medium">Border Radius: {config.borderRadius}px</Label>
            <Slider
              id="radius"
              min={0}
              max={50}
              step={1}
              value={[config.borderRadius]}
              onValueChange={([value]) => updateConfig({ borderRadius: value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Boxes */}
      <Card>
        <CardHeader>
          <CardTitle className="heading-5">Boxes ({config.boxes.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={handleAddBox} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Box (1×1)
          </Button>
          <p className="caption text-center">
            Select a box to change its size in the styling panel
          </p>
        </CardContent>
      </Card>

      {/* Style Controls */}
      <StyleControls />

      <Separator />

      {/* Actions */}
      <div className="space-y-2">
        <Button onClick={resetConfig} variant="outline" className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Configuration
        </Button>
      </div>
    </div>
  );
}