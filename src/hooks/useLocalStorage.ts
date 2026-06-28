import { useState, useEffect, useRef, useCallback } from 'react'

const STORAGE_DEBOUNCE_MS = 500

/**
 * Custom hook for managing state with localStorage persistence
 * @param key - localStorage key
 * @param initialValue - initial value if not in localStorage
 * @returns [value, setValue, isSaving]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch {
      console.error(`Error reading localStorage key "${key}":`, Error)
      return initialValue
    }
  })

  const [isSaving, setIsSaving] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced save to localStorage
  useEffect(() => {
    setIsSaving(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        setIsSaving(false)
      } catch {
        console.error(`Error writing to localStorage key "${key}":`, Error)
        setIsSaving(false)
      }
    }, STORAGE_DEBOUNCE_MS)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, key])

  const setValueWrapper = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(newValue)
  }, [])

  return [value, setValueWrapper, isSaving]
}

/**
 * Remove item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    console.error(`Error removing localStorage key "${key}":`, Error)
  }
}

/**
 * Clear all localStorage items (be careful with this!)
 */
export function clearAllLocalStorage(): void {
  try {
    localStorage.clear()
  } catch {
    console.error('Error clearing localStorage:', Error)
  }
}
