/**
 * Utility functions for handling component storage
 * This addresses the localStorage size limitations and ensures data persistence
 */

import type { ProcessedComponent } from "./data-processor"

// Constants
const STORAGE_PREFIX = "component_db_"
const METADATA_KEY = "component_db_metadata"
const CHUNK_SIZE = 100 // Number of components per chunk

// Metadata interface
interface StorageMetadata {
  totalComponents: number
  lastUpdated: string
  chunkCount: number
  chunkKeys: string[]
}

/**
 * Saves component data to localStorage with chunking for large datasets
 */
export function saveComponentData(components: ProcessedComponent[]): boolean {
  try {
    // Clear existing data
    clearComponentData()

    // If no components, just save empty metadata
    if (!components || components.length === 0) {
      const metadata: StorageMetadata = {
        totalComponents: 0,
        lastUpdated: new Date().toISOString(),
        chunkCount: 0,
        chunkKeys: [],
      }
      localStorage.setItem(METADATA_KEY, JSON.stringify(metadata))
      return true
    }

    // Calculate number of chunks needed
    const chunkCount = Math.ceil(components.length / CHUNK_SIZE)
    const chunkKeys: string[] = []

    // Split data into chunks and save
    for (let i = 0; i < chunkCount; i++) {
      const start = i * CHUNK_SIZE
      const end = Math.min(start + CHUNK_SIZE, components.length)
      const chunk = components.slice(start, end)
      const chunkKey = `${STORAGE_PREFIX}chunk_${i}`

      localStorage.setItem(chunkKey, JSON.stringify(chunk))
      chunkKeys.push(chunkKey)
    }

    // Save metadata
    const metadata: StorageMetadata = {
      totalComponents: components.length,
      lastUpdated: new Date().toISOString(),
      chunkCount,
      chunkKeys,
    }
    localStorage.setItem(METADATA_KEY, JSON.stringify(metadata))

    return true
  } catch (error) {
    console.error("Error saving component data:", error)
    return false
  }
}

/**
 * Loads all component data from localStorage
 */
export function loadComponentData(): ProcessedComponent[] {
  try {
    // Get metadata
    const metadataStr = localStorage.getItem(METADATA_KEY)
    if (!metadataStr) return []

    const metadata: StorageMetadata = JSON.parse(metadataStr)
    if (metadata.totalComponents === 0) return []

    // Load all chunks and combine
    const components: ProcessedComponent[] = []
    for (const chunkKey of metadata.chunkKeys) {
      const chunkStr = localStorage.getItem(chunkKey)
      if (chunkStr) {
        const chunk: ProcessedComponent[] = JSON.parse(chunkStr)
        components.push(...chunk)
      }
    }

    return components
  } catch (error) {
    console.error("Error loading component data:", error)
    return []
  }
}

// Fix the loadComponentById function to handle both loading a specific component and all components

/**
 * Loads a specific component by ID or all components if no ID is provided
 */
export function loadComponentById(id?: string): ProcessedComponent | ProcessedComponent[] | null {
  try {
    // If no ID is provided, return all components
    if (!id) {
      return loadComponentData()
    }

    // Get metadata
    const metadataStr = localStorage.getItem(METADATA_KEY)
    if (!metadataStr) return null

    const metadata: StorageMetadata = JSON.parse(metadataStr)

    // Search through all chunks
    for (const chunkKey of metadata.chunkKeys) {
      const chunkStr = localStorage.getItem(chunkKey)
      if (chunkStr) {
        const chunk: ProcessedComponent[] = JSON.parse(chunkStr)

        // Try to find by exact ID match
        let component = chunk.find((c) => c.id === id)

        // If not found, try case-insensitive match on id or name
        if (!component) {
          component = chunk.find(
            (c) => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase(),
          )
        }

        if (component) return component
      }
    }

    return null
  } catch (error) {
    console.error("Error loading component by ID:", error)
    return null
  }
}

/**
 * Clears all component data from localStorage
 */
export function clearComponentData(): void {
  try {
    // Get metadata to find all chunk keys
    const metadataStr = localStorage.getItem(METADATA_KEY)
    if (metadataStr) {
      const metadata: StorageMetadata = JSON.parse(metadataStr)

      // Remove all chunks
      for (const chunkKey of metadata.chunkKeys) {
        localStorage.removeItem(chunkKey)
      }
    }

    // Remove metadata
    localStorage.removeItem(METADATA_KEY)
  } catch (error) {
    console.error("Error clearing component data:", error)
  }
}

/**
 * Gets storage usage statistics
 */
export function getStorageStats() {
  try {
    let totalSize = 0
    let componentCount = 0

    // Get metadata
    const metadataStr = localStorage.getItem(METADATA_KEY)
    if (metadataStr) {
      totalSize += metadataStr.length * 2 // Approximate size in bytes (2 bytes per character)

      const metadata: StorageMetadata = JSON.parse(metadataStr)
      componentCount = metadata.totalComponents

      // Calculate size of all chunks
      for (const chunkKey of metadata.chunkKeys) {
        const chunkStr = localStorage.getItem(chunkKey)
        if (chunkStr) {
          totalSize += chunkStr.length * 2
        }
      }
    }

    // Calculate total localStorage usage
    let totalLocalStorageUsed = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key)
        if (value) {
          totalLocalStorageUsed += (key.length + value.length) * 2
        }
      }
    }

    // Estimate localStorage limit (5MB is common)
    const localStorageLimit = 5 * 1024 * 1024

    return {
      componentCount,
      componentDataSize: totalSize,
      componentDataSizeFormatted: formatBytes(totalSize),
      totalLocalStorageUsed,
      totalLocalStorageUsedFormatted: formatBytes(totalLocalStorageUsed),
      localStorageLimit,
      localStorageLimitFormatted: formatBytes(localStorageLimit),
      percentUsed: (totalLocalStorageUsed / localStorageLimit) * 100,
    }
  } catch (error) {
    console.error("Error getting storage stats:", error)
    return {
      componentCount: 0,
      componentDataSize: 0,
      componentDataSizeFormatted: "0 B",
      totalLocalStorageUsed: 0,
      totalLocalStorageUsedFormatted: "0 B",
      localStorageLimit: 5 * 1024 * 1024,
      localStorageLimitFormatted: "5 MB",
      percentUsed: 0,
    }
  }
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"

  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

// Add a function to check if storage is working properly
export function verifyStorage(): boolean {
  try {
    // Test if localStorage is available
    const testKey = "storage_test"
    localStorage.setItem(testKey, "test")
    const testValue = localStorage.getItem(testKey)
    localStorage.removeItem(testKey)

    return testValue === "test"
  } catch (error) {
    console.error("Storage verification failed:", error)
    return false
  }
}
