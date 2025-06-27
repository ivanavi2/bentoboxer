// Custom hook for managing code generation state and operations

import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { VanillaCSSGenerator } from '../generators/css/VanillaCSSGenerator';
import { HTMLGenerator } from '../generators/html/HTMLGenerator';

export function useCodeGeneration() {
  const { config, outputFormat } = useStore();

  const generatedCode = useMemo(() => {
    if (outputFormat === 'vanilla') {
      const cssGenerator = new VanillaCSSGenerator(config);
      const htmlGenerator = new HTMLGenerator(config);
      
      return {
        css: cssGenerator.generate(),
        html: htmlGenerator.generateHTML(),
        complete: htmlGenerator.generateCompleteHTML(),
      };
    }
    
    // TODO: Implement Tailwind generator
    return {
      css: '/* Tailwind CSS generation not implemented yet */',
      html: '<!-- Tailwind HTML generation not implemented yet -->',
      complete: '<!-- Tailwind complete generation not implemented yet -->',
    };
  }, [config, outputFormat]);

  return {
    generatedCode,
    outputFormat,
  };
}