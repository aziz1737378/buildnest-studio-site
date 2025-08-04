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

// Enhanced scroll animation presets
const animationPresets = {
  'fade-in': 'opacity-0 translate-y-8',
  'fade-in-up': 'opacity-0 translate-y-12',
  'fade-in-down': 'opacity-0 -translate-y-12',
  'slide-in-left': 'opacity-0 -translate-x-16',
  'slide-in-right': 'opacity-0 translate-x-16',
  'scale-in': 'opacity-0 scale-90',
  'scale-in-lg': 'opacity-0 scale-75',
  'zoom-in': 'opacity-0 scale-125',
  'flip-in': 'opacity-0 rotateY-90',
  'bounce-in': 'opacity-0 scale-95 translate-y-4',
  'slide-up': 'opacity-0 translate-y-16',
  'slide-down': 'opacity-0 -translate-y-16',
  'rotate-in': 'opacity-0 rotate-12 scale-95',
  'blur-in': 'opacity-0 blur-sm',
  'elastic-in': 'opacity-0 scale-50 translate-y-8'
};

// Higher-order component for scroll animations
export const ScrollAnimatedDiv = ({ 
  children, 
  animation = 'fade-in',
  className = '',
  duration = 'duration-700',
  easing = 'ease-out',
  ...options 
}: {
  children: React.ReactNode;
  animation?: keyof typeof animationPresets | string;
  className?: string;
  duration?: string;
  easing?: string;
} & UseScrollAnimationOptions) => {
  const { elementRef, isVisible } = useScrollAnimation(options);
  
  const initialClasses = animationPresets[animation as keyof typeof animationPresets] || 'opacity-0 translate-y-8';
  const visibleClasses = 'opacity-100 translate-y-0 scale-100 translate-x-0 rotate-0 blur-0';

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all ${duration} ${easing} transform-gpu will-change-transform ${
        isVisible ? visibleClasses : initialClasses
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