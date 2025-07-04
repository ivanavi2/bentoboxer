// Home page component with welcome content and project overview

'use client';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit3, Eye, FileText, Grid, Palette, Download } from 'lucide-react';
import Image from 'next/image';

export function HomePage() {
  const { setViewMode } = useStore();

  const features = [
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: "Drag & Drop Editor",
      description: "Intuitive visual editor with drag-and-drop functionality for creating bento grid layouts"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "Real-time preview with zoom controls to see exactly how your layout will look"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Code Generation",
      description: "Generate clean HTML/CSS code in both vanilla CSS and Tailwind CSS formats"
    },
    {
      icon: <Grid className="h-6 w-6" />,
      title: "Responsive Layouts",
      description: "Create responsive grid layouts that work perfectly on all screen sizes"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Advanced Styling",
      description: "Comprehensive styling controls including colors, borders, shadows, and typography"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Ready",
      description: "Export your designs as HTML/CSS files ready for use in your projects"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/logo.png"
            alt="BentoBoxer Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <h1 className="heading-1">BentoBoxer</h1>
        </div>
        <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create stunning bento box layouts with our intuitive drag-and-drop editor. 
          Generate responsive CSS/HTML code for dashboard designs, portfolios, and modern web interfaces.
        </p>
        <Button 
          size="lg" 
          onClick={() => setViewMode('editor')}
          className="text-lg px-8 py-6"
        >
          <Edit3 className="h-5 w-5 mr-2" />
          Start Creating
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="heading-6">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="body-small">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Getting Started Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="heading-4">Getting Started</CardTitle>
          <CardDescription className="body-base">
            Follow these simple steps to create your first bento grid layout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="heading-6 mb-1">Launch the Editor</h3>
                <p className="body-small text-muted-foreground">
                  Click &ldquo;Start Creating&rdquo; to open the visual editor interface
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="heading-6 mb-1">Design Your Layout</h3>
                <p className="body-small text-muted-foreground">
                  Use the drag-and-drop editor to arrange boxes and customize your grid
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="heading-6 mb-1">Generate & Export</h3>
                <p className="body-small text-muted-foreground">
                  Generate clean HTML/CSS code and export your layout for use in projects
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setViewMode('editor')}
          className="text-lg px-8 py-6"
        >
          <Grid className="h-5 w-5 mr-2" />
          Open Editor
        </Button>
      </div>
    </div>
  );
}