import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  shortcut?: string;
  textColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

export function MenuItem({ 
  icon: Icon, 
  text, 
  shortcut, 
  textColor = 'text-gray-700',
  iconColor = 'text-gray-600',
  onClick 
}: MenuItemProps) {
  return (
    <button
      className="w-full px-4 py-1.5 hover:bg-gray-100 flex items-center gap-2 transition-colors"
      onClick={onClick}
    >
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span className={`flex-1 text-left text-sm ${textColor}`}>{text}</span>
      {shortcut && (
        <span className="text-xs text-gray-400">{shortcut}</span>
      )}
    </button>
  );
}