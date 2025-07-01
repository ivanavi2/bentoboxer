// Generator for Tailwind CSS classes from bento grid configuration

import { BaseGenerator, GeneratorOptions } from '../base/BaseGenerator';
import { GridConfig } from '@/lib/types';
import { generateContainerClasses, generateBoxClasses } from './tailwindTemplates';

export class TailwindGenerator extends BaseGenerator {
  constructor(config: GridConfig, options?: GeneratorOptions) {
    super(config, options);
  }

  generate(): string {
    const header = this.addComment('Generated Bento Grid Tailwind Classes');
    const classes = this.generateTailwindClasses();
    
    return this.formatOutput(header + classes);
  }

  generateContainerClasses(): string {
    return generateContainerClasses(this.config);
  }

  generateBoxClasses(): string {
    return this.config.boxes.map(box => {
      const classes = generateBoxClasses(box);
      return `/* Box ${box.id} */\nclass="${classes}"`;
    }).join('\n\n');
  }

  private generateTailwindClasses(): string {
    let output = '';
    
    // Container classes
    output += '\n/* Container Classes */\n';
    output += `<div class="${this.generateContainerClasses()}">\n`;
    
    // Box classes
    output += '\n/* Box Classes */\n';
    this.config.boxes.forEach(box => {
      const classes = generateBoxClasses(box);
      output += `  <div class="${classes}">\n`;
      output += `    ${box.content || 'Content'}\n`;
      output += `  </div>\n`;
    });
    
    output += '</div>';
    
    return output;
  }

  // Generate HTML with Tailwind classes
  generateHTML(): string {
    const header = this.addComment('Generated Bento Grid HTML with Tailwind Classes');
    let html = header;
    
    html += `<div class="${this.generateContainerClasses()}">\n`;
    
    this.config.boxes.forEach(box => {
      const classes = generateBoxClasses(box);
      html += `  <div class="${classes}">\n`;
      html += `    ${box.content || 'Content'}\n`;
      html += `  </div>\n`;
    });
    
    html += '</div>';
    
    return this.formatOutput(html);
  }

  // Generate clean HTML for preview (without comments)
  generatePreviewHTML(): string {
    let html = `<div class="${this.generateContainerClasses()}">\n`;
    
    this.config.boxes.forEach(box => {
      const classes = generateBoxClasses(box);
      html += `  <div class="${classes}">\n`;
      html += `    ${box.content || 'Content'}\n`;
      html += `  </div>\n`;
    });
    
    html += '</div>';
    
    return html;
  }

  // Generate complete HTML document with Tailwind CDN
  generateCompleteHTML(): string {
    const header = this.addComment('Complete HTML Document with Tailwind CSS');
    let html = header;
    
    html += `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bento Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
  <div class="${this.generateContainerClasses()}">
`;
    
    this.config.boxes.forEach(box => {
      const classes = generateBoxClasses(box);
      html += `    <div class="${classes}">
      ${box.content || 'Content'}
    </div>
`;
    });
    
    html += `  </div>
</body>
</html>`;
    
    return this.formatOutput(html);
  }
}