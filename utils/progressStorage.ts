// Epic 3D: Progress Tracking System - localStorage Utilities

import { UserProgress, DEFAULT_USER_PROGRESS } from './progressTypes';
import type { ProgressExport } from './progressTypes';

const STORAGE_KEY = 'aws-learning-hub-progress';
const STORAGE_VERSION = 1;

/**
 * Storage interface for abstracting localStorage operations
 */
interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Fallback storage implementation when localStorage is unavailable
 */
class MemoryStorage implements StorageInterface {
  private storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }
}

/**
 * Get storage instance with fallback to memory storage
 */
function getStorage(): StorageInterface {
  try {
    // Test localStorage availability
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (error) {
    console.warn('localStorage not available, falling back to memory storage:', error);
    return new MemoryStorage();
  }
}

/**
 * Check if localStorage is available and functional
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse JSON with error handling
 */
function safeJSONParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON from storage:', error);
    return fallback;
  }
}

/**
 * Safely stringify JSON with error handling
 */
function safeJSONStringify(data: any): string | null {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Failed to stringify data:', error);
    return null;
  }
}

/**
 * Migrate progress data to current version
 */
function migrateProgressData(data: any): UserProgress {
  // If data is already current version, return as-is
  if (data.version === STORAGE_VERSION) {
    return data as UserProgress;
  }

  // Handle migration from older versions
  if (!data.version || data.version < 1) {
    // Migrate from version 0 or no version to version 1
    const migratedData: UserProgress = {
      ...DEFAULT_USER_PROGRESS,
      ...data,
      version: STORAGE_VERSION,
      updatedAt: new Date(),
    };

    // Ensure required fields exist
    if (!migratedData.stats) {
      migratedData.stats = DEFAULT_USER_PROGRESS.stats;
    }
    if (!migratedData.preferences) {
      migratedData.preferences = DEFAULT_USER_PROGRESS.preferences;
    }
    if (!migratedData.pages) {
      migratedData.pages = {};
    }
    if (!migratedData.sections) {
      migratedData.sections = {};
    }
    if (!migratedData.achievements) {
      migratedData.achievements = [];
    }

    return migratedData;
  }

  // Default fallback for unknown versions
  return DEFAULT_USER_PROGRESS;
}

/**
 * Load user progress from storage
 */
export function loadProgress(): UserProgress {
  const storage = getStorage();
  
  try {
    const storedData = storage.getItem(STORAGE_KEY);
    const parsedData = safeJSONParse(storedData, null);
    
    if (!parsedData) {
      // No data found, return default progress
      return { ...DEFAULT_USER_PROGRESS };
    }

    // Migrate data if necessary
    const migratedData = migrateProgressData(parsedData);
    
    // Convert date strings back to Date objects
    migratedData.createdAt = new Date(migratedData.createdAt);
    migratedData.updatedAt = new Date(migratedData.updatedAt);
    
    if (migratedData.stats.startDate) {
      migratedData.stats.startDate = new Date(migratedData.stats.startDate);
    }
    if (migratedData.stats.estimatedCompletionDate) {
      migratedData.stats.estimatedCompletionDate = new Date(migratedData.stats.estimatedCompletionDate);
    }
    if (migratedData.stats.lastActivity) {
      migratedData.stats.lastActivity = new Date(migratedData.stats.lastActivity);
    }
    if (migratedData.stats.learningStreak.lastActivityDate) {
      migratedData.stats.learningStreak.lastActivityDate = new Date(migratedData.stats.learningStreak.lastActivityDate);
    }

    // Convert page dates
    Object.values(migratedData.pages).forEach(page => {
      if (page.firstVisited) {
        page.firstVisited = new Date(page.firstVisited);
      }
      if (page.completedAt) {
        page.completedAt = new Date(page.completedAt);
      }
      if (page.lastVisited) {
        page.lastVisited = new Date(page.lastVisited);
      }
    });

    // Convert achievement dates
    migratedData.achievements.forEach(achievement => {
      if (achievement.unlockedAt) {
        achievement.unlockedAt = new Date(achievement.unlockedAt);
      }
    });

    return migratedData;
    
  } catch (error) {
    console.error('Failed to load progress from storage:', error);
    return { ...DEFAULT_USER_PROGRESS };
  }
}

/**
 * Save user progress to storage
 */
export function saveProgress(progress: UserProgress): boolean {
  const storage = getStorage();
  
  try {
    // Update the updatedAt timestamp
    const updatedProgress = {
      ...progress,
      updatedAt: new Date(),
    };

    const jsonString = safeJSONStringify(updatedProgress);
    
    if (!jsonString) {
      console.error('Failed to stringify progress data');
      return false;
    }

    storage.setItem(STORAGE_KEY, jsonString);
    return true;
    
  } catch (error) {
    console.error('Failed to save progress to storage:', error);
    return false;
  }
}

/**
 * Clear all progress data from storage
 */
export function clearProgress(): boolean {
  const storage = getStorage();
  
  try {
    storage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear progress from storage:', error);
    return false;
  }
}

/**
 * Export progress data as JSON
 */
export function exportProgress(): ProgressExport | null {
  try {
    const progress = loadProgress();
    const exportData: ProgressExport = {
      metadata: {
        exportDate: new Date(),
        version: STORAGE_VERSION,
        totalPages: progress.stats.totalPages,
        totalSections: Object.keys(progress.sections).length,
      },
      progress,
    };

    return exportData;
  } catch (error) {
    console.error('Failed to export progress:', error);
    return null;
  }
}

/**
 * Import progress data from export
 */
export function importProgress(exportData: ProgressExport): boolean {
  try {
    // Validate export data structure
    if (!exportData.metadata || !exportData.progress) {
      throw new Error('Invalid export data structure');
    }

    // Migrate data if necessary
    const migratedProgress = migrateProgressData(exportData.progress);
    
    // Save the imported data
    return saveProgress(migratedProgress);
    
  } catch (error) {
    console.error('Failed to import progress:', error);
    return false;
  }
}

/**
 * Get storage size information
 */
export function getStorageInfo(): {
  isAvailable: boolean;
  storageType: 'localStorage' | 'memory';
  dataSize: number;
  dataExists: boolean;
} {
  const isAvailable = isLocalStorageAvailable();
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEY);
  
  return {
    isAvailable,
    storageType: isAvailable ? 'localStorage' : 'memory',
    dataSize: data ? new Blob([data]).size : 0,
    dataExists: !!data,
  };
}

/**
 * Cross-tab synchronization support
 * Listen for storage events to sync progress across tabs
 */
export function addStorageEventListener(callback: (progress: UserProgress) => void): () => void {
  if (typeof window === 'undefined' || !isLocalStorageAvailable()) {
    return () => {}; // No-op for SSR or unsupported environments
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const updatedProgress = loadProgress();
        callback(updatedProgress);
      } catch (error) {
        console.error('Failed to handle storage change:', error);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}

/**
 * Debounced save function to prevent excessive writes
 */
let saveTimeout: NodeJS.Timeout | null = null;

export function debouncedSave(progress: UserProgress, delay: number = 1000): void {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    saveProgress(progress);
    saveTimeout = null;
  }, delay);
}

/**
 * Validate progress data structure
 */
export function validateProgress(data: any): data is UserProgress {
  try {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.version === 'number' &&
      typeof data.stats === 'object' &&
      typeof data.pages === 'object' &&
      typeof data.sections === 'object' &&
      Array.isArray(data.achievements) &&
      typeof data.preferences === 'object'
    );
  } catch {
    return false;
  }
}

// Re-export type for convenience
export type { ProgressExport };