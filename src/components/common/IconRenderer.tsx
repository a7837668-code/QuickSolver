import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  // Safe lookup from Lucide icons
  const Component = (LucideIcons as unknown as Record<string, React.FC<any>>)[name] || LucideIcons.Wrench;
  return <Component className={className} size={size} />;
};
