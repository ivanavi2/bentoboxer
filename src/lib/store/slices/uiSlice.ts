// Zustand slice for UI state (theme, sidebar, modals)

import { StateCreator } from 'zustand';
import { ViewMode } from '../../types';

export interface UiSlice {
  viewMode: ViewMode;
  sidebarOpen: boolean;
  isLoading: boolean;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  viewMode: 'edit',
  sidebarOpen: true,
  isLoading: false,
  
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
});