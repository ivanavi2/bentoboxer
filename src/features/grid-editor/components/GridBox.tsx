'use client';

import React from 'react';
import { GridBox as GridBoxType } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { X, GripVertical } from 'lucide-react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface GridBoxProps {
  box: GridBoxType;
  isSelected: boolean;
  onSelect: () => void;
}

export function GridBox({ box, isSelected, onSelect }: GridBoxProps) {
  const { removeBox } = useStore();
  
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: box.id,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: box.id,
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBox(box.id);
  };

  const boxStyle = {
    gridColumn: `${box.x + 1} / span ${box.width}`,
    gridRow: `${box.y + 1} / span ${box.height}`,
    backgroundColor: box.styling?.backgroundColor || '#ffffff',
    color: box.styling?.textColor || '#000000',
    borderColor: box.styling?.borderColor || '#e2e8f0',
    borderWidth: box.styling?.borderWidth || 1,
    borderStyle: box.styling?.borderStyle || 'solid',
    borderRadius: box.styling?.borderRadius || 4,
    boxShadow: box.styling?.boxShadow || '0 1px 3px rgba(0, 0, 0, 0.1)',
    fontFamily: box.styling?.fontFamily || 'inherit',
    fontSize: box.styling?.fontSize || 14,
    fontWeight: box.styling?.fontWeight || 400,
    padding: box.styling?.padding || 16,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  return (
    <div
      ref={setNodeRef}
      style={boxStyle}
      onClick={onSelect}
      className={`
        relative cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? 'ring-2 ring-blue-500 ring-offset-2' 
          : 'hover:ring-1 hover:ring-gray-300'
        }
        ${isOver ? 'ring-2 ring-green-400' : ''}
      `}
      {...attributes}
    >
      {isSelected && (
        <>
          <Button
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
            onClick={handleDelete}
          >
            <X className="h-3 w-3" />
          </Button>
          
          <div
            className="absolute -top-2 -left-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center cursor-move"
            {...listeners}
          >
            <GripVertical className="h-3 w-3 text-white" />
          </div>
        </>
      )}
      
      <div className="h-full w-full flex items-center justify-center">
        {box.content ? (
          <span className="body-base font-medium text-center break-words">{box.content}</span>
        ) : (
          <span className="text-gray-400 body-small">
            Box {box.id.slice(-4)}
          </span>
        )}
      </div>
    </div>
  );
}