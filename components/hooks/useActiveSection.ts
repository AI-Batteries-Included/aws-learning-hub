'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useActiveSection<T extends HTMLElement = HTMLElement>(
  options: UseActiveSectionOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.5, // 50% of element must be visible to be considered "active"
    rootMargin = '-20% 0px -20% 0px' // Only center 60% of viewport triggers active state
  } = options;

  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Section is active when it's intersecting and has significant visibility
        const shouldBeActive = entry.isIntersecting && entry.intersectionRatio >= threshold;
        setIsActive(shouldBeActive);
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isActive];
}

// Hook for managing multiple sections and ensuring only one is active at a time
export function useActiveSectionManager(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observers: IntersectionObserver[] = [];
    const activeSections = new Set<string>();

    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          
          if (isIntersecting) {
            activeSections.add(sectionId);
          } else {
            activeSections.delete(sectionId);
          }

          // Set the topmost visible section as active
          if (activeSections.size > 0) {
            const sortedSections = sectionIds.filter(id => activeSections.has(id));
            setActiveSection(sortedSections[0]);
          } else {
            setActiveSection(null);
          }
        },
        {
          threshold: 0.5,
          rootMargin: '-10% 0px -10% 0px'
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}