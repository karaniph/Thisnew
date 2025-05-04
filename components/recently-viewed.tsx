"use client"

import { useState, useEffect } from "react"
import { ComponentCard } from "@/components/component-card"
import type { ProcessedComponent } from "@/lib/data-processor"

export function RecentlyViewed() {
  const [components, setComponents] = useState<ProcessedComponent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load components from localStorage
    const loadRecentComponents = () => {
      const storedData = localStorage.getItem("componentDatabase")
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData)
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            // For demo purposes, just show the first 3 components as "recently viewed"
            // In a real app, you would track actual recently viewed components
            setComponents(parsedData.slice(0, 3))
          }
        } catch (error) {
          console.error("Error parsing component database:", error)
        }
      }
      setLoading(false)
    }

    loadRecentComponents()
  }, []) // Empty dependency array to run only once

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[200px] rounded-md border bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No recently viewed components</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <ComponentCard key={component.id} {...component} />
      ))}
    </div>
  )
}
