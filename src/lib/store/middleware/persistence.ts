// Middleware for persisting store state to localStorage

import { PersistOptions } from 'zustand/middleware';
import { AppStore } from '../index';

export const persistenceConfig: PersistOptions<AppStore, Partial<AppStore>> = {
  name: 'bentoboxer-store',
  partialize: (state) => ({
    config: state.config,
    outputFormat: state.outputFormat,
    theme: state.theme,
  }),
};