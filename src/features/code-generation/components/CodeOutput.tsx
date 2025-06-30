// Component for displaying generated HTML/CSS code with syntax highlighting

'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useClipboard } from '@/lib/utils/clipboard';
import { useCodeGeneration } from '../hooks/useCodeGeneration';
import { toast } from 'sonner';

interface CodeOutputProps {
  className?: string;
}

export function CodeOutput({ className }: CodeOutputProps) {
  const { generatedCode, outputFormat } = useCodeGeneration();
  const { copy } = useClipboard();
  const { theme } = useTheme();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const syntaxTheme = theme === 'dark' ? oneDark : oneLight;

  const getLanguage = (codeType: string) => {
    if (codeType === 'css') {
      return outputFormat === 'tailwind' ? 'html' : 'css';
    }
    return 'html';
  };

  const handleCopy = async (text: string, type: string) => {
    await copy(text, {
      onSuccess: () => {
        toast.success(`${type} copied to clipboard!`);
        setCopiedStates(prev => ({ ...prev, [type]: true }));
        
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [type]: false }));
        }, 2000);
      },
      onError: () => {
        toast.error(`Failed to copy ${type}`);
      }
    });
  };

  const formatTitle = () => {
    if (outputFormat === 'tailwind') {
      return 'Tailwind CSS Classes';
    }
    return 'Vanilla CSS';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="heading-3">Generated Code</h2>
        <div className="caption">
          Format: {outputFormat === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}
        </div>
      </div>

      {/* HTML Section */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
          <h3 className="heading-6">HTML</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(generatedCode.html, 'HTML')}
            className="h-8 px-2"
          >
            {copiedStates.HTML ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-0">
          <SyntaxHighlighter
            language={getLanguage('html')}
            style={syntaxTheme}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace'
            }}
            wrapLongLines={true}
          >
            {generatedCode.html}
          </SyntaxHighlighter>
        </div>
      </Card>

      {/* CSS/Tailwind Section */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
          <h3 className="heading-6">{formatTitle()}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(generatedCode.css, formatTitle())}
            className="h-8 px-2"
          >
            {copiedStates[formatTitle()] ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-0">
          <SyntaxHighlighter
            language={getLanguage('css')}
            style={syntaxTheme}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace'
            }}
            wrapLongLines={true}
          >
            {generatedCode.css}
          </SyntaxHighlighter>
        </div>
      </Card>

      {/* Complete HTML Section */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
          <h3 className="heading-6">Complete HTML Document</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(generatedCode.complete, 'Complete HTML')}
            className="h-8 px-2"
          >
            {copiedStates['Complete HTML'] ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="p-0">
          <SyntaxHighlighter
            language="html"
            style={syntaxTheme}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '14px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace'
            }}
            wrapLongLines={true}
          >
            {generatedCode.complete}
          </SyntaxHighlighter>
        </div>
      </Card>

      <div className="text-center">
        <p className="caption">
          Code updates automatically when you modify your grid configuration
        </p>
      </div>
    </div>
  );
}