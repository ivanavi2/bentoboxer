// HTML template strings and semantic structure utilities

import { GridConfig } from '@/lib/types';

export function generateHTMLStructure(config: GridConfig): string {
  const boxes = config.boxes.map(box => 
    `    <div class="bento-box-${box.id}">${box.content || ''}</div>`
  ).join('\n');

  return `<div class="bento-container">
${boxes}
</div>`;
}

export function generateCompleteHTML(config: GridConfig, css: string): string {
  const htmlStructure = generateHTMLStructure(config);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bento Grid Layout</title>
    <style>
${css}
    </style>
</head>
<body>
    ${htmlStructure}
</body>
</html>`;
}