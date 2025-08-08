'use client';

import { useEffect, useState, useCallback } from 'react';

interface AutoCollapseOptions {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useAutoCollapseManager({
  sectionIds,
  threshold = 0.3,
  rootMargin = '-10% 0px -10% 0px',
  enabled = true
}: AutoCollapseOptions) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sectionIds) // Start with all sections expanded
  );
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Track which sections should be expanded based on current active section
  const updateExpandedSections = useCallback((newActiveSectionId: string | null) => {
    if (!enabled || !newActiveSectionId) return;

    // Add a small delay to prevent abrupt changes during scrolling
    setTimeout(() => {
      setExpandedSections(() => {
        const newExpanded = new Set<string>();
        
        // Always keep the active section expanded
        newExpanded.add(newActiveSectionId);
        
        // Mark the active section as visited
        setVisitedSections(prevVisited => new Set(prevVisited).add(newActiveSectionId));
        
        return newExpanded;
      });
    }, 150); // Small delay to smooth out transitions
  }, [enabled]);

  // Re-expand sections when they become active again (revisited)
  const handleSectionRevisit = useCallback((sectionId: string) => {
    setExpandedSections(prev => new Set(prev).add(sectionId));
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];
    const sectionVisibility = new Map<string, boolean>();

    sectionIds.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio >= threshold;
          sectionVisibility.set(sectionId, isVisible);

          // Find the most prominent visible section (first visible section in order)
          let newActiveSectionId: string | null = null;
          for (const id of sectionIds) {
            if (sectionVisibility.get(id)) {
              newActiveSectionId = id;
              break;
            }
          }

          // Only update if the active section has actually changed
          setActiveSectionId(currentActive => {
            if (currentActive !== newActiveSectionId) {
              updateExpandedSections(newActiveSectionId);
              
              // If revisiting a previously visited section, expand it
              if (newActiveSectionId && visitedSections.has(newActiveSectionId)) {
                handleSectionRevisit(newActiveSectionId);
              }
              
              return newActiveSectionId;
            }
            return currentActive;
          });
        },
        {
          threshold,
          rootMargin
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, threshold, rootMargin, enabled, updateExpandedSections, visitedSections, handleSectionRevisit]);

  // Function to check if a section should be expanded
  const isSectionExpanded = useCallback((sectionId: string) => {
    return expandedSections.has(sectionId);
  }, [expandedSections]);

  // Simplified - no focus buffer state needed
  const getSectionFocusState = useCallback(() => {
    return 'normal';
  }, []);

  // Function to manually expand a section (for user interaction)
  const expandSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => new Set(prev).add(sectionId));
  }, []);

  // Function to manually collapse a section
  const collapseSection = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  }, []);

  return {
    activeSectionId,
    isSectionExpanded,
    getSectionFocusState,
    expandSection,
    collapseSection,
    visitedSections: Array.from(visitedSections)
  };
}