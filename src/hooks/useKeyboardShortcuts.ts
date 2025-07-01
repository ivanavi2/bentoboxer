import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useEditorWithHistory } from '@/hooks/useEditorWithHistory';
import { useUndoRedo } from './useUndoRedo';

export const useKeyboardShortcuts = () => {
  const { setViewMode } = useStore();
  const { 
    setSelectedBox, 
    removeBox, 
    selectedBox
  } = useEditorWithHistory();
  
  const { undo, redo, canUndo, canRedo } = useUndoRedo();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      const { key, ctrlKey, metaKey } = event;
      const isModifierPressed = ctrlKey || metaKey;

      switch (key) {
        // Navigation shortcuts
        case 'Escape':
          if (selectedBox) {
            setSelectedBox(null);
            event.preventDefault();
          }
          break;

        case 'Delete':
        case 'Backspace':
          if (selectedBox) {
            removeBox(selectedBox);
            event.preventDefault();
          }
          break;

        // View mode shortcuts
        case 'e':
        case 'E':
          if (isModifierPressed) {
            setViewMode('edit');
            event.preventDefault();
          }
          break;

        case 'p':
        case 'P':
          if (isModifierPressed) {
            setViewMode('preview');
            event.preventDefault();
          }
          break;

        case 'g':
        case 'G':
          if (isModifierPressed) {
            setViewMode('code');
            event.preventDefault();
          }
          break;

        // Copy current code (Ctrl+C when no text selected)
        case 'c':
        case 'C':
          if (isModifierPressed && window.getSelection()?.toString() === '') {
            // Trigger copy code action - this would need to be connected to code generation
            event.preventDefault();
            console.log('Copy code shortcut triggered');
          }
          break;

        // Export dialog (Ctrl+S)
        case 's':
        case 'S':
          if (isModifierPressed) {
            // Trigger export dialog - would need to be connected to export functionality
            event.preventDefault();
            console.log('Export shortcut triggered');
          }
          break;

        // Undo/Redo shortcuts
        case 'z':
        case 'Z':
          if (isModifierPressed && !event.shiftKey && canUndo) {
            undo();
            event.preventDefault();
          } else if (isModifierPressed && event.shiftKey && canRedo) {
            redo();
            event.preventDefault();
          }
          break;

        case 'y':
        case 'Y':
          if (isModifierPressed && canRedo) {
            redo();
            event.preventDefault();
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBox, setSelectedBox, removeBox, setViewMode, undo, redo, canUndo, canRedo]);

  // Return key mappings for documentation/help
  return {
    shortcuts: {
      navigation: {
        'Escape': 'Deselect current box',
        'Delete/Backspace': 'Remove selected box',
      },
      views: {
        'Ctrl+E': 'Switch to Edit mode',
        'Ctrl+P': 'Switch to Preview mode', 
        'Ctrl+G': 'Switch to Code generation mode',
      },
      actions: {
        'Ctrl+C': 'Copy current code (when no text selected)',
        'Ctrl+S': 'Open export dialog',
        'Ctrl+Z': 'Undo last action',
        'Ctrl+Shift+Z': 'Redo last undone action',
        'Ctrl+Y': 'Redo last undone action',
      }
    }
  };
};