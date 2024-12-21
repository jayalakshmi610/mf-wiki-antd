import React from "react";
import { useDocumentStore } from "../store/documentStore";

interface WikiEditorProps {
  documentId: string;
  onClose: () => void;
}

export function WikiEditor({ documentId, onClose }: WikiEditorProps) {
  const document = useDocumentStore((state) =>
    state.documents.find((doc) => doc.id === documentId)
  );

  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{document.title}</h1>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Done
          </button>
        </div>
        <div className="flex-1 p-4">
          <div className="mb-4">
            <div className="prose max-w-none">
              <h1>Welcome to the Wiki Editor</h1>
              <p>This document has been converted to a wiki. You can now:</p>
              <ul>
                <li>Add internal links to other documents</li>
                <li>Create nested pages</li>
                <li>Use markdown formatting</li>
                <li>Add tables and structured content</li>
                <li>Collaborate with others in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
