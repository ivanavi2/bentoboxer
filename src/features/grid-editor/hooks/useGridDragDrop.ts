import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { GridBox } from '@/lib/types';
import { useStore } from '@/lib/store';
import { canPlaceBoxAt } from '@/lib/utils/gridUtils';

export function useGridDragDrop() {
  const { config, updateBox } = useStore();
  const [activeBox, setActiveBox] = useState<GridBox | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const box = config.boxes.find(b => b.id === active.id);
    setActiveBox(box || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveBox(null);

    if (!over || active.id === over.id) {
      return;
    }

    const activeBox = config.boxes.find(b => b.id === active.id);
    if (!activeBox) return;

    // Check if dropping on a grid cell
    if (over.data.current?.type === 'grid-cell') {
      const { x, y } = over.data.current;
      
      // Check if box can be placed at this position
      if (canPlaceBoxAt(x, y, activeBox.width, activeBox.height, config, activeBox.id)) {
        updateBox(activeBox.id, { x, y });
      }
      return;
    }

    // Handle dropping on another box (swap positions)
    const overBox = config.boxes.find(b => b.id === over.id);
    if (overBox) {
      // Check if boxes can swap positions
      const canSwap = 
        canPlaceBoxAt(overBox.x, overBox.y, activeBox.width, activeBox.height, config, activeBox.id) &&
        canPlaceBoxAt(activeBox.x, activeBox.y, overBox.width, overBox.height, config, overBox.id);
      
      if (canSwap) {
        // Swap positions
        updateBox(activeBox.id, {
          x: overBox.x,
          y: overBox.y,
        });
        updateBox(overBox.id, {
          x: activeBox.x,
          y: activeBox.y,
        });
      }
    }
  };

  return {
    DndContext,
    DragOverlay,
    sensors,
    activeBox,
    handleDragStart,
    handleDragEnd,
  };
}