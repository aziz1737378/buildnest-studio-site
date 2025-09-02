import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  delay = 0 
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      className={cn(
        // Base glass card styles
        'relative overflow-hidden rounded-2xl backdrop-blur-xl',
        'bg-gradient-to-br from-white/10 to-white/5',
        'border border-white/20 shadow-2xl',
        
        // Enhanced shadows
        hover && 'hover:shadow-3xl hover:shadow-primary/10',
        
        // Glow effect
        glow && 'shadow-[0_0_40px_rgba(41,121,255,0.15)]',
        
        // Smooth transitions
        'transition-all duration-500 ease-out',
        
        className
      )}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-transparent">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black/5 to-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
      
      {/* Hover glow overlay */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default GlassCard;