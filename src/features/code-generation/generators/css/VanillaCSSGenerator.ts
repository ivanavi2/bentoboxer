// Generator for vanilla CSS Grid code from bento grid configuration

import { BaseGenerator, GeneratorOptions } from '../base/BaseGenerator';
import { GridConfig } from '@/lib/types';
import { generateFullCSS } from './cssTemplates';

export class VanillaCSSGenerator extends BaseGenerator {
  constructor(config: GridConfig, options?: GeneratorOptions) {
    super(config, options);
  }

  generate(): string {
    const header = this.addComment('Generated Bento Grid CSS');
    const css = generateFullCSS(this.config);
    
    return this.formatOutput(header + css);
  }
}