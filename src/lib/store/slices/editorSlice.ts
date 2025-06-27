// Zustand slice for grid editor state and actions

import { StateCreator } from 'zustand';
import { GridConfig, GridBox } from '../../types';

export interface EditorSlice {
  config: GridConfig;
  selectedBox: string | null;
  
  // Actions
  setSelectedBox: (boxId: string | null) => void;
  updateConfig: (config: Partial<GridConfig>) => void;
  addBox: (box: GridBox) => void;
  removeBox: (boxId: string) => void;
  updateBox: (boxId: string, updates: Partial<GridBox>) => void;
  resetConfig: () => void;
}

const defaultConfig: GridConfig = {
  columns: 4,
  rows: 4,
  gap: 8,
  boxes: [],
  containerWidth: '100%',
  containerHeight: '600px',
  borderRadius: 8,
};

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  config: defaultConfig,
  selectedBox: null,
  
  setSelectedBox: (boxId) => set({ selectedBox: boxId }),
  
  updateConfig: (updates) => set((state) => ({
    config: { ...state.config, ...updates }
  })),
  
  addBox: (box) => set((state) => ({
    config: {
      ...state.config,
      boxes: [...state.config.boxes, box]
    }
  })),
  
  removeBox: (boxId) => set((state) => ({
    config: {
      ...state.config,
      boxes: state.config.boxes.filter(box => box.id !== boxId)
    },
    selectedBox: state.selectedBox === boxId ? null : state.selectedBox
  })),
  
  updateBox: (boxId, updates) => set((state) => ({
    config: {
      ...state.config,
      boxes: state.config.boxes.map(box =>
        box.id === boxId ? { ...box, ...updates } : box
      )
    }
  })),
  
  resetConfig: () => set({
    config: defaultConfig,
    selectedBox: null
  }),
});