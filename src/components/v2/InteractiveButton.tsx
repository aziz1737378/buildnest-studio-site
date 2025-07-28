import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'tech';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  glow?: boolean;
}

export const InteractiveButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  glow = false
}: InteractiveButtonProps) => {
  const variants = {
    primary: 'btn-premium',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'btn-accent',
    tech: 'btn-tech'
  };

  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg'
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        'rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden group',
        'hover:scale-110 active:scale-95',
        glow && 'animate-glow-pulse',
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  );
};