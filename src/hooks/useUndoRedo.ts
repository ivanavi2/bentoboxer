import { useCallback } from 'react';
import { useStore } from '@/lib/store';

export const useUndoRedo = () => {
  const { 
    canUndo, 
    canRedo, 
    undo, 
    redo,
    history,
    updateConfig
  } = useStore();

  // Sync history present state with editor config
  const syncHistoryToEditor = useCallback(() => {
    updateConfig(history.present);
  }, [history.present, updateConfig]);

  const handleUndo = useCallback(() => {
    if (canUndo) {
      undo();
      // The history slice will update, and we need to sync the editor
      // This will be handled by a useEffect in the component that uses this hook
    }
  }, [canUndo, undo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      redo();
      // The history slice will update, and we need to sync the editor
      // This will be handled by a useEffect in the component that uses this hook
    }
  }, [canRedo, redo]);

  return {
    canUndo,
    canRedo,
    undo: handleUndo,
    redo: handleRedo,
    syncHistoryToEditor
  };
};