// Custom hook for managing code generation state and operations

import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { VanillaCSSGenerator } from '../generators/css/VanillaCSSGenerator';
import { HTMLGenerator } from '../generators/html/HTMLGenerator';
import { TailwindGenerator } from '../generators/tailwind/TailwindGenerator';

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
    
    if (outputFormat === 'tailwind') {
      const tailwindGenerator = new TailwindGenerator(config);
      
      return {
        css: tailwindGenerator.generate(),
        html: tailwindGenerator.generateHTML(),
        complete: tailwindGenerator.generateCompleteHTML(),
      };
    }
    
    // Fallback for unknown formats
    return {
      css: '/* Unknown output format */',
      html: '<!-- Unknown output format -->',
      complete: '<!-- Unknown output format -->',
    };
  }, [config, outputFormat]);

  return {
    generatedCode,
    outputFormat,
  };
}