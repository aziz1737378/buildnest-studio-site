import React, { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, delay = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { elementRef, isVisible };
};

// Higher-order component for scroll animations
export const ScrollAnimatedDiv = ({ 
  children, 
  animation = 'fade-in',
  className = '',
  duration = 'duration-700',
  ...options 
}: {
  children: React.ReactNode;
  animation?: string;
  className?: string;
  duration?: string;
} & UseScrollAnimationOptions) => {
  const { elementRef, isVisible } = useScrollAnimation(options);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all ${duration} ease-out ${
        isVisible 
          ? `animate-${animation} opacity-100 translate-y-0 scale-100` 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

// Staggered animation wrapper for multiple elements
export const StaggeredContainer = ({ 
  children, 
  delay = 100,
  ...options 
}: {
  children: React.ReactNode;
  delay?: number;
} & UseScrollAnimationOptions) => {
  const { elementRef, isVisible } = useScrollAnimation(options);

  return (
    <div ref={elementRef}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{ 
            transitionDelay: isVisible ? `${index * delay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};