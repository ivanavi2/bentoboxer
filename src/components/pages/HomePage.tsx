// Home page component with full viewport welcome screen

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit3, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export function HomePage() {
  const { setViewMode } = useStore();
  const shouldReduceMotion = useReducedMotion();

  const gettingStartedContent = (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="body-base text-muted-foreground">
          Follow these simple steps to create your first responsive CSS Grid bento box layout with our free online editor
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
            1
          </div>
          <div>
            <h3 className="heading-6 mb-1">Launch the Grid Editor</h3>
            <p className="body-small text-muted-foreground">
              Click &ldquo;Start Creating&rdquo; to open the visual CSS Grid editor for bento box layouts
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
            2
          </div>
          <div>
            <h3 className="heading-6 mb-1">Design Your Grid Layout</h3>
            <p className="body-small text-muted-foreground">
              Use the drag-and-drop interface to arrange grid items and customize responsive web layouts
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
            3
          </div>
          <div>
            <h3 className="heading-6 mb-1">Generate & Export Code</h3>
            <p className="body-small text-muted-foreground">
              Generate clean HTML and CSS Grid code, export for web development and design projects
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full min-h-full flex flex-col items-center justify-center px-4 relative">
    {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="title-stylized">BentoBoxer</h1>
        </div>
        
        <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create stunning bento box grid layouts with our free online drag-and-drop editor. 
          Build responsive CSS Grid and HTML code for modern web design, dashboard layouts, portfolios, and user interfaces. 
          Perfect for web developers, designers, and UI/UX professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => setViewMode('editor')}
            className="text-lg px-8 py-6 w-full sm:w-auto"
          >
            <Edit3 className="h-5 w-5 mr-2" />
            Start Creating
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 w-full sm:w-auto"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                Grid Tutorial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="heading-4">Getting Started</DialogTitle>
              </DialogHeader>
              {gettingStartedContent}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Decorative Bento Box Image */}
      <div className="absolute bottom-4 right-4 hidden sm:block overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ 
            opacity: 0.8,
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -6, 0, -6, 0],
            rotate: shouldReduceMotion ? 0 : [0, 1, -1, 0]
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.1 },
            y: shouldReduceMotion ? {} : {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: shouldReduceMotion ? {} : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{
            scale: shouldReduceMotion ? 1.02 : 1.05
          }}
          style={{
            transformOrigin: "bottom right"
          }}
        >
          <Image
            src="/bentobox.png"
            alt="Decorative bento box illustration"
            width={320}
            height={320}
            className="cursor-pointer"
          />
        </motion.div>
      </div>
    </div>
  );
}