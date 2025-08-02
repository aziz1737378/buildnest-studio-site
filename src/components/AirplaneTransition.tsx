import { useState, useEffect } from "react";

interface AirplaneTransitionProps {
  isTransitioning: boolean;
  onComplete: () => void;
}

const AirplaneTransition = ({ isTransitioning, onComplete }: AirplaneTransitionProps) => {
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
        return 'translate(-50%, 100vh) scale(0.8)';
      case 'paused':
        return 'translate(-50%, -50%) scale(1)';
      case 'exiting':
        return 'translate(-50%, -100vh) scale(0.8)';
      default:
        return 'translate(-50%, 100vh) scale(0.8)';
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
          
          {/* Main airplane image */}
          <img
            src="/lovable-uploads/605636b2-16a9-4efc-9a45-b3325b374996.png"
            alt="Airplane"
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
            className="absolute left-1/2 top-1/2 w-1 h-32 bg-gradient-to-t from-sky-300/40 to-transparent blur-sm transition-all duration-500"
            style={{
              transform: `translate(-50%, ${animationPhase === 'entering' ? '60px' : '-120px'})`,
              opacity: animationPhase === 'entering' ? '0.6' : '0.4'
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 w-1 h-24 bg-gradient-to-t from-blue-300/30 to-transparent blur-md transition-all duration-700"
            style={{
              transform: `translate(-60%, ${animationPhase === 'entering' ? '80px' : '-100px'})`,
              opacity: animationPhase === 'entering' ? '0.4' : '0.3'
            }}
          />
          <div 
            className="absolute left-1/2 top-1/2 w-1 h-24 bg-gradient-to-t from-blue-300/30 to-transparent blur-md transition-all duration-700"
            style={{
              transform: `translate(60%, ${animationPhase === 'entering' ? '80px' : '-100px'})`,
              opacity: animationPhase === 'entering' ? '0.4' : '0.3'
            }}
          />
        </>
      )}
    </div>
  );
};

export default AirplaneTransition;