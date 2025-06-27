// Zustand slice for configuration settings and styling options

import { StateCreator } from 'zustand';
import { OutputFormat, ThemeMode } from '../../types';

export interface ConfigSlice {
  outputFormat: OutputFormat;
  theme: ThemeMode;
  
  // Actions
  setOutputFormat: (format: OutputFormat) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const createConfigSlice: StateCreator<ConfigSlice> = (set) => ({
  outputFormat: 'vanilla',
  theme: 'system',
  
  setOutputFormat: (format) => set({ outputFormat: format }),
  setTheme: (theme) => set({ theme }),
});