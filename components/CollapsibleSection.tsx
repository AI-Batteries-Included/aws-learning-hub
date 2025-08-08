'use client';

import { useState, useCallback } from 'react';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useActiveSection } from './hooks/useActiveSection';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  background?: 'white' | 'light' | 'gradient-1' | 'gradient-2' | 'gradient-3' | 'gradient-4';
  highlightColor?: 'blue' | 'purple' | 'green' | 'orange';
  enableCollapse?: boolean;
  // Auto-collapse props
  autoCollapseExpanded?: boolean;
  onAutoCollapseToggle?: (expanded: boolean) => void;
}

export default function CollapsibleSection({
  id,
  title,
  subtitle,
  children,
  defaultExpanded = true,
  animation = 'fade-up',
  delay = 0,
  background = 'white',
  highlightColor = 'blue',
  enableCollapse = false,
  autoCollapseExpanded,
  onAutoCollapseToggle
}: CollapsibleSectionProps) {
  const [manualExpanded, setManualExpanded] = useState(defaultExpanded);
  
  // Use auto-collapse state if provided, otherwise fall back to manual state
  const isExpanded = autoCollapseExpanded !== undefined ? autoCollapseExpanded : manualExpanded;
  const [ref, isVisible] = useScrollAnimation<HTMLElement>({
    threshold: 0.15,
    triggerOnce: true
  });
  const [activeRef, isActive] = useActiveSection<HTMLElement>({
    threshold: 0.4,
    rootMargin: '-20% 0px -30% 0px'
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

  const toggleExpansion = () => {
    if (enableCollapse) {
      const newExpanded = !isExpanded;
      
      // If using auto-collapse, notify parent
      if (onAutoCollapseToggle) {
        onAutoCollapseToggle(newExpanded);
      } else {
        // Otherwise use manual state
        setManualExpanded(newExpanded);
      }
    }
  };

  // Combine refs for both animations using callback ref
  const combinedRef = useCallback((element: HTMLElement | null) => {
    // Set both refs to the same element
    if (ref && 'current' in ref) {
      ref.current = element;
    }
    if (activeRef && 'current' in activeRef) {
      activeRef.current = element;
    }
  }, [ref, activeRef]);

  const sectionClasses = [
    animationClass,
    backgroundClasses[background],
    'collapsible-section',
    isActive ? 'section-active' : 'section-inactive',
    `highlight-${highlightColor}`,
  ].filter(Boolean).join(' ');

  return (
    <section
      ref={combinedRef}
      id={id}
      className={sectionClasses}
      style={delayStyle}
    >
      <div className="container">
        <div 
          className={`section-header ${enableCollapse ? 'clickable' : 'static'}`}
          onClick={toggleExpansion}
          role={enableCollapse ? "button" : undefined}
          tabIndex={enableCollapse ? 0 : undefined}
          onKeyDown={enableCollapse ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpansion();
            }
          } : undefined}
        >
          <div className="section-header-content">
            <h2 className="section-title">{title}</h2>
            {subtitle && <h3 className="section-subtitle">{subtitle}</h3>}
          </div>
          {enableCollapse && (
            <div className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M6 9L12 15L18 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        
        <div className={`section-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="content-wrapper">
            <div className="content-vertical">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}