// Utility functions for chart data processing

/**
 * Extracts numerical value from a specification string
 * Example: "100mA" -> 100
 */
export function extractNumericValue(value: string): number | null {
  if (!value || typeof value !== "string") return null

  const match = value.match(/^([-+]?\d*\.?\d+)/)
  if (match && match[1]) {
    return Number.parseFloat(match[1])
  }
  return null
}

/**
 * Extracts unit from a specification string
 * Example: "100mA" -> "mA"
 */
export function extractUnit(value: string): string {
  const match = value.match(/^[-+]?\d*\.?\d+\s*([a-zA-Z%°Ω]+)/)
  if (match && match[1]) {
    return match[1]
  }
  return ""
}

/**
 * Normalizes units for comparison
 * Example: converts mA to A, kΩ to Ω, etc.
 */
export function normalizeUnit(value: number, unit: string): { value: number; unit: string } {
  // Handle common electronic units
  if (unit.startsWith("m") && unit.length > 1) {
    return { value: value / 1000, unit: unit.substring(1) }
  }
  if (unit.startsWith("µ") && unit.length > 1) {
    return { value: value / 1000000, unit: unit.substring(1) }
  }
  if (unit.startsWith("n") && unit.length > 1) {
    return { value: value / 1000000000, unit: unit.substring(1) }
  }
  if (unit.startsWith("k") && unit.length > 1) {
    return { value: value * 1000, unit: unit.substring(1) }
  }
  if (unit.startsWith("M") && unit.length > 1) {
    return { value: value * 1000000, unit: unit.substring(1) }
  }
  if (unit.startsWith("G") && unit.length > 1) {
    return { value: value * 1000000000, unit: unit.substring(1) }
  }

  return { value, unit }
}

/**
 * Prepares specification data for charts
 */
export function prepareSpecificationChartData(
  specifications: Record<string, string> | undefined | null,
): { name: string; value: number; unit: string }[] {
  const chartData: { name: string; value: number; unit: string }[] = []

  // Return empty array if specifications is undefined or null
  if (!specifications) {
    return chartData
  }

  for (const [key, value] of Object.entries(specifications)) {
    if (value && typeof value === "string") {
      const numericValue = extractNumericValue(value)
      if (numericValue !== null) {
        const unit = extractUnit(value)
        chartData.push({
          name: key,
          value: numericValue,
          unit,
        })
      }
    }
  }

  return chartData
}

/**
 * Prepares comparison data for radar charts
 */
export function prepareRadarComparisonData(
  components: Array<{
    id: string
    name: string
    specifications: Record<string, string>
  }>,
): {
  data: Array<{ subject: string } & Record<string, number>>
  components: Array<{ id: string; name: string; color: string }>
} {
  // Find common specifications across all components
  const commonSpecs = new Set<string>()

  // First pass: collect all specification keys
  components.forEach((component) => {
    Object.keys(component.specifications).forEach((key) => {
      commonSpecs.add(key)
    })
  })

  // Prepare radar data
  const data: Array<{ subject: string } & Record<string, number>> = []

  // For each common specification, create a data point
  commonSpecs.forEach((spec) => {
    const dataPoint: { subject: string } & Record<string, number> = { subject: spec }

    // For each component, add its value for this spec
    components.forEach((component) => {
      const value = component.specifications[spec]
      if (value) {
        const numericValue = extractNumericValue(value)
        if (numericValue !== null) {
          dataPoint[component.id] = numericValue
        }
      }
    })

    // Only add data points that have values for at least one component
    if (Object.keys(dataPoint).length > 1) {
      data.push(dataPoint)
    }
  })

  // Prepare component metadata for the chart
  const componentMeta = components.map((component, index) => ({
    id: component.id,
    name: component.name,
    color: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  return { data, components: componentMeta }
}

/**
 * Groups components by a specific parameter
 */
export function groupComponentsByParameter(
  components: Array<{
    id: string
    name: string
    specifications: Record<string, string>
  }>,
  parameter: string,
): { name: string; value: number; color?: string }[] {
  const groups: Record<string, number> = {}

  components.forEach((component) => {
    const value = component.specifications[parameter]
    if (value) {
      if (groups[value]) {
        groups[value]++
      } else {
        groups[value] = 1
      }
    }
  })

  return Object.entries(groups).map(([name, value]) => ({
    name,
    value,
  }))
}
