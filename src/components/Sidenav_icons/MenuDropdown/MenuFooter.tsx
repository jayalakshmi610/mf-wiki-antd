import React from "react";
import { formatDistanceToNow } from "date-fns";

interface MenuFooterProps {
  editor: string;
  lastEditedAt?: Date;
}

export function MenuFooter({ editor, lastEditedAt }: MenuFooterProps) {
  const getLastEditedText = () => {
    if (!lastEditedAt) return "Just now";
    return formatDistanceToNow(lastEditedAt, { addSuffix: true });
  };

  return (
    <div className="px-4 py-2 border-t border-gray-200">
      <div className="text-xs text-gray-500">
        <p className="mb-1">Last edited by {editor}</p>
        <p>{getLastEditedText()}</p>
      </div>
    </div>
  );
}
