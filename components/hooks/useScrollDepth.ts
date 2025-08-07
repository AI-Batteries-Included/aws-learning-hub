// Epic 3D: Progress Tracking System - Scroll Depth Hook

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseScrollDepthReturn {
  scrollDepth: number;
  maxScrollDepth: number;
  resetScrollDepth: () => void;
}

export function useScrollDepth(): UseScrollDepthReturn {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [maxScrollDepth, setMaxScrollDepth] = useState(0);
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const calculateScrollDepth = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (documentHeight <= 0) return 0;
    
    const depth = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
    return Math.round(depth);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Throttle using RAF
    
    rafRef.current = requestAnimationFrame(() => {
      const currentDepth = calculateScrollDepth();
      const now = Date.now();
      
      // Only update if depth changed significantly or enough time has passed
      if (Math.abs(currentDepth - scrollDepth) >= 1 || now - lastUpdateRef.current > 1000) {
        setScrollDepth(currentDepth);
        setMaxScrollDepth(prev => Math.max(prev, currentDepth));
        lastUpdateRef.current = now;
      }
      
      rafRef.current = null;
    });
  }, [calculateScrollDepth, scrollDepth]);

  const resetScrollDepth = useCallback(() => {
    setScrollDepth(0);
    setMaxScrollDepth(0);
    lastUpdateRef.current = 0;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial calculation
    const initialDepth = calculateScrollDepth();
    setScrollDepth(initialDepth);
    setMaxScrollDepth(initialDepth);

    // Add scroll event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen to resize events as they can affect scroll depth
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, calculateScrollDepth]);

  return {
    scrollDepth,
    maxScrollDepth,
    resetScrollDepth,
  };
}