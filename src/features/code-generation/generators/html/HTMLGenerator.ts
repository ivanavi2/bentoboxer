// Generator for semantic HTML structure from bento grid configuration

import { BaseGenerator, GeneratorOptions } from '../base/BaseGenerator';
import { GridConfig } from '@/lib/types';
import { generateHTMLStructure, generateCompleteHTML } from './htmlTemplates';
import { generateFullCSS } from '../css/cssTemplates';

export class HTMLGenerator extends BaseGenerator {
  constructor(config: GridConfig, options?: GeneratorOptions) {
    super(config, options);
  }

  generate(): string {
    return this.generateHTML();
  }

  generateHTML(): string {
    return generateHTMLStructure(this.config);
  }

  generateCompleteHTML(): string {
    const css = generateFullCSS(this.config);
    return generateCompleteHTML(this.config, css);
  }
}