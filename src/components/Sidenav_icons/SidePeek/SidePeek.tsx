import React from 'react';
import { X } from 'lucide-react';

interface SidePeekProps {
  documentTitle: string;
  onClose: () => void;
}

export function SidePeek({ documentTitle, onClose }: SidePeekProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-xl border-l border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{documentTitle}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close side peek"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <p className="text-gray-600">
          This is a preview of "{documentTitle}" in side peek mode.
        </p>
      </div>
    </div>
  );
}