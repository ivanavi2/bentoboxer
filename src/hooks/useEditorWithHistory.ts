import { useCallback, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { GridConfig, GridBox, BoxStyling } from '@/lib/types';

export const useEditorWithHistory = () => {
  const { 
    config,
    selectedBox,
    setSelectedBox,
    updateConfig,
    addBox,
    removeBox,
    updateBox,
    updateBoxStyling,
    resetConfig,
    pushHistory,
    history
  } = useStore();

  // Sync history with editor config on history changes
  useEffect(() => {
    if (JSON.stringify(config) !== JSON.stringify(history.present)) {
      updateConfig(history.present);
    }
  }, [history.present, config, updateConfig]);

  // Wrapped actions that push to history
  const addBoxWithHistory = useCallback((box: GridBox) => {
    addBox(box);
    // Push the new config to history after the action
    setTimeout(() => {
      const newConfig = useStore.getState().config;
      pushHistory(newConfig);
    }, 0);
  }, [addBox, pushHistory]);

  const removeBoxWithHistory = useCallback((boxId: string) => {
    removeBox(boxId);
    setTimeout(() => {
      const newConfig = useStore.getState().config;
      pushHistory(newConfig);
    }, 0);
  }, [removeBox, pushHistory]);

  const updateBoxWithHistory = useCallback((boxId: string, updates: Partial<GridBox>) => {
    updateBox(boxId, updates);
    setTimeout(() => {
      const newConfig = useStore.getState().config;
      pushHistory(newConfig);
    }, 0);
  }, [updateBox, pushHistory]);

  const updateBoxStylingWithHistory = useCallback((boxId: string, styling: Partial<BoxStyling>) => {
    updateBoxStyling(boxId, styling);
    setTimeout(() => {
      const newConfig = useStore.getState().config;
      pushHistory(newConfig);
    }, 0);
  }, [updateBoxStyling, pushHistory]);

  const updateConfigWithHistory = useCallback((updates: Partial<GridConfig>) => {
    updateConfig(updates);
    setTimeout(() => {
      const newConfig = useStore.getState().config;
      pushHistory(newConfig);
    }, 0);
  }, [updateConfig, pushHistory]);

  return {
    // State
    config,
    selectedBox,
    
    // Actions without history (for selection, etc.)
    setSelectedBox,
    resetConfig,
    
    // Actions with history tracking
    addBox: addBoxWithHistory,
    removeBox: removeBoxWithHistory,
    updateBox: updateBoxWithHistory,
    updateBoxStyling: updateBoxStylingWithHistory,
    updateConfig: updateConfigWithHistory,
  };
};