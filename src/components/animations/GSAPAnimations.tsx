import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: 'scroll' | 'load';
}

export const AnimatedElement = ({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 1,
  className = '',
  trigger = 'scroll'
}: AnimatedElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial state
    gsap.set(element, getInitialState(animation));

    if (trigger === 'scroll') {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(element, {
            ...getFinalState(animation),
            duration,
            delay,
            ease: 'power3.out',
          });
        },
      });
    } else {
      gsap.to(element, {
        ...getFinalState(animation),
        duration,
        delay,
        ease: 'power3.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

const getInitialState = (animation: string) => {
  switch (animation) {
    case 'fadeIn':
      return { opacity: 0 };
    case 'slideUp':
      return { opacity: 0, y: 60 };
    case 'slideLeft':
      return { opacity: 0, x: -60 };
    case 'slideRight':
      return { opacity: 0, x: 60 };
    case 'scale':
      return { opacity: 0, scale: 0.8 };
    case 'rotate':
      return { opacity: 0, rotation: 45, scale: 0.8 };
    default:
      return { opacity: 0 };
  }
};

const getFinalState = (animation: string) => {
  switch (animation) {
    case 'fadeIn':
      return { opacity: 1 };
    case 'slideUp':
      return { opacity: 1, y: 0 };
    case 'slideLeft':
      return { opacity: 1, x: 0 };
    case 'slideRight':
      return { opacity: 1, x: 0 };
    case 'scale':
      return { opacity: 1, scale: 1 };
    case 'rotate':
      return { opacity: 1, rotation: 0, scale: 1 };
    default:
      return { opacity: 1 };
  }
};

// Stagger animation component
interface StaggeredAnimationProps {
  children: React.ReactNode;
  stagger?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  className?: string;
}

export const StaggeredAnimation = ({ 
  children, 
  stagger = 0.1, 
  animation = 'slideUp',
  className = ''
}: StaggeredAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    
    // Set initial state for all children
    gsap.set(elements, getInitialState(animation));

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          ...getFinalState(animation),
          duration: 0.8,
          stagger,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stagger, animation]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Parallax component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Text reveal animation
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ children, className = '', delay = 0 }: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const chars = children.split('');
    
    text.innerHTML = chars
      .map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const spans = text.querySelectorAll('span');
    
    gsap.set(spans, { y: 100, opacity: 0 });

    ScrollTrigger.create({
      trigger: text,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, delay]);

  return <div ref={textRef} className={className} />;
};