import { useCallback, useEffect, useRef } from 'react';
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
    clearHistory,
    history
  } = useStore();

  const isPerformingAction = useRef(false);

  // Initialize history with current config on mount
  useEffect(() => {
    if (history.past.length === 0 && history.future.length === 0) {
      pushHistory(config);
    }
  }, [config, history.past.length, history.future.length, pushHistory]);

  // Sync editor config with history present state when undo/redo happens
  useEffect(() => {
    if (!isPerformingAction.current && JSON.stringify(config) !== JSON.stringify(history.present)) {
      updateConfig(history.present);
    }
  }, [history.present, config, updateConfig]);

  // Wrapped actions that push to history
  const addBoxWithHistory = useCallback((box: GridBox) => {
    isPerformingAction.current = true;
    addBox(box);
    // Calculate the expected new config and push to history
    const newConfig = {
      ...config,
      boxes: [...config.boxes, box]
    };
    pushHistory(newConfig);
    isPerformingAction.current = false;
  }, [addBox, pushHistory, config]);

  const removeBoxWithHistory = useCallback((boxId: string) => {
    isPerformingAction.current = true;
    removeBox(boxId);
    // Calculate the expected new config and push to history
    const newConfig = {
      ...config,
      boxes: config.boxes.filter(b => b.id !== boxId)
    };
    pushHistory(newConfig);
    isPerformingAction.current = false;
  }, [removeBox, pushHistory, config]);

  const updateBoxWithHistory = useCallback((boxId: string, updates: Partial<GridBox>) => {
    isPerformingAction.current = true;
    updateBox(boxId, updates);
    // Calculate the expected new config and push to history
    const newConfig = {
      ...config,
      boxes: config.boxes.map(box =>
        box.id === boxId ? { ...box, ...updates } : box
      )
    };
    pushHistory(newConfig);
    isPerformingAction.current = false;
  }, [updateBox, pushHistory, config]);

  const updateBoxStylingWithHistory = useCallback((boxId: string, styling: Partial<BoxStyling>) => {
    isPerformingAction.current = true;
    updateBoxStyling(boxId, styling);
    // Calculate the expected new config and push to history
    const newConfig = {
      ...config,
      boxes: config.boxes.map(box =>
        box.id === boxId 
          ? { ...box, styling: { ...box.styling, ...styling } }
          : box
      )
    };
    pushHistory(newConfig);
    isPerformingAction.current = false;
  }, [updateBoxStyling, pushHistory, config]);

  const updateConfigWithHistory = useCallback((updates: Partial<GridConfig>) => {
    isPerformingAction.current = true;
    updateConfig(updates);
    // Calculate the expected new config and push to history
    const newConfig = { ...config, ...updates };
    pushHistory(newConfig);
    isPerformingAction.current = false;
  }, [updateConfig, pushHistory, config]);

  const resetConfigWithHistory = useCallback(() => {
    isPerformingAction.current = true;
    resetConfig();
    // Clear history with the default config to ensure proper reset
    const defaultConfig = {
      columns: 4,
      rows: 4,
      gap: 8,
      boxes: [],
      containerWidth: '100%',
      containerHeight: '600px',
      borderRadius: 8,
    };
    clearHistory(defaultConfig);
    isPerformingAction.current = false;
  }, [resetConfig, clearHistory]);

  return {
    // State
    config,
    selectedBox,
    
    // Actions without history (for selection, etc.)
    setSelectedBox,
    
    // Actions with history tracking
    addBox: addBoxWithHistory,
    removeBox: removeBoxWithHistory,
    updateBox: updateBoxWithHistory,
    updateBoxStyling: updateBoxStylingWithHistory,
    updateConfig: updateConfigWithHistory,
    resetConfig: resetConfigWithHistory,
  };
};