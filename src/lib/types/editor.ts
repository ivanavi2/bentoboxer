// Type definitions for editor state and UI interactions

import type { GridConfig } from './grid';

export interface EditorState {
  config: GridConfig;
  selectedBox: string | null;
  outputFormat: 'vanilla' | 'tailwind';
  theme: 'light' | 'dark';
}

export interface EditorActions {
  setSelectedBox: (boxId: string | null) => void;
  updateConfig: (config: Partial<GridConfig>) => void;
  setOutputFormat: (format: 'vanilla' | 'tailwind') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  resetConfig: () => void;
}

export interface DragState {
  isDragging: boolean;
  draggedBox: string | null;
  dragOffset: { x: number; y: number };
}

export interface SelectionState {
  selectedBoxes: string[];
  multiSelect: boolean;
}