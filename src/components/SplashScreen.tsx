import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'enter' | 'shrink' | 'exit'>('enter');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('shrink'), 2000);
    const timer2 = setTimeout(() => setPhase('exit'), 3000);
    const timer3 = setTimeout(() => onComplete(), 3300);

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
            ? 'w-48 h-48 opacity-100 scale-100' 
            : phase === 'shrink' 
            ? 'w-16 h-16 opacity-100 scale-100 fixed top-4 left-4 z-[10000]' 
            : 'w-14 h-14 opacity-100 scale-100 fixed top-4 left-4 z-[10000]'
        }`}
        style={{
          transform: phase === 'enter' 
            ? 'translate(0, 0) scale(1)' 
            : phase === 'shrink' 
            ? 'translate(-50vw, -50vh) scale(0.7)' 
            : 'translate(-50vw, -50vh) scale(0.6)'
        }}
      >
        <img 
          src="/favicon.png" 
          alt="Buildnest Logo" 
          className="w-full h-full object-contain transition-all duration-1000 ease-out"
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