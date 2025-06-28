'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface GridCellProps {
  x: number;
  y: number;
  isOccupied: boolean;
}

export function GridCell({ x, y, isOccupied }: GridCellProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${x}-${y}`,
    data: { x, y, type: 'grid-cell' }
  });

  if (isOccupied) {
    return null; // Don't render drop zone for occupied cells
  }

  return (
    <div
      ref={setNodeRef}
      className={`
        absolute inset-0 pointer-events-none
        ${isOver ? 'bg-blue-100 border-2 border-blue-300 border-dashed' : ''}
      `}
      style={{
        gridColumn: `${x + 1}`,
        gridRow: `${y + 1}`,
        pointerEvents: isOver ? 'auto' : 'none',
      }}
    />
  );
}