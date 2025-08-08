'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  background?: 'white' | 'light' | 'gradient-1' | 'gradient-2' | 'gradient-3' | 'gradient-4';
}

export default function ScrollSection({
  children,
  id,
  className = '',
  animation = 'fade-up',
  delay = 0,
  background = 'white'
}: ScrollSectionProps) {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({
    threshold: 0.15,
    triggerOnce: true
  });

  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    'gradient-1': 'bg-gradient-to-br from-blue-50 to-indigo-100',
    'gradient-2': 'bg-gradient-to-br from-purple-50 to-pink-100',
    'gradient-3': 'bg-gradient-to-br from-green-50 to-teal-100',
    'gradient-4': 'bg-gradient-to-br from-orange-50 to-red-100'
  };

  const animationClass = `scroll-section ${animation} ${isVisible ? 'visible' : ''}`;
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <section
      ref={ref}
      id={id}
      className={`${animationClass} ${backgroundClasses[background]} ${className}`}
      style={delayStyle}
    >
      {children}
    </section>
  );
}