// Tabbed interface for switching between HTML, CSS, and Tailwind output

'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useClipboard } from '@/lib/utils/clipboard';
import { useCodeGeneration } from '../hooks/useCodeGeneration';
import { toast } from 'sonner';

interface CodeTabsProps {
  className?: string;
}

export function CodeTabs({ className }: CodeTabsProps) {
  const { generatedCode, outputFormat } = useCodeGeneration();
  const { copy } = useClipboard();
  const { theme } = useTheme();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('html');

  const syntaxTheme = theme === 'dark' ? oneDark : oneLight;

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

  const getLanguage = (tab: string) => {
    if (tab === 'html' || tab === 'complete') return 'html';
    if (tab === 'css') {
      return outputFormat === 'tailwind' ? 'html' : 'css';
    }
    return 'html';
  };

  const getTabTitle = (tab: string) => {
    if (tab === 'html') return 'HTML';
    if (tab === 'css') {
      return outputFormat === 'tailwind' ? 'Tailwind Classes' : 'CSS';
    }
    if (tab === 'complete') return 'Complete HTML';
    return tab;
  };

  const getCodeContent = (tab: string) => {
    if (tab === 'html') return generatedCode.html;
    if (tab === 'css') return generatedCode.css;
    if (tab === 'complete') return generatedCode.complete;
    return '';
  };

  return (
    <div className={`w-full ${className}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="html" className="px-4">
              HTML
            </TabsTrigger>
            <TabsTrigger value="css" className="px-4">
              {outputFormat === 'tailwind' ? 'Tailwind' : 'CSS'}
            </TabsTrigger>
            <TabsTrigger value="complete" className="px-4">
              Complete
            </TabsTrigger>
          </TabsList>
          
          <div className="caption">
            Format: {outputFormat === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}
          </div>
        </div>

        <Card className="overflow-hidden pt-0">
          <TabsContent value="html" className="p-0 m-0">
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
              <h3 className="heading-6">HTML Structure</h3>
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
                {getCodeContent('html')}
              </SyntaxHighlighter>
            </div>
          </TabsContent>

          <TabsContent value="css" className="p-0 m-0">
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
              <h3 className="heading-6">{getTabTitle('css')}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(generatedCode.css, getTabTitle('css'))}
                className="h-8 px-2"
              >
                {copiedStates[getTabTitle('css')] ? (
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
                {getCodeContent('css')}
              </SyntaxHighlighter>
            </div>
          </TabsContent>

          <TabsContent value="complete" className="p-0 m-0">
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
                language={getLanguage('complete')}
                style={syntaxTheme}
                customStyle={{
                  margin: 0,
                  background: 'transparent',
                  fontSize: '14px',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace'
                }}
                wrapLongLines={true}
              >
                {getCodeContent('complete')}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Card>

        <div className="text-center mt-4">
          <p className="caption">
            Code updates automatically when you modify your grid configuration
          </p>
        </div>
      </Tabs>
    </div>
  );
}