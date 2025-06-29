'use client';

import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Palette, Square, Frame, Type, Expand } from 'lucide-react';
import { BoxStyling } from '@/lib/types';
import { canPlaceBoxAt } from '@/lib/utils/gridUtils';

const COLOR_PRESETS = [
  '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151', '#111827',
  '#fef2f2', '#fee2e2', '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
  '#fefce8', '#fef3c7', '#fde68a', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e',
  '#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d',
  '#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
  '#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9',
];

const FONT_FAMILIES = [
  'Inter, sans-serif',
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'system-ui, sans-serif',
];

const SHADOW_PRESETS = [
  'none',
  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
];

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label: string;
}

function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="body-small font-medium">{label}</Label>
      <div className="space-y-2">
        {/* Current color and custom input */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer"
            style={{ backgroundColor: value || '#ffffff' }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'color';
              input.value = value || '#ffffff';
              input.addEventListener('change', (e) => {
                onChange((e.target as HTMLInputElement).value);
              });
              input.click();
            }}
          />
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
        
        {/* Color presets */}
        <div className="grid grid-cols-8 gap-1">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StyleControls() {
  const { selectedBox, config, updateBoxStyling, updateBox } = useStore();
  
  const selectedBoxData = selectedBox 
    ? config.boxes.find(box => box.id === selectedBox)
    : null;

  if (!selectedBox || !selectedBoxData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="body-small text-muted-foreground text-center">
            Select a box to customize its styling
          </p>
        </CardContent>
      </Card>
    );
  }

  const styling = selectedBoxData.styling || {};

  const updateStyling = (updates: Partial<BoxStyling>) => {
    updateBoxStyling(selectedBox, updates);
  };

  const updateDimensions = (width: number, height: number) => {
    // Check if the new dimensions would cause overlap
    if (canPlaceBoxAt(selectedBoxData.x, selectedBoxData.y, width, height, config, selectedBox)) {
      updateBox(selectedBox, { width, height });
    } else {
      // Could add toast notification here for invalid resize
      console.warn(`Cannot resize box to ${width}x${height} - would overlap with existing boxes`);
    }
  };

  const canResizeToWidth = (width: number) => {
    return canPlaceBoxAt(selectedBoxData.x, selectedBoxData.y, width, selectedBoxData.height, config, selectedBox);
  };

  const canResizeToHeight = (height: number) => {
    return canPlaceBoxAt(selectedBoxData.x, selectedBoxData.y, selectedBoxData.width, height, config, selectedBox);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="heading-5 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Box Styling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dimensions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dimensions" className="caption min-w-0 flex items-center justify-center border-secondary cursor-pointer hover:border-secondary/80" title="Size">
              <Expand className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="colors" className="caption min-w-0 flex items-center justify-center border-secondary cursor-pointer hover:border-secondary/80" title="Colors">
              <Square className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="borders" className="caption min-w-0 flex items-center justify-center border-secondary cursor-pointer hover:border-secondary/80" title="Borders">
              <Frame className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="shadows" className="caption min-w-0 flex items-center justify-center border-secondary cursor-pointer hover:border-secondary/80" title="Shadows">
              <div className="h-3 w-3 bg-current rounded opacity-50" />
            </TabsTrigger>
            <TabsTrigger value="typography" className="caption min-w-0 flex items-center justify-center border-secondary cursor-pointer hover:border-secondary/80" title="Text">
              <Type className="h-3 w-3" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4 mt-4">
            <ColorPicker
              value={styling.backgroundColor}
              onChange={(color) => updateStyling({ backgroundColor: color })}
              label="Background Color"
            />
            
            <ColorPicker
              value={styling.textColor}
              onChange={(color) => updateStyling({ textColor: color })}
              label="Text Color"
            />
          </TabsContent>
          
          <TabsContent value="borders" className="space-y-4 mt-4">
            <ColorPicker
              value={styling.borderColor}
              onChange={(color) => updateStyling({ borderColor: color })}
              label="Border Color"
            />
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Border Width: {styling.borderWidth || 0}px</Label>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[styling.borderWidth || 0]}
                onValueChange={([value]) => updateStyling({ borderWidth: value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Border Style</Label>
              <Select
                value={styling.borderStyle || 'solid'}
                onValueChange={(value: 'solid' | 'dashed' | 'dotted' | 'none') => 
                  updateStyling({ borderStyle: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Border Radius: {styling.borderRadius || 0}px</Label>
              <Slider
                min={0}
                max={50}
                step={1}
                value={[styling.borderRadius || 0]}
                onValueChange={([value]) => updateStyling({ borderRadius: value })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="shadows" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="body-small font-medium">Shadow Presets</Label>
              <div className="space-y-2">
                {SHADOW_PRESETS.map((shadow, index) => (
                  <Button
                    key={index}
                    variant={styling.boxShadow === shadow ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => updateStyling({ boxShadow: shadow })}
                  >
                    <div
                      className="w-6 h-6 bg-gray-200 rounded mr-3 shrink-0"
                      style={{ boxShadow: shadow === 'none' ? 'none' : shadow }}
                    />
                    <span className="caption font-mono truncate">
                      {shadow === 'none' ? 'No shadow' : `Shadow ${index}`}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Custom Shadow</Label>
              <Input
                value={styling.boxShadow || ''}
                onChange={(e) => updateStyling({ boxShadow: e.target.value })}
                placeholder="0 4px 6px -1px rgb(0 0 0 / 0.1)"
                className="caption font-mono"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="body-small font-medium">Font Family</Label>
              <Select
                value={styling.fontFamily || 'Inter, sans-serif'}
                onValueChange={(value) => updateStyling({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILIES.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font.split(',')[0]}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Font Size: {styling.fontSize || 16}px</Label>
              <Slider
                min={8}
                max={48}
                step={1}
                value={[styling.fontSize || 16]}
                onValueChange={([value]) => updateStyling({ fontSize: value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Font Weight: {styling.fontWeight || 400}</Label>
              <Slider
                min={100}
                max={900}
                step={100}
                value={[styling.fontWeight || 400]}
                onValueChange={([value]) => updateStyling({ fontWeight: value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Padding: {styling.padding || 0}px</Label>
              <Slider
                min={0}
                max={50}
                step={1}
                value={[styling.padding || 0]}
                onValueChange={([value]) => updateStyling({ padding: value })}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="dimensions" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="body-small font-medium">Width (Columns): {selectedBoxData.width}</Label>
              <Slider
                min={1}
                max={Math.min(config.columns, selectedBoxData.x + config.columns)}
                step={1}
                value={[selectedBoxData.width]}
                onValueChange={([value]) => updateDimensions(value, selectedBoxData.height)}
                className={!canResizeToWidth(selectedBoxData.width) ? 'opacity-50' : ''}
              />
              <p className="caption">
                Box will span {selectedBoxData.width} column{selectedBoxData.width > 1 ? 's' : ''}
                {!canResizeToWidth(selectedBoxData.width + 1) && selectedBoxData.width < config.columns && (
                  <span className="text-orange-600 ml-2">• Cannot expand further (would overlap)</span>
                )}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="body-small font-medium">Height (Rows): {selectedBoxData.height}</Label>
              <Slider
                min={1}
                max={Math.min(config.rows, selectedBoxData.y + config.rows)}
                step={1}
                value={[selectedBoxData.height]}
                onValueChange={([value]) => updateDimensions(selectedBoxData.width, value)}
                className={!canResizeToHeight(selectedBoxData.height) ? 'opacity-50' : ''}
              />
              <p className="caption">
                Box will span {selectedBoxData.height} row{selectedBoxData.height > 1 ? 's' : ''}
                {!canResizeToHeight(selectedBoxData.height + 1) && selectedBoxData.height < config.rows && (
                  <span className="text-orange-600 ml-2">• Cannot expand further (would overlap)</span>
                )}
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="body-small font-medium">Current Size:</span>
                <span className="body-small">{selectedBoxData.width}×{selectedBoxData.height} cells</span>
              </div>
              <p className="caption">
                Position: Column {selectedBoxData.x + 1}, Row {selectedBoxData.y + 1}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}