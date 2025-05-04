"use client"

import { useEffect, useRef } from "react"
import { getCircuitSchematicSVG } from "@/lib/circuit-templates"

interface CircuitSchematicProps {
  circuitId: string
  preview?: boolean
  width?: number
  height?: number
}

export function CircuitSchematic({ circuitId, preview = false, width = 500, height = 300 }: CircuitSchematicProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (svgContainerRef.current) {
      const svgContent = getCircuitSchematicSVG(circuitId, preview)
      svgContainerRef.current.innerHTML = svgContent
    }
  }, [circuitId, preview])

  return (
    <div
      ref={svgContainerRef}
      className="circuit-schematic"
      style={{
        width: preview ? "100%" : `${width}px`,
        height: preview ? "100%" : `${height}px`,
        maxWidth: "100%",
        overflow: "auto",
      }}
    />
  )
}
