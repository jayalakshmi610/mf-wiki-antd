import React from "react";
import { Folder } from "lucide-react";
import { useDocumentStore } from "../store/documentStore";

interface MoveDialogProps {
  onClose: () => void;
  onMove: (targetPath: string[]) => void;
}

export function MoveDialog({ onClose, onMove }: MoveDialogProps) {
  const { folders } = useDocumentStore();

  const renderFolder = (folder: any, depth = 0) => (
    <div key={folder.id} className="py-1">
      <button
        onClick={() => {
          onMove(folder.path);
          onClose();
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
        style={{ paddingLeft: `${depth * 16 + 16}px` }}
      >
        <Folder className="w-4 h-4" />
        <span>{folder.name}</span>
      </button>
      {folder.subfolders.map((subfolder: any) =>
        renderFolder(subfolder, depth + 1)
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Move to</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {folders.map((folder) => renderFolder(folder))}
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
