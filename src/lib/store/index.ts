// Main store composition and configuration for Zustand state management

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createEditorSlice, EditorSlice } from './slices/editorSlice';
import { createConfigSlice, ConfigSlice } from './slices/configSlice';
import { createUiSlice, UiSlice } from './slices/uiSlice';
import { persistenceConfig } from './middleware/persistence';
import { devtoolsConfig } from './middleware/devtools';

export type AppStore = EditorSlice & ConfigSlice & UiSlice;

export const useStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createEditorSlice(...a),
        ...createConfigSlice(...a),
        ...createUiSlice(...a),
      }),
      persistenceConfig
    ),
    devtoolsConfig
  )
);