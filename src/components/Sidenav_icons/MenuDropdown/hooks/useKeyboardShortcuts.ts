import { useEffect } from 'react';

interface ShortcutHandlers {
  onDuplicate: () => void;
  onRename: () => void;
  onMoveTo: () => void;
  onOpenNewTab: () => void;
}

export function useKeyboardShortcuts({
  onDuplicate,
  onRename,
  onMoveTo,
  onOpenNewTab,
}: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Duplicate: Ctrl+D
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        onDuplicate();
      }
      // Rename: Ctrl+Shift+R
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        onRename();
      }
      // Move to: Ctrl+Shift+P
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        onMoveTo();
      }
      // Open in new tab: Ctrl+Shift+Enter
      if (e.ctrlKey && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        onOpenNewTab();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onDuplicate, onRename, onMoveTo, onOpenNewTab]);
}