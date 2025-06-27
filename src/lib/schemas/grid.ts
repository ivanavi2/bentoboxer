// Zod validation schemas for grid configuration and box properties

import { z } from 'zod';

export const BoxStylingSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  borderColor: z.string().optional(),
  borderWidth: z.number().min(0).max(20).optional(),
  borderStyle: z.enum(['solid', 'dashed', 'dotted', 'none']).optional(),
  borderRadius: z.number().min(0).max(50).optional(),
  boxShadow: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().min(8).max(72).optional(),
  fontWeight: z.number().min(100).max(900).optional(),
  padding: z.number().min(0).max(100).optional(),
}).optional();

export const GridBoxSchema = z.object({
  id: z.string().min(1),
  x: z.number().min(0),
  y: z.number().min(0),
  width: z.number().min(1),
  height: z.number().min(1),
  content: z.string().optional(),
  styling: BoxStylingSchema,
});

export const GridConfigSchema = z.object({
  columns: z.number().min(1).max(20),
  rows: z.number().min(1).max(20),
  gap: z.number().min(0).max(100),
  boxes: z.array(GridBoxSchema),
  containerWidth: z.string().regex(/^\d+(px|%|rem|em)$/),
  containerHeight: z.string().regex(/^\d+(px|%|rem|em)$/),
  borderRadius: z.number().min(0).max(50),
});

export const EditorStateSchema = z.object({
  config: GridConfigSchema,
  selectedBox: z.string().nullable(),
  outputFormat: z.enum(['vanilla', 'tailwind']),
  theme: z.enum(['light', 'dark']),
});

export type BoxStyling = z.infer<typeof BoxStylingSchema>;
export type GridBox = z.infer<typeof GridBoxSchema>;
export type GridConfig = z.infer<typeof GridConfigSchema>;
export type EditorState = z.infer<typeof EditorStateSchema>;