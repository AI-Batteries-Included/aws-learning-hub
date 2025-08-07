// Epic 3D: Progress Tracking System - localStorage Hook

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseLocalStorageOptions<T> {
  /** Default value to use when no stored value exists */
  defaultValue: T;
  /** Custom serialization function */
  serialize?: (value: T) => string;
  /** Custom deserialization function */
  deserialize?: (value: string) => T;
  /** Sync across tabs (default: true) */
  syncAcrossTabs?: boolean;
}

export interface UseLocalStorageReturn<T> {
  /** Current stored value */
  value: T;
  /** Set a new value */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Remove the stored value */
  removeValue: () => void;
  /** Check if localStorage is available */
  isAvailable: boolean;
  /** Loading state */
  isLoading: boolean;
}

export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T> {
  const {
    defaultValue,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true,
  } = options;

  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  // Check if localStorage is available
  const checkAvailability = useCallback(() => {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Load initial value
  useEffect(() => {
    const available = checkAvailability();
    setIsAvailable(available);

    if (!available) {
      setIsLoading(false);
      return;
    }

    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        const parsedValue = deserialize(storedValue);
        setValue(parsedValue);
      }
    } catch (error) {
      console.error(`Failed to load value for key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key, deserialize, checkAvailability]);

  // Set value function
  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(value) 
        : newValue;

      setValue(valueToStore);

      if (isAvailable) {
        const serializedValue = serialize(valueToStore);
        localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.error(`Failed to set value for key "${key}":`, error);
    }
  }, [key, value, serialize, isAvailable]);

  // Remove value function
  const removeValue = useCallback(() => {
    try {
      setValue(defaultValue);
      
      if (isAvailable) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Failed to remove value for key "${key}":`, error);
    }
  }, [key, defaultValue, isAvailable]);

  // Cross-tab synchronization
  useEffect(() => {
    if (!syncAcrossTabs || !isAvailable || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          if (event.newValue === null) {
            setValue(defaultValue);
          } else {
            const parsedValue = deserialize(event.newValue);
            setValue(parsedValue);
          }
        } catch (error) {
          console.error(`Failed to sync value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue, deserialize, syncAcrossTabs, isAvailable]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    isAvailable,
    isLoading,
  };
}