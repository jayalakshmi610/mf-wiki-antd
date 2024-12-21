import React from 'react';

interface MenuSectionProps {
  children: React.ReactNode;
}

export function MenuSection({ children }: MenuSectionProps) {
  return (
    <div className="py-1 border-b border-gray-200 last:border-b-0">
      {children}
    </div>
  );
}