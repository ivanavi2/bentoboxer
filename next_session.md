# Phase 5 Implementation Plan: Advanced Features & Live Preview

## Overview
Phase 5 will transform BentoBoxer from a functional grid builder into a comprehensive design tool with live preview capabilities, responsive testing, and enhanced user experience features.

## Implementation Strategy

### **Task 5.1: Core Preview System** (Priority: HIGH)
**Goal**: Create a live preview that renders the actual grid layout using generated CSS/HTML

#### 5.1.1: PreviewPane Component
- **Live HTML/CSS Rendering**: Use iframe or shadow DOM to safely render generated code
- **Real-time Updates**: Subscribe to config changes for instant preview updates
- **Format Support**: Handle both vanilla CSS and Tailwind CSS preview modes
- **Error Handling**: Graceful fallbacks when preview fails to render
- **Integration**: Connect with existing viewMode system (Edit/Preview toggle)

#### 5.1.2: usePreview Hook
- **State Management**: Preview configuration, zoom level, responsive mode
- **Code Generation Integration**: Use existing generators to create preview content
- **Performance**: Debounced updates to prevent excessive re-renders
- **Responsive State**: Current breakpoint, device simulation

### **Task 5.2: Preview System Enhancements** (Priority: COMPLETED)
**Goal**: Enhanced preview functionality with zoom controls

✅ **ZoomControls Component** - Implemented zoom levels 25%-150%
✅ **PreviewPane Integration** - Connected zoom with live preview rendering
✅ **Performance Optimization** - Debounced updates and efficient rendering

### **Task 5.3: Enhanced User Experience** (Priority: MEDIUM)
**Goal**: Add power-user features for efficiency

#### 5.3.1: Keyboard Shortcuts (useKeyboardShortcuts)
- **Navigation**: `Tab` cycle through boxes, `Escape` deselect
- **Actions**: `Ctrl+Z` undo, `Ctrl+Y` redo, `Delete` remove box
- **Views**: `Ctrl+E` edit mode, `Ctrl+P` preview mode
- **Export**: `Ctrl+S` export dialog, `Ctrl+C` copy current code

#### 5.3.2: Undo/Redo System
- **State History**: Track configuration changes with command pattern
- **Memory Management**: Limit history to 50 states, efficient storage
- **UI Integration**: Undo/Redo buttons in header or toolbar
- **Keyboard Integration**: Standard Ctrl+Z/Ctrl+Y shortcuts

### **Task 5.4: Grid Templates & Presets** (Priority: LOW)
**Goal**: Provide starting points for common layouts

#### 5.4.1: Template System
- **Common Layouts**: Dashboard, Blog, Portfolio, Landing page templates
- **Template Storage**: JSON-based template definitions
- **Template Selector**: Modal or sidebar with preview thumbnails
- **Custom Templates**: Save current grid as template

## Technical Implementation Details

### **View Mode Integration**
```typescript
// Update page.tsx to handle preview mode
{viewMode === 'edit' ? (
  <GridEditor />
) : viewMode === 'preview' ? (
  <PreviewPane />
) : (
  <CodeTabs />
)}
```

### **Preview Rendering Strategy**
1. **Shadow DOM Approach**: Isolated CSS rendering without affecting main app
2. **Generated Content**: Use existing generators to create preview HTML/CSS
3. **Real-time Updates**: Subscribe to store changes, debounced at 300ms
4. **Error Boundaries**: Graceful fallback when preview fails

### **Zoom Control System**
```typescript
const zoomLevels = [25, 50, 75, 100, 125, 150];
// Integrated with PreviewPane for scalable preview rendering
```

### **State Management Extensions**
✅ **PreviewSlice**: Implemented in Zustand store with zoom state
- **HistorySlice**: Undo/redo state management with command pattern (TODO)

## File Structure
```
src/features/preview/
├── components/
│   ├── PreviewPane.tsx          # ✅ Main live preview component
│   └── ZoomControls.tsx         # ✅ Zoom level controls
├── hooks/
│   └── usePreview.ts           # ✅ Preview state management
└── types/
    └── preview.ts              # ✅ Preview-specific types

src/hooks/
├── useKeyboardShortcuts.ts     # Global keyboard shortcuts
└── useUndoRedo.ts             # Undo/redo functionality

src/lib/store/slices/
├── previewSlice.ts             # Preview state
└── historySlice.ts             # Undo/redo state
```

## Success Criteria
1. **Functional Preview**: Live rendering of generated grid with real-time updates
2. **Responsive Testing**: Accurate device simulation across breakpoints
3. **Enhanced UX**: Keyboard shortcuts and undo/redo working seamlessly
4. **Performance**: Smooth interactions with no lag during preview updates
5. **Integration**: Seamless connection with existing code generation system

## Estimated Effort
✅ **PreviewPane & Core**: COMPLETED
✅ **Zoom Controls**: COMPLETED  
- **Keyboard Shortcuts**: 1 hour
- **Undo/Redo**: 2 hours
- **Templates**: 1-2 hours (optional)
- **Testing & Polish**: 1 hour

**Remaining**: 3-5 hours for UX enhancements