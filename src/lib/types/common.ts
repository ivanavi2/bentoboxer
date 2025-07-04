// Common type definitions shared across the application

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export interface ExportOptions {
  format: 'html' | 'css' | 'tailwind';
  minified: boolean;
  includeComments: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type OutputFormat = 'vanilla' | 'tailwind';
export type ViewMode = 'home' | 'editor';
export type EditorViewMode = 'edit' | 'preview' | 'code';