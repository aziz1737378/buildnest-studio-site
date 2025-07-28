import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className = '', hover = true }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'glass-card p-8 transition-all duration-500',
        hover && 'hover-glow-v2',
        className
      )}
    >
      {children}
    </div>
  );
};