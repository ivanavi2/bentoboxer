// CSS template strings and formatting utilities for vanilla CSS generation

import { GridConfig, GridBox } from '@/lib/types';

export function generateContainerCSS(config: GridConfig): string {
  return `
.bento-container {
  display: grid;
  grid-template-columns: repeat(${config.columns}, 1fr);
  grid-template-rows: repeat(${config.rows}, 1fr);
  gap: ${config.gap}px;
  width: ${config.containerWidth};
  height: ${config.containerHeight};
  border-radius: ${config.borderRadius}px;
}`;
}

export function generateBoxCSS(box: GridBox): string {
  const styling = box.styling || {};
  
  let css = `
.bento-box-${box.id} {
  grid-column: ${box.x + 1} / span ${box.width};
  grid-row: ${box.y + 1} / span ${box.height};`;

  // Add styling properties
  if (styling.backgroundColor) {
    css += `\n  background-color: ${styling.backgroundColor};`;
  }
  
  if (styling.textColor) {
    css += `\n  color: ${styling.textColor};`;
  }
  
  if (styling.borderWidth && styling.borderWidth > 0) {
    css += `\n  border: ${styling.borderWidth}px ${styling.borderStyle || 'solid'} ${styling.borderColor || '#000'};`;
  }
  
  if (styling.borderRadius) {
    css += `\n  border-radius: ${styling.borderRadius}px;`;
  }
  
  if (styling.boxShadow && styling.boxShadow !== 'none') {
    css += `\n  box-shadow: ${styling.boxShadow};`;
  }
  
  if (styling.fontFamily) {
    css += `\n  font-family: ${styling.fontFamily};`;
  }
  
  if (styling.fontSize) {
    css += `\n  font-size: ${styling.fontSize}px;`;
  }
  
  if (styling.fontWeight) {
    css += `\n  font-weight: ${styling.fontWeight};`;
  }
  
  if (styling.padding) {
    css += `\n  padding: ${styling.padding}px;`;
  }

  css += `\n  display: flex;
  align-items: center;
  justify-content: center;
}`;

  return css;
}

export function generateFullCSS(config: GridConfig): string {
  let css = generateContainerCSS(config);
  
  config.boxes.forEach(box => {
    css += '\n' + generateBoxCSS(box);
  });
  
  return css;
}