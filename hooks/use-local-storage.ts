"use client"

import { useState, useEffect, useRef } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, boolean] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // State to track if the hook has been initialized
  const [initialized, setInitialized] = useState(false)

  // Ref to track if this is the first render
  const isFirstRender = useRef(true)

  // Read from localStorage only once on mount
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === "undefined") return

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)

      // Parse stored json or return initialValue
      const value = item ? JSON.parse(item) : initialValue
      setStoredValue(value)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      // If error, use initial value
      setStoredValue(initialValue)
    } finally {
      setInitialized(true)
      isFirstRender.current = false
    }
  }, [key]) // Only run when the key changes

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Save state
      setStoredValue(valueToStore)

      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, initialized]
}
