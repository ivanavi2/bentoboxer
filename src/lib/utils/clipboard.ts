// Custom clipboard utility as alternative to react-copy-to-clipboard for React 19 compatibility

export interface ClipboardOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  message?: string;
}

export async function copyToClipboard(
  text: string, 
  options: ClipboardOptions = {}
): Promise<boolean> {
  const { onSuccess, onError } = options;

  try {
    // Modern clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      onSuccess?.();
      return true;
    }
    
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (success) {
      onSuccess?.();
      return true;
    } else {
      throw new Error('document.execCommand("copy") failed');
    }
  } catch (error) {
    const clipboardError = error instanceof Error 
      ? error 
      : new Error('Unknown clipboard error');
    onError?.(clipboardError);
    return false;
  }
}

// Hook for using clipboard functionality in React components
export function useClipboard() {
  const copy = async (text: string, options?: ClipboardOptions) => {
    return copyToClipboard(text, options);
  };

  return { copy };
}