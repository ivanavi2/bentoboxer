import { GridBox, GridConfig } from '@/lib/types';

export function isPositionOccupied(
  x: number, 
  y: number, 
  boxes: GridBox[], 
  excludeId?: string
): boolean {
  return boxes.some(box => {
    if (excludeId && box.id === excludeId) return false;
    
    // Check if position overlaps with any part of this box
    return (
      x >= box.x && 
      x < box.x + box.width &&
      y >= box.y && 
      y < box.y + box.height
    );
  });
}

export function findNextAvailablePosition(
  config: GridConfig, 
  width: number = 1, 
  height: number = 1
): { x: number; y: number } | null {
  // Try to find a position that fits the box dimensions
  for (let y = 0; y <= config.rows - height; y++) {
    for (let x = 0; x <= config.columns - width; x++) {
      // Check if all cells for this box are available
      let canPlace = true;
      
      for (let dy = 0; dy < height; dy++) {
        for (let dx = 0; dx < width; dx++) {
          if (isPositionOccupied(x + dx, y + dy, config.boxes)) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }
      
      if (canPlace) {
        return { x, y };
      }
    }
  }
  
  return null; // No available position found
}

export function canPlaceBoxAt(
  x: number,
  y: number,
  width: number,
  height: number,
  config: GridConfig,
  excludeId?: string
): boolean {
  // Check if box would fit within grid bounds
  if (x < 0 || y < 0 || x + width > config.columns || y + height > config.rows) {
    return false;
  }
  
  // Check if any part of the box would overlap with existing boxes
  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      if (isPositionOccupied(x + dx, y + dy, config.boxes, excludeId)) {
        return false;
      }
    }
  }
  
  return true;
}

export function getGridCellFromCoordinates(
  clientX: number,
  clientY: number,
  gridRect: DOMRect,
  config: GridConfig
): { x: number; y: number } | null {
  if (!gridRect) return null;
  
  // Calculate relative position within the grid
  const relativeX = clientX - gridRect.left;
  const relativeY = clientY - gridRect.top;
  
  // Account for grid padding
  const paddedX = relativeX - config.gap;
  const paddedY = relativeY - config.gap;
  
  // Calculate cell size including gaps
  const cellWidth = (gridRect.width - config.gap * 2) / config.columns;
  const cellHeight = (gridRect.height - config.gap * 2) / config.rows;
  
  // Calculate grid coordinates
  const x = Math.floor(paddedX / cellWidth);
  const y = Math.floor(paddedY / cellHeight);
  
  // Ensure coordinates are within bounds
  if (x >= 0 && x < config.columns && y >= 0 && y < config.rows) {
    return { x, y };
  }
  
  return null;
}