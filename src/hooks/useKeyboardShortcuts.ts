import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useEditorWithHistory } from '@/hooks/useEditorWithHistory';
import { useUndoRedo } from './useUndoRedo';

export const useKeyboardShortcuts = () => {
  const { setViewMode, setEditorViewMode, viewMode } = useStore();
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

        // View mode shortcuts (only work in editor mode)
        case 'h':
        case 'H':
          if (isModifierPressed) {
            setViewMode('home');
            event.preventDefault();
          }
          break;

        case 'e':
        case 'E':
          if (isModifierPressed) {
            if (viewMode === 'editor') {
              setEditorViewMode('edit');
            } else {
              setViewMode('editor');
            }
            event.preventDefault();
          }
          break;

        case 'p':
        case 'P':
          if (isModifierPressed && viewMode === 'editor') {
            setEditorViewMode('preview');
            event.preventDefault();
          }
          break;

        case 'g':
        case 'G':
          if (isModifierPressed && viewMode === 'editor') {
            setEditorViewMode('code');
            event.preventDefault();
          }
          break;


        // Undo/Redo shortcuts
        case 'z':
        case 'Z':
          if (isModifierPressed && !event.shiftKey && canUndo) {
            undo();
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
  }, [selectedBox, setSelectedBox, removeBox, setViewMode, setEditorViewMode, viewMode, undo, redo, canUndo, canRedo]);

  // Return key mappings for documentation/help
  return {
    shortcuts: {
      navigation: {
        'Escape': 'Deselect current box',
        'Delete/Backspace': 'Remove selected box',
      },
      views: {
        'Ctrl+H': 'Switch to Home view',
        'Ctrl+E': 'Switch to Editor view / Edit mode',
        'Ctrl+P': 'Switch to Preview mode (in editor)',
        'Ctrl+G': 'Switch to Code generation mode (in editor)',
      },
      actions: {
        'Ctrl+Z': 'Undo last action',
        'Ctrl+Y': 'Redo last undone action',
      }
    }
  };
};