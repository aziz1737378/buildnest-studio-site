import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'enter' | 'shrink' | 'exit'>('enter');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('shrink'), 1500);
    const timer2 = setTimeout(() => setPhase('exit'), 2800);
    const timer3 = setTimeout(() => onComplete(), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-all duration-700 ease-in-out ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div 
        className={`transition-all duration-1000 ease-out ${
          phase === 'enter' 
            ? 'w-32 h-32 opacity-0 scale-50' 
            : phase === 'shrink' 
            ? 'w-20 h-20 opacity-100 scale-100 fixed top-4 left-4 z-[10000]' 
            : 'w-16 h-16 opacity-100 scale-100 fixed top-4 left-4 z-[10000]'
        }`}
        style={{
          transform: phase === 'enter' 
            ? 'translate(0, 0) scale(0.5)' 
            : phase === 'shrink' 
            ? 'translate(-50vw, -50vh) scale(0.6)' 
            : 'translate(-50vw, -50vh) scale(0.5)'
        }}
      >
        <img 
          src="/favicon.png" 
          alt="Buildnest Logo" 
          className={`w-full h-full object-contain transition-all duration-1000 ease-out ${
            phase === 'enter' ? 'animate-scale-in' : ''
          }`}
        />
      </div>
      
      {/* Elegant background animation */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 transition-opacity duration-1000 ${
          phase === 'shrink' ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default SplashScreen;