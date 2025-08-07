// Epic 3D: Progress Tracking System - Time Tracking Hook

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTimeTrackingOptions {
  /** Update interval in milliseconds (default: 1000) */
  updateInterval?: number;
  /** Whether to pause tracking when tab is not visible (default: true) */
  pauseWhenHidden?: boolean;
  /** Whether to track time only when user is active (default: true) */
  trackOnlyWhenActive?: boolean;
}

export interface UseTimeTrackingReturn {
  /** Total time spent in milliseconds */
  timeSpent: number;
  /** Whether tracking is currently active */
  isTracking: boolean;
  /** Start tracking time */
  startTracking: () => void;
  /** Pause tracking time */
  pauseTracking: () => void;
  /** Resume tracking time */
  resumeTracking: () => void;
  /** Reset time to zero */
  resetTime: () => void;
  /** Get formatted time string */
  getFormattedTime: () => string;
}

export function useTimeTracking(options: UseTimeTrackingOptions = {}): UseTimeTrackingReturn {
  const {
    updateInterval = 1000,
    pauseWhenHidden = true,
    trackOnlyWhenActive = true,
  } = options;

  const [timeSpent, setTimeSpent] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastActiveTimeRef = useRef<number>(Date.now());
  const accumulatedTimeRef = useRef<number>(0);

  // Activity tracking
  const updateActivityTime = useCallback(() => {
    lastActiveTimeRef.current = Date.now();
  }, []);

  // Check if user is considered active
  const isUserActive = useCallback(() => {
    if (!trackOnlyWhenActive) return true;
    const timeSinceActivity = Date.now() - lastActiveTimeRef.current;
    return timeSinceActivity < 30000; // Consider inactive after 30 seconds
  }, [trackOnlyWhenActive]);

  // Check if page is visible
  const isPageVisible = useCallback(() => {
    if (!pauseWhenHidden || typeof document === 'undefined') return true;
    return !document.hidden;
  }, [pauseWhenHidden]);

  // Should tracking continue?
  const shouldTrack = useCallback(() => {
    return isTracking && isPageVisible() && isUserActive();
  }, [isTracking, isPageVisible, isUserActive]);

  // Update time function
  const updateTime = useCallback(() => {
    if (!shouldTrack() || startTimeRef.current === null) return;

    const now = Date.now();
    const sessionTime = now - startTimeRef.current;
    const newTotalTime = accumulatedTimeRef.current + sessionTime;
    
    setTimeSpent(newTotalTime);
  }, [shouldTrack]);

  // Start tracking
  const startTracking = useCallback(() => {
    if (isTracking) return;
    
    setIsTracking(true);
    startTimeRef.current = Date.now();
    lastActiveTimeRef.current = Date.now();
  }, [isTracking]);

  // Pause tracking
  const pauseTracking = useCallback(() => {
    if (!isTracking || startTimeRef.current === null) return;
    
    const now = Date.now();
    const sessionTime = now - startTimeRef.current;
    accumulatedTimeRef.current += sessionTime;
    
    setIsTracking(false);
    startTimeRef.current = null;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isTracking]);

  // Resume tracking
  const resumeTracking = useCallback(() => {
    if (isTracking) return;
    
    setIsTracking(true);
    startTimeRef.current = Date.now();
    lastActiveTimeRef.current = Date.now();
  }, [isTracking]);

  // Reset time
  const resetTime = useCallback(() => {
    setTimeSpent(0);
    accumulatedTimeRef.current = 0;
    startTimeRef.current = isTracking ? Date.now() : null;
  }, [isTracking]);

  // Format time for display
  const getFormattedTime = useCallback(() => {
    const totalSeconds = Math.floor(timeSpent / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }, [timeSpent]);

  // Set up tracking interval
  useEffect(() => {
    if (!isTracking) return;

    intervalRef.current = setInterval(() => {
      updateTime();
    }, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTracking, updateTime, updateInterval]);

  // Handle visibility changes
  useEffect(() => {
    if (!pauseWhenHidden || typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isTracking && startTimeRef.current) {
          // Save accumulated time before pausing
          const now = Date.now();
          const sessionTime = now - startTimeRef.current;
          accumulatedTimeRef.current += sessionTime;
          startTimeRef.current = null;
        }
      } else {
        if (isTracking) {
          // Resume tracking
          startTimeRef.current = Date.now();
          lastActiveTimeRef.current = Date.now();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseWhenHidden, isTracking]);

  // Track user activity
  useEffect(() => {
    if (!trackOnlyWhenActive || typeof window === 'undefined') return;

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, updateActivityTime, { passive: true });
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateActivityTime);
      });
    };
  }, [trackOnlyWhenActive, updateActivityTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-start tracking when hook is first used
  useEffect(() => {
    if (!isTracking) {
      startTracking();
    }
  }, []); // Only run once on mount

  return {
    timeSpent,
    isTracking,
    startTracking,
    pauseTracking,
    resumeTracking,
    resetTime,
    getFormattedTime,
  };
}