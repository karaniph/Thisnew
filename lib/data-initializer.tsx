"use client"

import { useEffect, useState, useRef } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Sample component data for initialization
const sampleComponentData = [
  {
    id: "2n2222",
    name: "2N2222",
    type: "Transistor",
    description: "NPN general purpose transistor",
    manufacturer: "Multiple",
    specifications: {
      maxVoltage: "40V",
      maxCurrent: "800mA",
      maxPower: "500mW",
      gainMin: 100,
      gainMax: 300,
    },
    applications: ["Switching", "Amplification"],
    datasheet: "https://example.com/2n2222-datasheet.pdf",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
  {
    id: "lm358",
    name: "LM358",
    type: "IC",
    description: "Dual operational amplifier",
    manufacturer: "Texas Instruments",
    specifications: {
      supplyVoltage: "3V to 32V",
      inputOffset: "2mV",
      gainBandwidth: "1MHz",
      slewRate: "0.3V/µs",
    },
    applications: ["Signal conditioning", "Active filters"],
    datasheet: "https://example.com/lm358-datasheet.pdf",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
  {
    id: "irf540",
    name: "IRF540",
    type: "MOSFET",
    description: "N-Channel power MOSFET",
    manufacturer: "Vishay",
    specifications: {
      vdss: "100V",
      rdsOn: "44mΩ",
      id: "33A",
      pd: "130W",
    },
    applications: ["Power switching", "Motor control"],
    datasheet: "https://example.com/irf540-datasheet.pdf",
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
  },
]

export function DataInitializer() {
  // Track if component is mounted
  const isMounted = useRef(false)
  const initializeAttempted = useRef(false)

  // State to track if we're in a client environment
  const [isClient, setIsClient] = useState(false)

  // Use local storage hooks with initialization tracking
  const [components, setComponents, componentsInitialized] = useLocalStorage("components", [])
  const [recentlyViewed, setRecentlyViewed, recentInitialized] = useLocalStorage("recentlyViewed", [])

  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true)
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  // Initialize data only once when conditions are met
  useEffect(() => {
    // Skip if not mounted, not client-side, already attempted initialization,
    // or if storage hooks aren't initialized yet
    if (
      !isMounted.current ||
      !isClient ||
      initializeAttempted.current ||
      !componentsInitialized ||
      !recentInitialized
    ) {
      return
    }

    // Mark that we've attempted initialization
    initializeAttempted.current = true

    // Only initialize if components array is empty
    if (Array.isArray(components) && components.length === 0) {
      console.log("Initializing component data with samples")
      setComponents(sampleComponentData)
    }
  }, [isClient, componentsInitialized, recentInitialized, components, setComponents])

  // This component doesn't render anything visible
  return null
}
