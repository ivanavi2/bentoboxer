// Modal dialog for exporting code with format options and copy functionality

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Copy, Check, FileText, Code2, Package } from 'lucide-react';
import { useCodeGeneration } from '../hooks/useCodeGeneration';
import { useClipboard } from '@/lib/utils/clipboard';
import { toast } from 'sonner';

interface ExportDialogProps {
  children: React.ReactNode;
}

export function ExportDialog({ children }: ExportDialogProps) {
  const { generatedCode, outputFormat } = useCodeGeneration();
  const { copy } = useClipboard();
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = async (text: string, type: string) => {
    await copy(text, {
      onSuccess: () => {
        toast.success(`${type} copied to clipboard!`);
        setCopiedStates(prev => ({ ...prev, [type]: true }));
        
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [type]: false }));
        }, 2000);
      },
      onError: () => {
        toast.error(`Failed to copy ${type}`);
      }
    });
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${filename} downloaded successfully!`);
    } catch {
      toast.error(`Failed to download ${filename}`);
    }
  };

  const handleDownloadHTML = () => {
    downloadFile(generatedCode.html, 'grid.html', 'text/html');
  };

  const handleDownloadCSS = () => {
    const filename = outputFormat === 'tailwind' ? 'grid-classes.txt' : 'grid.css';
    const mimeType = outputFormat === 'tailwind' ? 'text/plain' : 'text/css';
    downloadFile(generatedCode.css, filename, mimeType);
  };

  const handleDownloadComplete = () => {
    const filename = outputFormat === 'tailwind' ? 'grid-tailwind.html' : 'grid-complete.html';
    downloadFile(generatedCode.complete, filename, 'text/html');
  };

  const handleDownloadAll = () => {
    // Create a simple archive-like text file with all content
    const separator = '\n\n' + '='.repeat(50) + '\n\n';
    const content = [
      '// BentoBoxer Generated Code',
      `// Format: ${outputFormat === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}`,
      `// Generated: ${new Date().toISOString()}`,
      separator,
      '// HTML Structure',
      separator,
      generatedCode.html,
      separator,
      outputFormat === 'tailwind' ? '// Tailwind CSS Classes' : '// CSS Styles',
      separator,
      generatedCode.css,
      separator,
      '// Complete HTML Document',
      separator,
      generatedCode.complete
    ].join('\n');

    downloadFile(content, 'bentoboxer-export.txt', 'text/plain');
  };

  const exportOptions = [
    {
      id: 'html',
      title: 'HTML Structure',
      description: 'Download the HTML structure only',
      icon: FileText,
      action: handleDownloadHTML,
      copyAction: () => handleCopy(generatedCode.html, 'HTML'),
      filename: 'grid.html'
    },
    {
      id: 'css',
      title: outputFormat === 'tailwind' ? 'Tailwind Classes' : 'CSS Styles',
      description: outputFormat === 'tailwind' 
        ? 'Download Tailwind CSS utility classes' 
        : 'Download the CSS stylesheet',
      icon: Code2,
      action: handleDownloadCSS,
      copyAction: () => handleCopy(generatedCode.css, outputFormat === 'tailwind' ? 'Tailwind Classes' : 'CSS'),
      filename: outputFormat === 'tailwind' ? 'grid-classes.txt' : 'grid.css'
    },
    {
      id: 'complete',
      title: 'Complete HTML Document',
      description: 'Download ready-to-use HTML file with embedded styles',
      icon: Package,
      action: handleDownloadComplete,
      copyAction: () => handleCopy(generatedCode.complete, 'Complete HTML'),
      filename: outputFormat === 'tailwind' ? 'grid-tailwind.html' : 'grid-complete.html'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Generated Code
          </DialogTitle>
          <DialogDescription>
            Download your bento grid code in various formats. Choose the option that best fits your project needs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="gap-1">
              <Code2 className="h-3 w-3" />
              {outputFormat === 'tailwind' ? 'Tailwind CSS' : 'Vanilla CSS'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAll}
              className="gap-2"
            >
              <Package className="h-4 w-4" />
              Download All
            </Button>
          </div>

          <Separator />

          <div className="grid gap-4">
            {exportOptions.map((option) => (
              <Card key={option.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-md bg-muted">
                      <option.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{option.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Filename: {option.filename}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={option.copyAction}
                      className="h-8 px-3 gap-1"
                    >
                      {copiedStates[option.title] ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={option.action}
                      className="h-8 px-3 gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              All downloads are generated locally in your browser. No data is sent to external servers.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Grid Dimensions: {generatedCode.css.includes('grid-cols') ? 'Dynamic' : 'Fixed'}</span>
              <span>•</span>
              <span>Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}