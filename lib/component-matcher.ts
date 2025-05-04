import type { ProcessedComponent } from "./data-processor"

export interface MatchResult {
  component: ProcessedComponent
  matchScore: number
  differences: Array<{
    parameter: string
    original: string
    equivalent: string
  }>
}

// Improve the component matcher to handle different data formats
export function calculateComponentSimilarity(
  component1: ProcessedComponent,
  component2: ProcessedComponent,
): MatchResult {
  // Only compare components of the same type
  if (component1.type !== component2.type) {
    return {
      component: component2,
      matchScore: 0,
      differences: [],
    }
  }

  // Ensure specifications exist
  const specs1 = component1.specifications || {}
  const specs2 = component2.specifications || {}

  const allSpecs = new Set<string>()
  Object.keys(specs1).forEach((key) => allSpecs.add(key))
  Object.keys(specs2).forEach((key) => allSpecs.add(key))

  let matchPoints = 0
  let totalPoints = 0
  const differences: Array<{
    parameter: string
    original: string
    equivalent: string
  }> = []

  // Compare each specification
  allSpecs.forEach((spec) => {
    const spec1 = specs1[spec]
    const spec2 = specs2[spec]

    // If both components have this specification
    if (spec1 && spec2) {
      totalPoints += 10

      // Extract numeric values for comparison
      const numValue1 = extractNumericValue(spec1)
      const numValue2 = extractNumericValue(spec2)

      if (numValue1 !== null && numValue2 !== null) {
        // Calculate similarity based on numeric values
        const similarity = calculateNumericSimilarity(numValue1, numValue2)
        matchPoints += similarity * 10

        // If values are different enough, add to differences
        if (similarity < 0.9) {
          differences.push({
            parameter: spec,
            original: spec1,
            equivalent: spec2,
          })
        }
      } else if (spec1.toLowerCase() === spec2.toLowerCase()) {
        // Exact string match (case insensitive)
        matchPoints += 10
      } else {
        // String values don't match
        matchPoints += 2 // Some points for having the same parameter
        differences.push({
          parameter: spec,
          original: spec1,
          equivalent: spec2,
        })
      }
    } else {
      // Only one component has this specification
      totalPoints += 5
      // No points awarded, and add to differences if the original has this spec
      if (spec1) {
        differences.push({
          parameter: spec,
          original: spec1,
          equivalent: spec2 || "Not specified",
        })
      }
    }
  })

  // Add points for matching package type
  if (
    component1.package &&
    component2.package &&
    component1.package.toLowerCase() === component2.package.toLowerCase()
  ) {
    matchPoints += 10
    totalPoints += 10
  } else if (component1.package && component2.package) {
    totalPoints += 10
    differences.push({
      parameter: "Package",
      original: component1.package,
      equivalent: component2.package,
    })
  }

  // Calculate final score as a percentage
  const matchScore = totalPoints > 0 ? Math.round((matchPoints / totalPoints) * 100) : 0

  return {
    component: component2,
    matchScore,
    differences,
  }
}

/**
 * Find equivalent components for a given component
 */
export function findEquivalentComponents(
  targetComponent: ProcessedComponent,
  allComponents: ProcessedComponent[],
  minMatchScore = 70,
): MatchResult[] {
  try {
    // First filter by type to reduce the comparison set
    const sameTypeComponents = allComponents.filter(
      (comp) => comp.id !== targetComponent.id && comp.type === targetComponent.type,
    )

    // For large datasets, limit the number of detailed comparisons
    const componentsToCompare = sameTypeComponents.length > 100 ? sameTypeComponents.slice(0, 100) : sameTypeComponents

    return componentsToCompare
      .map((comp) => calculateComponentSimilarity(targetComponent, comp))
      .filter((result) => result.matchScore >= minMatchScore)
      .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score descending
  } catch (error) {
    console.error("Error finding equivalent components:", error)
    return []
  }
}

/**
 * Extract numeric value from a specification string
 * Example: "100mA" -> 100
 */
function extractNumericValue(value: string): number | null {
  if (!value || typeof value !== "string") return null

  const match = value.match(/^([-+]?\d*\.?\d+)/)
  if (match && match[1]) {
    return Number.parseFloat(match[1])
  }
  return null
}

/**
 * Calculate similarity between two numeric values
 * Returns a value between 0 and 1
 */
function calculateNumericSimilarity(value1: number, value2: number): number {
  if (value1 === value2) return 1

  // Use the larger value as the denominator to get a ratio
  const ratio = value1 > value2 ? value2 / value1 : value1 / value2

  // Apply a sigmoid-like function to make the similarity curve more useful
  // This gives more weight to values that are close
  return Math.pow(ratio, 0.5)
}
