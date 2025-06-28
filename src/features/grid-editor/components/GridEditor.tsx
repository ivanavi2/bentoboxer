'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { GridBox } from './GridBox';
import { GridCell } from './GridCell';
import { useGridDragDrop } from '../hooks/useGridDragDrop';
import { isPositionOccupied, canPlaceBoxAt } from '@/lib/utils/gridUtils';

export function GridEditor() {
  const { config, selectedBox, setSelectedBox } = useStore();
  const {
    DndContext,
    DragOverlay,
    sensors,
    activeBox,
    handleDragStart,
    handleDragEnd,
  } = useGridDragDrop();
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
    gridTemplateRows: `repeat(${config.rows}, 1fr)`,
    gap: `${config.gap}px`,
    width: config.containerWidth,
    height: config.containerHeight,
    borderRadius: `${config.borderRadius}px`,
    border: '2px dashed #e2e8f0',
    backgroundColor: '#fafafa',
    padding: `${config.gap}px`,
    position: 'relative' as const,
  };

  const handleGridClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedBox(null);
    }
  };

  const renderGridLines = () => {
    const lines = [];
    
    // Vertical lines
    for (let i = 1; i < config.columns; i++) {
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 border-l border-gray-200 pointer-events-none"
          style={{
            left: `calc(${(i / config.columns) * 100}% - 1px)`,
          }}
        />
      );
    }
    
    // Horizontal lines
    for (let i = 1; i < config.rows; i++) {
      lines.push(
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 border-t border-gray-200 pointer-events-none"
          style={{
            top: `calc(${(i / config.rows) * 100}% - 1px)`,
          }}
        />
      );
    }
    
    return lines;
  };

  const renderGridCells = () => {
    const cells = [];
    
    for (let y = 0; y < config.rows; y++) {
      for (let x = 0; x < config.columns; x++) {
        // Exclude the currently dragged box from occupation check
        const excludeId = activeBox?.id;
        const isOccupied = isPositionOccupied(x, y, config.boxes, excludeId);
        
        // Check if the dragged box can be placed at this position
        const canDrop = activeBox ? 
          canPlaceBoxAt(x, y, activeBox.width, activeBox.height, config, activeBox.id) :
          true;
        
        cells.push(
          <GridCell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            isOccupied={isOccupied}
            canDrop={canDrop}
          />
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          style={gridStyle}
          onClick={handleGridClick}
          className="relative overflow-hidden"
        >
          {renderGridLines()}
          {renderGridCells()}
          
          {config.boxes.map((box) => (
            <GridBox
              key={box.id}
              box={box}
              isSelected={selectedBox === box.id}
              onSelect={() => setSelectedBox(box.id)}
            />
          ))}
          
          {config.boxes.length === 0 && (
            <div className="col-span-full row-span-full flex items-center justify-center text-gray-500 text-lg">
              Click &ldquo;Add Box&rdquo; to start creating your bento grid
            </div>
          )}
        </div>
        
        <DragOverlay>
          {activeBox ? (
            <div className="bg-blue-100 border-2 border-blue-300 rounded p-2 opacity-90">
              Dragging Box {activeBox.id.slice(-4)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}