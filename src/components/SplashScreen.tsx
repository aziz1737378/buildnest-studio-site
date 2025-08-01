import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the transition after a brief pause
    const timer = setTimeout(() => {
      setIsAnimating(true);
      // Complete the splash after animation finishes
      setTimeout(onComplete, 1200);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background transition-opacity duration-500 ease-out">
      {/* Logo that will animate from center to top-left */}
      <div 
        className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isAnimating 
            ? 'top-3 left-4 w-8 h-8' 
            : 'top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2'
        }`}
      >
        <img 
          src="/favicon.png" 
          alt="Buildnest" 
          className={`w-full h-full object-contain transition-all duration-1000 ${
            isAnimating ? 'rounded-lg shadow-sm' : 'rounded-2xl'
          }`}
        />
      </div>

      {/* Company name that fades out */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 transition-all duration-800 delay-200 ${
          isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <h1 className="text-4xl font-bold text-foreground tracking-tight">Buildnest</h1>
        <p className="text-muted-foreground text-center mt-2">Premium Web Development</p>
      </div>

      {/* Loading indicator */}
      <div 
        className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-500 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_0.2s_infinite]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-[pulse_1.5s_ease-in-out_0.4s_infinite]"></div>
        </div>
      </div>

      {/* Gradient overlay for smooth transition */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background transition-opacity duration-1000 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default SplashScreen;