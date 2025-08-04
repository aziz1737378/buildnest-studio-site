import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageRevealProps {
  children: React.ReactNode;
}

const PageReveal = ({ children }: PageRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset animation on route change
    setIsVisible(false);
    
    // Trigger animation after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div 
      className={`transition-all duration-700 ease-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-[0.99]'
      }`}
    >
      {children}
    </div>
  );
};

export default PageReveal;