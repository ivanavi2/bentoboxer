import { StateCreator } from 'zustand';
import { GridConfig } from '../../types';

export interface HistoryState {
  past: GridConfig[];
  present: GridConfig;
  future: GridConfig[];
}

export interface HistorySlice {
  history: HistoryState;
  canUndo: boolean;
  canRedo: boolean;
  
  // Actions
  pushHistory: (config: GridConfig) => void;
  undo: () => void;
  redo: () => void;
  clearHistory: (config?: GridConfig) => void;
}

const MAX_HISTORY_SIZE = 50;

const createInitialHistory = (initialConfig: GridConfig): HistoryState => ({
  past: [],
  present: initialConfig,
  future: []
});

const defaultConfig: GridConfig = {
  columns: 4,
  rows: 4,
  gap: 8,
  boxes: [],
  containerWidth: '100%',
  containerHeight: '600px',
  borderRadius: 8,
};

export const createHistorySlice: StateCreator<HistorySlice, [], [], HistorySlice> = (set) => {
  const initialHistory = createInitialHistory(defaultConfig);

  return {
    history: initialHistory,
    canUndo: initialHistory.past.length > 0,
    canRedo: initialHistory.future.length > 0,
  
    pushHistory: (config: GridConfig) => set((state) => {
      const { past, present } = state.history;
      
      // Don't add if config is the same as current
      if (JSON.stringify(present) === JSON.stringify(config)) {
        return state;
      }
      
      const newPast = [...past, present];
      
      // Limit history size
      if (newPast.length > MAX_HISTORY_SIZE) {
        newPast.shift(); // Remove oldest entry
      }
      
      const newHistory = {
        past: newPast,
        present: config,
        future: [] // Clear future when new action is performed
      };
      
      return {
        ...state,
        history: newHistory,
        canUndo: newHistory.past.length > 0,
        canRedo: newHistory.future.length > 0
      };
    }),
  
    undo: () => set((state) => {
      const { past, present, future } = state.history;
      
      if (past.length === 0) {
        return state; // Nothing to undo
      }
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      const newHistory = {
        past: newPast,
        present: previous,
        future: [present, ...future]
      };
      
      return {
        ...state,
        history: newHistory,
        canUndo: newHistory.past.length > 0,
        canRedo: newHistory.future.length > 0
      };
    }),
  
    redo: () => set((state) => {
      const { past, present, future } = state.history;
      
      if (future.length === 0) {
        return state; // Nothing to redo
      }
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      const newHistory = {
        past: [...past, present],
        present: next,
        future: newFuture
      };
      
      return {
        ...state,
        history: newHistory,
        canUndo: newHistory.past.length > 0,
        canRedo: newHistory.future.length > 0
      };
    }),
  
    clearHistory: (config?: GridConfig) => set((state) => {
      const configToUse = config || state.history.present;
      const newHistory = createInitialHistory(configToUse);
      return {
        ...state,
        history: newHistory,
        canUndo: newHistory.past.length > 0,
        canRedo: newHistory.future.length > 0
      };
    })
  };
};