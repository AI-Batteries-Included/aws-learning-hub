// Epic 3D: Progress Tracking System - Achievement Toast Component

'use client';

import React, { useState, useEffect } from 'react';
import { Achievement } from '../../utils/progressTypes';

export interface AchievementToastProps {
  achievement: Achievement;
  onDismiss: () => void;
  duration?: number;
}

export function AchievementToast({ 
  achievement, 
  onDismiss, 
  duration = 5000 
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss after duration
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onDismiss();
    }, 300); // Match animation duration
  };

  return (
    <div 
      className={`achievement-toast fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        isVisible && !isDismissing 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm mx-auto border border-yellow-300">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <span className="text-2xl" role="img" aria-hidden="true">
              {achievement.icon}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold text-white">
                Achievement Unlocked!
              </h4>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 ml-2 text-yellow-100 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Dismiss achievement notification"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="text-yellow-100">
              <p className="font-medium text-sm mb-1">{achievement.title}</p>
              <p className="text-xs opacity-90">{achievement.description}</p>
            </div>
          </div>
        </div>
        
        {/* Progress bar for auto-dismiss */}
        <div className="mt-3 w-full bg-yellow-300/20 rounded-full h-1 overflow-hidden">
          <div 
            className="bg-yellow-200 h-full rounded-full transition-all duration-linear"
            style={{ 
              width: isDismissing ? '0%' : '100%',
              transitionDuration: isDismissing ? '300ms' : `${duration}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AchievementToast;