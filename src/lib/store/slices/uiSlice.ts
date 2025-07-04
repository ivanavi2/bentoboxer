// Zustand slice for UI state (theme, sidebar, modals)

import { StateCreator } from 'zustand';
import { ViewMode, EditorViewMode } from '../../types';

export interface UiSlice {
  viewMode: ViewMode;
  editorViewMode: EditorViewMode;
  sidebarOpen: boolean;
  isLoading: boolean;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  setEditorViewMode: (mode: EditorViewMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  viewMode: 'home',
  editorViewMode: 'edit',
  sidebarOpen: true,
  isLoading: false,
  
  setViewMode: (mode) => set({ viewMode: mode }),
  setEditorViewMode: (mode) => set({ editorViewMode: mode }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
});