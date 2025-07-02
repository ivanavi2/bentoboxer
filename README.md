# 🍱 BentoBoxer

**Transform your ideas into stunning bento grid layouts in seconds.** BentoBoxer is an intuitive drag-and-drop editor that makes creating beautiful, responsive bento box layouts as easy as arranging lunch boxes.

## ✨ Key Features

### 🎯 Interactive Grid Editor
- **Drag & Drop**: Intuitive box manipulation with smart collision detection
- **Live Positioning**: Real-time grid snapping and visual guidelines
- **Multi-Selection**: Bulk operations and precise control

### 👀 Live Preview System
- **Real-time Rendering**: Iframe-based preview with security sandboxing
- **Zoom Controls**: 25%-150% scaling for detailed work
- **Format-Aware**: Supports both vanilla CSS and Tailwind previews

### 💻 Code Generation
- **Vanilla CSS**: Clean CSS Grid with semantic class names
- **Tailwind CSS**: Utility-first responsive classes
- **HTML Export**: Semantic structure with accessibility features
- **Syntax Highlighting**: Prism.js integration for readability

### 🎨 Comprehensive Styling
- **Color System**: Advanced color picker with theme support
- **Typography**: Font family, size, weight, and alignment controls
- **Spacing**: Padding and margin controls with visual feedback
- **Effects**: Shadows, borders, and rounded corners

### ⚡ Professional UX
- **Undo/Redo**: 50-state history with command pattern implementation
- **Keyboard Shortcuts**: 10+ shortcuts (Ctrl+Z/Y, Delete, Arrow keys)
- **Theme Support**: Light/dark mode with CSS custom properties
- **Responsive Design**: Mobile-aware with collapsible sidebar

## 📁 Project Architecture

### Feature-Based Structure
```
src/
├── features/                    # Business domain features
│   ├── grid-editor/            # Interactive grid creation & manipulation
│   │   ├── components/         # GridEditor, GridBox, GridCell
│   │   └── hooks/              # useGridDragDrop
│   ├── configuration/          # Grid settings & styling controls
│   │   └── components/         # ConfigPanel, DimensionControls, StyleControls
│   ├── code-generation/        # HTML/CSS code generation system
│   │   ├── components/         # CodeTabs, CodeOutput, ExportDialog
│   │   ├── generators/         # BaseGenerator, CSS, Tailwind, HTML generators
│   │   ├── hooks/              # useCodeGeneration
│   │   └── templates/          # Code templates for each format
│   └── preview/                # Live preview & zoom system
│       ├── components/         # PreviewPane, ZoomControls
│       └── hooks/              # usePreview
├── components/                 # Shared UI components (shadcn/ui system)
│   ├── ui/                     # shadcn/ui component implementations
│   └── layout/                 # AppLayout, Header, Sidebar
├── hooks/                      # Application-wide custom hooks
│   ├── useKeyboardShortcuts.ts # Global keyboard shortcuts
│   ├── useUndoRedo.ts         # History navigation
│   └── useEditorWithHistory.ts # History-aware editor actions
├── lib/                        # Core utilities & configuration
│   ├── store/                  # Zustand state management
│   │   ├── slices/            # EditorSlice, ConfigSlice, UiSlice, HistorySlice
│   │   └── index.ts           # Store composition with middleware
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── schemas/                # Zod validation schemas
├── providers/                  # React context providers
└── app/                        # Next.js app router
    ├── layout.tsx              # Root layout with metadata
    ├── page.tsx                # Main application page
    └── globals.css             # Global styles and CSS variables
```

### State Management Architecture
```typescript
// Zustand with modular slice pattern
export type AppStore = EditorSlice & ConfigSlice & UiSlice & HistorySlice;

// Store slices by responsibility
├── EditorSlice     # Grid state, box management, selection
├── ConfigSlice     # Application configuration & preferences  
├── UiSlice         # View modes, sidebar state, theme
└── HistorySlice    # Undo/redo with 50-state command pattern
```

### Code Generation System
```typescript
// Plugin-based generator architecture
abstract class BaseGenerator {
  abstract generate(): string;
}

├── VanillaCSSGenerator  # CSS Grid output
├── TailwindGenerator    # Utility classes
└── HTMLGenerator        # Semantic structure
```

## 🛠️ Tech Stack

- **React 19** + **Next.js 15** with Turbopack
- **TypeScript 5** with strict type safety
- **Tailwind CSS 4** with custom design system
- **Zustand** for state management
- **shadcn/ui** + **Radix UI** for components
- **@dnd-kit** for drag & drop
- **Framer Motion** for animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

---

**Built with modern web technologies for maximum performance and developer experience.**