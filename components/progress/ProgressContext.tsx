// Epic 3D: Progress Tracking System - Progress Context Provider

'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useProgressTracking, UseProgressTrackingReturn } from '../hooks/useProgressTracking';
import { useAchievementToast } from '../hooks/useAchievementToast';
import { Achievement } from '../../utils/progressTypes';
import AchievementToast from './AchievementToast';

export interface ProgressContextValue extends UseProgressTrackingReturn {
  /** Show achievement notification */
  showAchievementNotification: (achievement: Achievement) => void;
  /** Hide all notifications */
  hideNotifications: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export interface ProgressProviderProps {
  children: React.ReactNode;
}

/**
 * Progress Provider Component
 * Provides progress tracking functionality to the entire app
 */
export function ProgressProvider({ children }: ProgressProviderProps) {
  const progressTracking = useProgressTracking();
  const { currentToast, dismissToast, triggerAchievement } = useAchievementToast();
  
  const showAchievementNotification = (achievement: Achievement) => {
    triggerAchievement(achievement);
  };

  const hideNotifications = () => {
    dismissToast();
  };

  // Auto-show achievement notifications when new ones are unlocked
  useEffect(() => {
    const newAchievements = progressTracking.getNewAchievements();
    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        showAchievementNotification(achievement);
      });
      // Clear the achievements after showing them
      progressTracking.clearNewAchievements();
    }
  }, [progressTracking.progress.achievements.length]); // Re-check when achievements change

  const contextValue: ProgressContextValue = {
    ...progressTracking,
    showAchievementNotification,
    hideNotifications,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
      {/* Achievement Toast Notifications */}
      {currentToast && (
        <AchievementToast
          achievement={currentToast}
          onDismiss={dismissToast}
          duration={5000}
        />
      )}
    </ProgressContext.Provider>
  );
}

/**
 * Hook to use progress context
 * Must be used within a ProgressProvider
 */
export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  
  return context;
}

/**
 * Hook to use progress context (optional)
 * Returns null if not within a ProgressProvider
 */
export function useProgressOptional(): ProgressContextValue | null {
  return useContext(ProgressContext);
}

/**
 * Higher-order component for components that need progress tracking
 */
export function withProgress<P extends object>(
  Component: React.ComponentType<P & { progress: ProgressContextValue }>
) {
  const WithProgressComponent = (props: P) => {
    const progress = useProgress();
    
    return <Component {...props} progress={progress} />;
  };
  
  WithProgressComponent.displayName = `withProgress(${Component.displayName || Component.name})`;
  
  return WithProgressComponent;
}

/**
 * Hook for page-level progress tracking
 * Automatically tracks page visits and provides page-specific functionality
 */
export function usePageProgress(pageId: string, path: string, title: string) {
  const { visitPage, getPageProgress, updatePageProgress, markPageComplete } = useProgress();
  
  // Auto-visit page on mount
  useEffect(() => {
    visitPage(pageId, path, title);
  }, [pageId, path, title, visitPage]);
  
  const pageProgress = getPageProgress(pageId);
  
  return {
    pageProgress,
    updateProgress: (updates: {
      timeSpent?: number;
      scrollDepth?: number;
      completed?: boolean;
      inProgress?: boolean;
    }) => updatePageProgress(pageId, updates),
    markComplete: () => markPageComplete(pageId),
    isCompleted: pageProgress?.completed || false,
    isInProgress: pageProgress?.inProgress || false,
    visitCount: pageProgress?.visitCount || 0,
    timeSpent: pageProgress?.timeSpent || 0,
    maxScrollDepth: pageProgress?.maxScrollDepth || 0,
  };
}

/**
 * Hook for section-level progress tracking
 */
export function useSectionProgress(sectionId: string) {
  const { progress } = useProgress();
  const sectionProgress = progress.sections[sectionId];
  
  return {
    sectionProgress,
    completionPercentage: sectionProgress?.completionPercentage || 0,
    completedCount: sectionProgress?.completedCount || 0,
    totalCount: sectionProgress?.totalCount || 0,
    isCompleted: (sectionProgress?.completionPercentage || 0) >= 100,
    averageTimePerPage: sectionProgress?.averageTimePerPage || 0,
  };
}

/**
 * Hook for overall progress statistics
 */
export function useOverallProgress() {
  const { progress } = useProgress();
  const { stats } = progress;
  
  return {
    overallCompletion: stats.overallCompletion,
    pagesCompleted: stats.pagesCompleted,
    totalPages: stats.totalPages,
    totalTimeInvested: stats.totalTimeInvested,
    averageTimePerPage: stats.averageTimePerPage,
    learningStreak: stats.learningStreak,
    startDate: stats.startDate,
    estimatedCompletionDate: stats.estimatedCompletionDate,
    strongestAreas: stats.strongestAreas,
    lastActivity: stats.lastActivity,
  };
}

/**
 * Hook for achievement tracking
 */
export function useAchievements() {
  const { progress, getNewAchievements, clearNewAchievements } = useProgress();
  
  const unlockedAchievements = progress.achievements.filter(a => a.unlocked);
  const totalAchievements = progress.achievements.length;
  const achievementProgress = totalAchievements > 0 
    ? Math.round((unlockedAchievements.length / totalAchievements) * 100)
    : 0;
  
  return {
    achievements: progress.achievements,
    unlockedAchievements,
    newAchievements: getNewAchievements(),
    clearNewAchievements,
    totalAchievements,
    achievementProgress,
    recentAchievements: unlockedAchievements
      .filter(a => a.unlockedAt)
      .sort((a, b) => b.unlockedAt!.getTime() - a.unlockedAt!.getTime())
      .slice(0, 5),
  };
}