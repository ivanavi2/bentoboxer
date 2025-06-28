'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface GridCellProps {
  x: number;
  y: number;
  isOccupied: boolean;
  canDrop?: boolean;
}

export function GridCell({ x, y, isOccupied, canDrop = true }: GridCellProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${x}-${y}`,
    data: { x, y, type: 'grid-cell' }
  });

  if (isOccupied || !canDrop) {
    return null; // Don't render drop zone for occupied cells or invalid drop positions
  }

  return (
    <div
      ref={setNodeRef}
      className={`
        ${isOver 
          ? 'bg-blue-100 border-2 border-blue-400 border-dashed rounded shadow-sm' 
          : 'bg-blue-50 border border-blue-200 border-dashed rounded opacity-30 hover:opacity-60'
        }
        transition-all duration-200
      `}
      style={{
        gridColumn: `${x + 1}`,
        gridRow: `${y + 1}`,
        pointerEvents: 'auto',
        minHeight: '100%',
        minWidth: '100%',
      }}
    />
  );
}