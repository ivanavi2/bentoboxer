// React context provider for toast notifications using Sonner

'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-background)',
          color: 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
        },
      }}
    />
  );
}