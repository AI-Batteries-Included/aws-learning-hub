// Epic 3D: Progress Tracking System - Achievement Toast Hook

'use client';

import { useState, useCallback, useRef } from 'react';
import { Achievement } from '../../utils/progressTypes';

export interface UseAchievementToastReturn {
  /** Current toast being displayed */
  currentToast: Achievement | null;
  /** Dismiss the current toast */
  dismissToast: () => void;
  /** Trigger a new achievement toast */
  triggerAchievement: (achievement: Achievement) => void;
  /** Clear all queued achievements */
  clearQueue: () => void;
  /** Number of achievements in queue */
  queueLength: number;
}

export function useAchievementToast(): UseAchievementToastReturn {
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [queue, setQueue] = useState<Achievement[]>([]);
  const showSessionRef = useRef<Set<string>>(new Set()); // Track shown achievements in session
  const processingRef = useRef(false);

  const processQueue = useCallback(() => {
    if (processingRef.current || currentToast) return;
    
    setQueue(prevQueue => {
      if (prevQueue.length === 0) return prevQueue;
      
      const [nextAchievement, ...remainingQueue] = prevQueue;
      setCurrentToast(nextAchievement);
      processingRef.current = true;
      
      return remainingQueue;
    });
  }, [currentToast]);

  const dismissToast = useCallback(() => {
    setCurrentToast(null);
    processingRef.current = false;
    
    // Process next toast in queue after a brief delay
    setTimeout(() => {
      processQueue();
    }, 500);
  }, [processQueue]);

  const triggerAchievement = useCallback((achievement: Achievement) => {
    // Don't show same achievement twice in the session
    if (showSessionRef.current.has(achievement.id)) {
      return;
    }
    
    // Mark as shown in this session
    showSessionRef.current.add(achievement.id);
    
    // If no toast is currently showing, show immediately
    if (!currentToast && !processingRef.current) {
      setCurrentToast(achievement);
      processingRef.current = true;
    } else {
      // Add to queue
      setQueue(prevQueue => {
        // Avoid duplicates in queue
        if (prevQueue.some(a => a.id === achievement.id)) {
          return prevQueue;
        }
        return [...prevQueue, achievement];
      });
    }
  }, [currentToast]);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentToast(null);
    processingRef.current = false;
  }, []);

  return {
    currentToast,
    dismissToast,
    triggerAchievement,
    clearQueue,
    queueLength: queue.length,
  };
}