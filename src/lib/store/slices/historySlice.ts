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
  clearHistory: () => void;
}

const MAX_HISTORY_SIZE = 50;

const createInitialHistory = (initialConfig: GridConfig): HistoryState => ({
  past: [],
  present: initialConfig,
  future: []
});

export const createHistorySlice: StateCreator<HistorySlice, [], [], HistorySlice> = (set, get) => ({
  history: createInitialHistory({
    columns: 4,
    rows: 4,
    gap: 8,
    boxes: [],
    containerWidth: '100%',
    containerHeight: '600px',
    borderRadius: 8,
  }),
  
  get canUndo() {
    return get().history.past.length > 0;
  },
  
  get canRedo() {
    return get().history.future.length > 0;
  },
  
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
    
    return {
      ...state,
      history: {
        past: newPast,
        present: config,
        future: [] // Clear future when new action is performed
      }
    };
  }),
  
  undo: () => set((state) => {
    const { past, present, future } = state.history;
    
    if (past.length === 0) {
      return state; // Nothing to undo
    }
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    return {
      ...state,
      history: {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    };
  }),
  
  redo: () => set((state) => {
    const { past, present, future } = state.history;
    
    if (future.length === 0) {
      return state; // Nothing to redo
    }
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    return {
      ...state,
      history: {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    };
  }),
  
  clearHistory: () => set((state) => ({
    ...state,
    history: createInitialHistory(state.history.present)
  }))
});