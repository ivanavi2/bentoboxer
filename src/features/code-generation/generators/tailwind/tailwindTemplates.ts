// Tailwind CSS template functions and utility class mapping for bento grid generation

import { GridConfig, GridBox } from '@/lib/types';

// Utility functions for converting values to Tailwind classes
export function getGridColsClass(columns: number): string {
  if (columns <= 12) return `grid-cols-${columns}`;
  return `grid-cols-[repeat(${columns},minmax(0,1fr))]`;
}

export function getGridRowsClass(rows: number): string {
  if (rows <= 6) return `grid-rows-${rows}`;
  return `grid-rows-[repeat(${rows},minmax(0,1fr))]`;
}

export function getGapClass(gap: number): string {
  const gapMap: { [key: number]: string } = {
    0: 'gap-0',
    1: 'gap-px',
    2: 'gap-0.5',
    4: 'gap-1',
    6: 'gap-1.5',
    8: 'gap-2',
    10: 'gap-2.5',
    12: 'gap-3',
    16: 'gap-4',
    20: 'gap-5',
    24: 'gap-6',
    32: 'gap-8',
    40: 'gap-10',
    48: 'gap-12',
    64: 'gap-16',
  };
  
  return gapMap[gap] || `gap-[${gap}px]`;
}

export function getWidthClass(width: string): string {
  if (width.endsWith('px')) {
    const pixels = parseInt(width.replace('px', ''));
    if (pixels <= 96) return `w-${pixels}`;
  }
  if (width.endsWith('%')) {
    const percent = parseInt(width.replace('%', ''));
    if (percent === 100) return 'w-full';
    if (percent === 50) return 'w-1/2';
    if (percent === 75) return 'w-3/4';
    if (percent === 25) return 'w-1/4';
  }
  return `w-[${width}]`;
}

export function getHeightClass(height: string): string {
  if (height.endsWith('px')) {
    const pixels = parseInt(height.replace('px', ''));
    if (pixels <= 96) return `h-${pixels}`;
  }
  if (height.endsWith('vh')) {
    const vh = parseInt(height.replace('vh', ''));
    if (vh === 100) return 'h-screen';
    if (vh === 50) return 'h-1/2';
  }
  return `h-[${height}]`;
}

export function getBorderRadiusClass(radius: number): string {
  const radiusMap: { [key: number]: string } = {
    0: 'rounded-none',
    2: 'rounded-sm',
    4: 'rounded',
    6: 'rounded-md',
    8: 'rounded-lg',
    12: 'rounded-xl',
    16: 'rounded-2xl',
    24: 'rounded-3xl',
  };
  
  return radiusMap[radius] || `rounded-[${radius}px]`;
}

export function getColSpanClass(width: number): string {
  if (width <= 12) return `col-span-${width}`;
  return `col-span-[${width}]`;
}

export function getRowSpanClass(height: number): string {
  if (height <= 6) return `row-span-${height}`;
  return `row-span-[${height}]`;
}

export function getColStartClass(x: number): string {
  const position = x + 1; // Convert 0-based to 1-based
  if (position <= 13) return `col-start-${position}`;
  return `col-start-[${position}]`;
}

export function getRowStartClass(y: number): string {
  const position = y + 1; // Convert 0-based to 1-based
  if (position <= 7) return `row-start-${position}`;
  return `row-start-[${position}]`;
}

export function getBackgroundColorClass(color: string): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const commonColors: { [key: string]: string } = {
      '#000000': 'bg-black',
      '#ffffff': 'bg-white',
      '#f3f4f6': 'bg-gray-100',
      '#e5e7eb': 'bg-gray-200',
      '#d1d5db': 'bg-gray-300',
      '#9ca3af': 'bg-gray-400',
      '#6b7280': 'bg-gray-500',
      '#374151': 'bg-gray-700',
      '#1f2937': 'bg-gray-800',
      '#111827': 'bg-gray-900',
      '#3b82f6': 'bg-blue-500',
      '#1d4ed8': 'bg-blue-700',
      '#1e40af': 'bg-blue-800',
      '#ef4444': 'bg-red-500',
      '#10b981': 'bg-emerald-500',
      '#f59e0b': 'bg-amber-500',
      '#8b5cf6': 'bg-violet-500',
      '#ec4899': 'bg-pink-500',
    };
    
    return commonColors[color.toLowerCase()] || `bg-[${color}]`;
  }
  
  return `bg-[${color}]`;
}

export function getTextColorClass(color: string): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const commonColors: { [key: string]: string } = {
      '#000000': 'text-black',
      '#ffffff': 'text-white',
      '#374151': 'text-gray-700',
      '#1f2937': 'text-gray-800',
      '#111827': 'text-gray-900',
      '#3b82f6': 'text-blue-500',
      '#ef4444': 'text-red-500',
      '#10b981': 'text-emerald-500',
    };
    
    return commonColors[color.toLowerCase()] || `text-[${color}]`;
  }
  
  return `text-[${color}]`;
}

export function getBorderClass(width: number, style: string, color: string): string {
  const borderWidthMap: { [key: number]: string } = {
    0: 'border-0',
    1: 'border',
    2: 'border-2',
    4: 'border-4',
    8: 'border-8',
  };
  
  const widthClass = borderWidthMap[width] || `border-[${width}px]`;
  const styleClass = style === 'dashed' ? 'border-dashed' : style === 'dotted' ? 'border-dotted' : '';
  const colorClass = getTextColorClass(color).replace('text-', 'border-');
  
  return [widthClass, styleClass, colorClass].filter(Boolean).join(' ');
}

export function getFontFamilyClass(fontFamily: string): string {
  const fontMap: { [key: string]: string } = {
    'Inter': 'font-inter',
    'Roboto': 'font-roboto',
    'system-ui': 'font-sans',
    'Georgia': 'font-serif',
    'ui-monospace': 'font-mono',
  };
  
  return fontMap[fontFamily] || `font-[${fontFamily}]`;
}

export function getFontSizeClass(size: number): string {
  const sizeMap: { [key: number]: string } = {
    12: 'text-xs',
    14: 'text-sm',
    16: 'text-base',
    18: 'text-lg',
    20: 'text-xl',
    24: 'text-2xl',
    30: 'text-3xl',
    36: 'text-4xl',
    48: 'text-5xl',
  };
  
  return sizeMap[size] || `text-[${size}px]`;
}

export function getFontWeightClass(weight: number): string {
  const weightMap: { [key: number]: string } = {
    100: 'font-thin',
    200: 'font-extralight',
    300: 'font-light',
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
    900: 'font-black',
  };
  
  return weightMap[weight] || `font-[${weight}]`;
}

export function getPaddingClass(padding: number): string {
  const paddingMap: { [key: number]: string } = {
    0: 'p-0',
    1: 'p-px',
    2: 'p-0.5',
    4: 'p-1',
    6: 'p-1.5',
    8: 'p-2',
    12: 'p-3',
    16: 'p-4',
    20: 'p-5',
    24: 'p-6',
    32: 'p-8',
    40: 'p-10',
    48: 'p-12',
  };
  
  return paddingMap[padding] || `p-[${padding}px]`;
}

export function getBoxShadowClass(shadow: string): string {
  const shadowMap: { [key: string]: string } = {
    'none': 'shadow-none',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)': 'shadow',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)': 'shadow-md',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)': 'shadow-lg',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)': 'shadow-xl',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)': 'shadow-2xl',
  };
  
  return shadowMap[shadow] || `shadow-[${shadow}]`;
}

// Template generation functions
export function generateContainerClasses(config: GridConfig): string {
  const classes = [
    'grid',
    getGridColsClass(config.columns),
    getGridRowsClass(config.rows),
    getGapClass(config.gap),
    getWidthClass(config.containerWidth),
    getHeightClass(config.containerHeight),
    getBorderRadiusClass(config.borderRadius),
  ];
  
  return classes.join(' ');
}

export function generateBoxClasses(box: GridBox): string {
  const styling = box.styling || {};
  const classes = [
    getColSpanClass(box.width),
    getRowSpanClass(box.height),
    getColStartClass(box.x),
    getRowStartClass(box.y),
    'flex',
    'items-center',
    'justify-center',
  ];
  
  // Add styling classes
  if (styling.backgroundColor) {
    classes.push(getBackgroundColorClass(styling.backgroundColor));
  }
  
  if (styling.textColor) {
    classes.push(getTextColorClass(styling.textColor));
  }
  
  if (styling.borderWidth && styling.borderWidth > 0) {
    classes.push(getBorderClass(styling.borderWidth, styling.borderStyle || 'solid', styling.borderColor || '#000'));
  }
  
  if (styling.borderRadius) {
    classes.push(getBorderRadiusClass(styling.borderRadius));
  }
  
  if (styling.boxShadow && styling.boxShadow !== 'none') {
    classes.push(getBoxShadowClass(styling.boxShadow));
  }
  
  if (styling.fontFamily) {
    classes.push(getFontFamilyClass(styling.fontFamily));
  }
  
  if (styling.fontSize) {
    classes.push(getFontSizeClass(styling.fontSize));
  }
  
  if (styling.fontWeight) {
    classes.push(getFontWeightClass(styling.fontWeight));
  }
  
  if (styling.padding) {
    classes.push(getPaddingClass(styling.padding));
  }
  
  return classes.join(' ');
}