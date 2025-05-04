"use client"

import { useState, useEffect } from "react"
import { ComponentCard } from "@/components/component-card"
import type { ProcessedComponent } from "@/lib/data-processor"

// Sample component data to use if no components are in localStorage
const sampleComponents = [
  {
    id: "2n2222",
    name: "2N2222",
    type: "Transistor",
    description: "NPN general purpose amplifier",
    manufacturer: "ON Semiconductor",
    package: "TO-92",
    specifications: {
      "Collector-Emitter Voltage (Vce)": "40V",
      "Collector-Base Voltage (Vcb)": "60V",
      "Emitter-Base Voltage (Veb)": "6V",
      "Collector Current (Ic)": "800mA",
      "Power Dissipation (Pd)": "500mW",
      "Transition Frequency (ft)": "250MHz",
      "Collector-Emitter Saturation Voltage (Vce(sat))": "0.3V",
      "DC Current Gain (hFE)": "100",
    },
  },
  {
    id: "2n3904",
    name: "2N3904",
    type: "Transistor",
    description: "NPN general purpose transistor",
    manufacturer: "ON Semiconductor",
    package: "TO-92",
    specifications: {
      "Collector-Emitter Voltage (Vce)": "40V",
      "Collector-Base Voltage (Vcb)": "40V",
      "Emitter-Base Voltage (Veb)": "6V",
      "Collector Current (Ic)": "200mA",
      "Power Dissipation (Pd)": "625mW",
      "Transition Frequency (ft)": "300MHz",
      "Collector-Emitter Saturation Voltage (Vce(sat))": "0.2V",
      "DC Current Gain (hFE)": "150",
    },
  },
  {
    id: "irf540n",
    name: "IRF540N",
    type: "MOSFET",
    description: "N-Channel 100V 33A Power MOSFET",
    manufacturer: "Infineon",
    package: "TO-220",
    specifications: {
      "Drain-Source Voltage (Vds)": "100V",
      "Gate-Source Voltage (Vgs)": "20V",
      "Drain Current (Id)": "33A",
      "Power Dissipation (Pd)": "130W",
      "Rds(on)": "44mΩ",
      "Gate Charge (Qg)": "71nC",
    },
  },
]

export function FeaturedComponents() {
  const [components, setComponents] = useState<ProcessedComponent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to load components from localStorage
    const loadComponents = () => {
      try {
        const storedData = localStorage.getItem("componentDatabase")
        if (storedData) {
          const parsedData = JSON.parse(storedData)
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            // Get a random selection of components to feature
            const randomComponents = [...parsedData].sort(() => 0.5 - Math.random()).slice(0, 3)
            setComponents(randomComponents)
          } else {
            // If localStorage has empty array, use sample data
            setComponents(sampleComponents)
          }
        } else {
          // If no data in localStorage, use sample data
          localStorage.setItem("componentDatabase", JSON.stringify(sampleComponents))
          setComponents(sampleComponents)
        }
      } catch (error) {
        console.error("Error loading components:", error)
        // If there's an error, use sample data
        setComponents(sampleComponents)
      } finally {
        setLoading(false)
      }
    }

    loadComponents()
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

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <ComponentCard key={component.id} {...component} />
      ))}
    </div>
  )
}
