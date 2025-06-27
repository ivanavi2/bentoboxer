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

export function ConfigPanel() {
  const { 
    config, 
    updateConfig, 
    resetConfig,
    addBox
  } = useStore();

  const handleAddBox = () => {
    const newBox = {
      id: `box-${Date.now()}`,
      x: 0,
      y: 0,
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
          <CardTitle className="text-sm">Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              value={config.containerWidth}
              onChange={(e) => updateConfig({ containerWidth: e.target.value })}
              placeholder="100%"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              value={config.containerHeight}
              onChange={(e) => updateConfig({ containerHeight: e.target.value })}
              placeholder="600px"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="radius">Border Radius: {config.borderRadius}px</Label>
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
          <CardTitle className="text-sm">Boxes ({config.boxes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAddBox} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Box
          </Button>
        </CardContent>
      </Card>

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