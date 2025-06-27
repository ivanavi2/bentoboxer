// Abstract base class for all code generators with common functionality

import { GridConfig } from '@/lib/types';

export interface GeneratorOptions {
  minify?: boolean;
  includeComments?: boolean;
  prefix?: string;
}

export abstract class BaseGenerator {
  protected config: GridConfig;
  protected options: GeneratorOptions;

  constructor(config: GridConfig, options: GeneratorOptions = {}) {
    this.config = config;
    this.options = {
      minify: false,
      includeComments: true,
      prefix: '',
      ...options,
    };
  }

  abstract generate(): string;

  protected formatOutput(code: string): string {
    if (this.options.minify) {
      return code
        .replace(/\s+/g, ' ')
        .replace(/;\s*/g, ';')
        .replace(/{\s*/g, '{')
        .replace(/\s*}/g, '}')
        .trim();
    }
    return code;
  }

  protected addComment(comment: string): string {
    if (!this.options.includeComments) return '';
    return `/* ${comment} */\n`;
  }
}