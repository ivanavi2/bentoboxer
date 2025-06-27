// Type definitions for grid configuration and box properties

export interface BoxStyling {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: number;
  boxShadow?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  padding?: number;
}

export interface GridBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  styling?: BoxStyling;
}

export interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
  boxes: GridBox[];
  containerWidth: string;
  containerHeight: string;
  borderRadius: number;
}

export interface GridDimensions {
  width: number;
  height: number;
}

export interface GridPosition {
  x: number;
  y: number;
}

export interface GridBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}