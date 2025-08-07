// Epic 3D: Progress Tracking System - Page Completion Tracker Component

'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { usePageProgress } from './ProgressContext';
import { useScrollDepth } from '../hooks/useScrollDepth';
import { useTimeTracking } from '../hooks/useTimeTracking';

export interface PageCompletionTrackerProps {
  /** Unique page identifier */
  pageId: string;
  /** Page path for navigation */
  path: string;
  /** Page title for display */
  title: string;
  /** Scroll depth threshold for auto-completion (default: 80) */
  scrollThreshold?: number;
  /** Time threshold in seconds for auto-completion (default: 30) */
  timeThreshold?: number;
  /** Whether to show manual completion button (default: true) */
  showManualButton?: boolean;
  /** Whether to enable auto-completion (default: true) */
  autoComplete?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Callback when page is marked complete */
  onComplete?: () => void;
}

export function PageCompletionTracker({
  pageId,
  path,
  title,
  scrollThreshold = 80,
  timeThreshold = 30,
  showManualButton = true,
  autoComplete = true,
  className = '',
  onComplete,
}: PageCompletionTrackerProps) {
  const {
    pageProgress,
    updateProgress,
    markComplete,
    isCompleted,
    isInProgress,
    timeSpent,
    maxScrollDepth,
  } = usePageProgress(pageId, path, title);

  const { scrollDepth, maxScrollDepth: currentMaxScroll } = useScrollDepth();
  const { timeSpent: currentTimeSpent, isTracking } = useTimeTracking({
    pauseWhenHidden: true,
    trackOnlyWhenActive: true,
  });

  const [showCompletionButton, setShowCompletionButton] = useState(false);
  const [autoCompleteTriggered, setAutoCompleteTriggered] = useState(false);
  const lastUpdateRef = useRef<number>(0);

  // Update progress periodically
  const updateProgressData = useCallback(() => {
    const now = Date.now();
    
    // Throttle updates to every 2 seconds
    if (now - lastUpdateRef.current < 2000) return;
    
    updateProgress({
      timeSpent: currentTimeSpent,
      scrollDepth: Math.max(currentMaxScroll, maxScrollDepth),
      inProgress: isTracking && !isCompleted,
    });
    
    lastUpdateRef.current = now;
  }, [
    currentTimeSpent,
    currentMaxScroll,
    maxScrollDepth,
    isTracking,
    isCompleted,
    updateProgress,
  ]);

  // Periodic progress updates
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(updateProgressData, 2000);
    return () => clearInterval(interval);
  }, [updateProgressData, isCompleted]);

  // Check auto-completion conditions
  useEffect(() => {
    if (!autoComplete || isCompleted || autoCompleteTriggered) return;

    const timeInSeconds = Math.floor(currentTimeSpent / 1000);
    const hasMetTimeThreshold = timeInSeconds >= timeThreshold;
    const hasMetScrollThreshold = currentMaxScroll >= scrollThreshold;

    if (hasMetTimeThreshold && hasMetScrollThreshold) {
      setAutoCompleteTriggered(true);
      markComplete();
      onComplete?.();
    }
  }, [
    autoComplete,
    isCompleted,
    autoCompleteTriggered,
    currentTimeSpent,
    currentMaxScroll,
    timeThreshold,
    scrollThreshold,
    markComplete,
    onComplete,
  ]);

  // Show manual completion button when nearing completion
  useEffect(() => {
    if (isCompleted || !showManualButton) {
      setShowCompletionButton(false);
      return;
    }

    const timeInSeconds = Math.floor(currentTimeSpent / 1000);
    const timeProgress = timeInSeconds / timeThreshold;
    const scrollProgress = currentMaxScroll / scrollThreshold;

    // Show button when either threshold is 70% complete or both are 50% complete
    const shouldShow = 
      timeProgress >= 0.7 || 
      scrollProgress >= 0.7 || 
      (timeProgress >= 0.5 && scrollProgress >= 0.5);

    setShowCompletionButton(shouldShow);
  }, [
    isCompleted,
    showManualButton,
    currentTimeSpent,
    currentMaxScroll,
    timeThreshold,
    scrollThreshold,
  ]);

  const handleManualComplete = useCallback(() => {
    markComplete();
    onComplete?.();
  }, [markComplete, onComplete]);

  // Always render the tracker, but show different states for completed vs in-progress

  const timeInSeconds = Math.floor(currentTimeSpent / 1000);
  const timeProgress = Math.min(100, (timeInSeconds / timeThreshold) * 100);
  const scrollProgressPercent = Math.min(100, (currentMaxScroll / scrollThreshold) * 100);

  return (
    <div className={`page-completion-tracker ${className}`}>
      {/* Progress Indicators */}
      <div className="completion-progress mb-4">
        <div className="progress-item mb-2">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Reading Progress</span>
            <span>{Math.round(scrollProgressPercent)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="progress-item mb-2">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Time Spent</span>
            <span>
              {Math.floor(timeInSeconds / 60)}m {timeInSeconds % 60}s
              {timeThreshold > 0 && ` / ${Math.floor(timeThreshold / 60)}m ${timeThreshold % 60}s`}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${timeProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Completion Status and Actions */}
      {isCompleted ? (
        <div className="completion-status text-center py-3">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 font-medium mb-2">
            <span className="mr-2">✅</span>
            Page Completed!
          </div>
          {pageProgress?.completedAt && (
            <p className="text-xs text-gray-500 mb-3">
              Completed on {pageProgress.completedAt.toLocaleDateString()} at{' '}
              {pageProgress.completedAt.toLocaleTimeString()}
            </p>
          )}
          <button
            onClick={() => updateProgress({ completed: false, inProgress: true })}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Mark as Incomplete
          </button>
        </div>
      ) : showCompletionButton && showManualButton ? (
        <div className="completion-button-container">
          <button
            onClick={handleManualComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            ✓ Mark as Complete
          </button>
          <p className="text-sm text-gray-500 text-center mt-2">
            {autoComplete 
              ? `Auto-complete at ${scrollThreshold}% read + ${timeThreshold}s` 
              : 'Click to mark this page as complete'
            }
          </p>
        </div>
      ) : isInProgress ? (
        <div className="completion-status text-center py-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full mr-2" />
            Learning in progress...
          </div>
        </div>
      ) : (
        <div className="completion-status text-center py-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
            Start reading to track progress
          </div>
        </div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 text-xs text-gray-500">
          <summary>Debug Info</summary>
          <div className="mt-2 space-y-1">
            <div>Current Scroll: {Math.round(scrollDepth)}%</div>
            <div>Max Scroll: {Math.round(currentMaxScroll)}%</div>
            <div>Time: {timeInSeconds}s</div>
            <div>Is Tracking: {isTracking ? 'Yes' : 'No'}</div>
            <div>Auto-complete Triggered: {autoCompleteTriggered ? 'Yes' : 'No'}</div>
            <div>Show Button: {showCompletionButton ? 'Yes' : 'No'}</div>
          </div>
        </details>
      )}
    </div>
  );
}

/**
 * Lightweight version that only tracks without showing UI
 */
export function PageProgressTracker({
  pageId,
  path,
  title,
  scrollThreshold = 80,
  timeThreshold = 30,
  autoComplete = true,
  onComplete,
}: Omit<PageCompletionTrackerProps, 'showManualButton' | 'className'>) {
  return (
    <PageCompletionTracker
      pageId={pageId}
      path={path}
      title={title}
      scrollThreshold={scrollThreshold}
      timeThreshold={timeThreshold}
      autoComplete={autoComplete}
      showManualButton={false}
      className="hidden"
      onComplete={onComplete}
    />
  );
}