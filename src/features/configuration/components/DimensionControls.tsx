// Controls for grid dimensions (columns, rows, gap, size)

'use client';

import { useStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DimensionControls() {
  const { config, updateConfig } = useStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Grid Dimensions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="columns">Columns: {config.columns}</Label>
          <Slider
            id="columns"
            min={1}
            max={12}
            step={1}
            value={[config.columns]}
            onValueChange={([value]) => updateConfig({ columns: value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rows">Rows: {config.rows}</Label>
          <Slider
            id="rows"
            min={1}
            max={12}
            step={1}
            value={[config.rows]}
            onValueChange={([value]) => updateConfig({ rows: value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gap">Gap: {config.gap}px</Label>
          <Slider
            id="gap"
            min={0}
            max={50}
            step={1}
            value={[config.gap]}
            onValueChange={([value]) => updateConfig({ gap: value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}