// Epic 3D: Progress Tracking System - Main Progress Hook

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  UserProgress, 
  PageProgress,
  DEFAULT_USER_PROGRESS,
  Achievement,
} from '../../utils/progressTypes';
import { 
  loadProgress,
  clearProgress, 
  debouncedSave,
  addStorageEventListener,
  exportProgress,
  importProgress,
  ProgressExport,
} from '../../utils/progressStorage';
import { 
  updateProgressStats, 
  checkAchievements, 
  createPageProgress, 
  updatePageProgress,
  calculateAllSectionProgress,
  getRecommendedPages,
} from '../../utils/progressCalculations';

export interface UseProgressTrackingReturn {
  // Core progress data
  progress: UserProgress;
  isLoading: boolean;
  
  // Page tracking functions
  visitPage: (pageId: string, path: string, title: string) => void;
  updatePageProgress: (pageId: string, updates: {
    timeSpent?: number;
    scrollDepth?: number;
    completed?: boolean;
    inProgress?: boolean;
  }) => void;
  markPageComplete: (pageId: string) => void;
  getPageProgress: (pageId: string) => PageProgress | null;
  
  // Achievement functions
  getNewAchievements: () => Achievement[];
  clearNewAchievements: () => void;
  
  // Recommendations
  getRecommendations: (currentPageId?: string) => Array<{
    pageId: string;
    path: string;
    title: string;
    reason: string;
  }>;
  
  // Data management
  resetProgress: () => void;
  resetSection: (sectionId: string) => void;
  exportData: () => ProgressExport | null;
  importData: (data: ProgressExport) => boolean;
  
  // Utility functions
  refreshProgress: () => void;
}

export function useProgressTracking(): UseProgressTrackingReturn {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  
  // Refs to track internal state
  const currentProgressRef = useRef<UserProgress>(DEFAULT_USER_PROGRESS);
  const storageListenerRef = useRef<(() => void) | null>(null);
  
  // Load initial progress data
  useEffect(() => {
    const loadInitialProgress = async () => {
      try {
        const loadedProgress = loadProgress();
        setProgress(loadedProgress);
        currentProgressRef.current = loadedProgress;
      } catch (error) {
        console.error('Failed to load initial progress:', error);
        setProgress(DEFAULT_USER_PROGRESS);
        currentProgressRef.current = DEFAULT_USER_PROGRESS;
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProgress();
  }, []);

  // Set up cross-tab synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const cleanup = addStorageEventListener((updatedProgress) => {
      setProgress(updatedProgress);
      currentProgressRef.current = updatedProgress;
    });
    
    storageListenerRef.current = cleanup;
    
    return cleanup;
  }, []);

  // Save progress function with debouncing
  const saveCurrentProgress = useCallback((updatedProgress: UserProgress) => {
    setProgress(updatedProgress);
    currentProgressRef.current = updatedProgress;
    debouncedSave(updatedProgress, 1000);
  }, []);

  // Visit page function
  const visitPage = useCallback((pageId: string, path: string, title: string) => {
    const currentProgress = currentProgressRef.current;
    const existingPageProgress = currentProgress.pages[pageId];
    
    const updatedPageProgress = createPageProgress(
      pageId, 
      path, 
      title, 
      existingPageProgress
    );
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      pages: {
        ...currentProgress.pages,
        [pageId]: updatedPageProgress,
      },
    };
    
    // Update sections and stats
    updatedProgress.sections = calculateAllSectionProgress(updatedProgress.pages);
    updatedProgress.stats = updateProgressStats(updatedProgress);
    
    saveCurrentProgress(updatedProgress);
  }, [saveCurrentProgress]);

  // Update page progress function
  const updatePageProgressFn = useCallback((pageId: string, updates: {
    timeSpent?: number;
    scrollDepth?: number;
    completed?: boolean;
    inProgress?: boolean;
  }) => {
    const currentProgress = currentProgressRef.current;
    const existingPageProgress = currentProgress.pages[pageId];
    
    if (!existingPageProgress) {
      console.warn(`Page ${pageId} not found in progress data`);
      return;
    }
    
    const updatedPageProgress = updatePageProgress(existingPageProgress, updates);
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      pages: {
        ...currentProgress.pages,
        [pageId]: updatedPageProgress,
      },
    };
    
    // Update sections and stats
    updatedProgress.sections = calculateAllSectionProgress(updatedProgress.pages);
    updatedProgress.stats = updateProgressStats(updatedProgress);
    
    // Check for new achievements
    const previousAchievements = currentProgress.achievements;
    const newAchievementList = checkAchievements(updatedProgress);
    updatedProgress.achievements = newAchievementList;
    
    // Identify newly unlocked achievements
    const newlyUnlocked = newAchievementList.filter(achievement => 
      !previousAchievements.some(prev => prev.id === achievement.id)
    );
    
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
    }
    
    saveCurrentProgress(updatedProgress);
  }, [saveCurrentProgress]);

  // Mark page complete function
  const markPageComplete = useCallback((pageId: string) => {
    updatePageProgressFn(pageId, { completed: true, inProgress: false });
  }, [updatePageProgressFn]);

  // Get page progress function
  const getPageProgress = useCallback((pageId: string): PageProgress | null => {
    return currentProgressRef.current.pages[pageId] || null;
  }, []);

  // Get new achievements
  const getNewAchievements = useCallback(() => {
    return [...newAchievements];
  }, [newAchievements]);

  // Clear new achievements
  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  // Get recommendations
  const getRecommendations = useCallback((currentPageId?: string) => {
    return getRecommendedPages(currentProgressRef.current, currentPageId);
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const resetData = { ...DEFAULT_USER_PROGRESS };
    setProgress(resetData);
    currentProgressRef.current = resetData;
    setNewAchievements([]);
    clearProgress();
  }, []);

  // Reset specific section
  const resetSection = useCallback((sectionId: string) => {
    const currentProgress = currentProgressRef.current;
    const section = currentProgress.sections[sectionId];
    
    if (!section) {
      console.warn(`Section ${sectionId} not found`);
      return;
    }
    
    const updatedPages = { ...currentProgress.pages };
    
    // Reset all pages in the section
    section.pageIds.forEach(pageId => {
      if (updatedPages[pageId]) {
        updatedPages[pageId] = {
          ...updatedPages[pageId],
          completed: false,
          inProgress: false,
          completedAt: undefined,
          timeSpent: 0,
          maxScrollDepth: 0,
        };
      }
    });
    
    const updatedProgress: UserProgress = {
      ...currentProgress,
      pages: updatedPages,
    };
    
    // Recalculate sections and stats
    updatedProgress.sections = calculateAllSectionProgress(updatedProgress.pages);
    updatedProgress.stats = updateProgressStats(updatedProgress);
    
    // Re-check achievements (some might be lost)
    updatedProgress.achievements = checkAchievements(updatedProgress);
    
    saveCurrentProgress(updatedProgress);
  }, [saveCurrentProgress]);

  // Export data function
  const exportData = useCallback(() => {
    return exportProgress();
  }, []);

  // Import data function
  const importData = useCallback((data: ProgressExport) => {
    const success = importProgress(data);
    if (success) {
      // Reload progress after successful import
      const updatedProgress = loadProgress();
      setProgress(updatedProgress);
      currentProgressRef.current = updatedProgress;
      setNewAchievements([]);
    }
    return success;
  }, []);

  // Refresh progress function
  const refreshProgress = useCallback(() => {
    const refreshedProgress = loadProgress();
    setProgress(refreshedProgress);
    currentProgressRef.current = refreshedProgress;
  }, []);

  return {
    progress,
    isLoading,
    visitPage,
    updatePageProgress: updatePageProgressFn,
    markPageComplete,
    getPageProgress,
    getNewAchievements,
    clearNewAchievements,
    getRecommendations,
    resetProgress,
    resetSection,
    exportData,
    importData,
    refreshProgress,
  };
}