import { useState, useEffect } from "react";

interface TransitionProps {
  isTransitioning: boolean;
  onComplete: () => void;
}

const PageTransition = ({ isTransitioning, onComplete }: TransitionProps) => {
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'paused' | 'exiting' | 'hidden'>('hidden');

  useEffect(() => {
    if (isTransitioning) {
      setAnimationPhase('entering');
      
      // Enter phase: airplane comes from bottom
      const enterTimer = setTimeout(() => {
        setAnimationPhase('paused');
        
        // Pause phase: brief pause in center
        const pauseTimer = setTimeout(() => {
          setAnimationPhase('exiting');
          
          // Exit phase: airplane flies to top
          const exitTimer = setTimeout(() => {
            setAnimationPhase('hidden');
            onComplete();
          }, 800);
          
          return () => clearTimeout(exitTimer);
        }, 600);
        
        return () => clearTimeout(pauseTimer);
      }, 800);
      
      return () => clearTimeout(enterTimer);
    }
  }, [isTransitioning, onComplete]);

  if (!isTransitioning && animationPhase === 'hidden') return null;

  const getTransformStyle = () => {
    switch (animationPhase) {
      case 'entering':
        return 'translate(-100vw, 50vh) scale(0.6) rotate(-15deg)';
      case 'paused':
        return 'translate(-50%, -50%) scale(0.8) rotate(0deg)';
      case 'exiting':
        return 'translate(100vw, -50vh) scale(0.6) rotate(15deg)';
      default:
        return 'translate(-100vw, 50vh) scale(0.6) rotate(-15deg)';
    }
  };

  const getOpacity = () => {
    return animationPhase === 'paused' ? '1' : '0.9';
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* Backdrop with subtle gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-sky-50/20 to-blue-100/20 transition-opacity duration-500 ${
          animationPhase === 'paused' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Airplane */}
      <div
        className="absolute left-1/2 top-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{
          transform: getTransformStyle(),
          opacity: getOpacity(),
        }}
      >
        <div className="relative">
          {/* Soft shadow underneath */}
          <div 
            className={`absolute inset-0 bg-black/10 blur-xl transition-all duration-700 ${
              animationPhase === 'paused' ? 'scale-110 opacity-30' : 'scale-100 opacity-20'
            }`}
            style={{ transform: 'translateY(20px)' }}
          />
          
          {/* Main rocket image */}
          <img
            src="/lovable-uploads/e5065f51-9624-4bce-94ff-c9298c10edeb.png"
            alt="Rocket Launch"
            className={`w-64 md:w-80 lg:w-96 h-auto object-contain transition-all duration-700 ${
              animationPhase === 'paused' ? 'drop-shadow-2xl' : 'drop-shadow-lg'
            }`}
            style={{
              filter: `brightness(${animationPhase === 'paused' ? '1.05' : '1'}) contrast(${animationPhase === 'paused' ? '1.1' : '1'})`
            }}
          />
          
          {/* Subtle glow effect */}
          <div 
            className={`absolute inset-0 bg-white/20 blur-2xl transition-opacity duration-700 ${
              animationPhase === 'paused' ? 'opacity-40' : 'opacity-0'
            }`}
          />
        </div>
      </div>
      
      {/* Motion trails for extra effect during movement */}
      {(animationPhase === 'entering' || animationPhase === 'exiting') && (
        <>
          <div 
            className="absolute left-1/2 top-1/2 w-2 h-40 bg-gradient-to-t from-orange-400/50 to-transparent blur-sm transition-all duration-500"
            style={{
              transform: `translate(${animationPhase === 'entering' ? '-150px, 80px' : '150px, -80px'})`,
              opacity: animationPhase === 'entering' ? '0.7' : '0.5'
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 w-1 h-32 bg-gradient-to-t from-red-400/40 to-transparent blur-md transition-all duration-700"
            style={{
              transform: `translate(${animationPhase === 'entering' ? '-120px, 100px' : '120px, -60px'})`,
              opacity: animationPhase === 'entering' ? '0.5' : '0.4'
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 w-1 h-28 bg-gradient-to-t from-yellow-400/35 to-transparent blur-lg transition-all duration-700"
            style={{
              transform: `translate(${animationPhase === 'entering' ? '-80px, 120px' : '80px, -40px'})`,
              opacity: animationPhase === 'entering' ? '0.4' : '0.3'
            }}
          />
        </>
      )}
    </div>
  );
};

export default PageTransition;