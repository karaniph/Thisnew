import { promises as fs } from "fs"

export interface Component {
  id: string
  name: string
  category: string
  partNumber: string
  manufacturer: string
  description: string
  keySpecs: Record<string, string>
  equivalents: Array<{
    partNumber: string
    manufacturer: string
    notes: string
    percentMatch?: string // Added percentMatch as optional
  }>
  datasheetUrl: string
}

export interface ProcessedComponent {
  id: string
  name: string
  type: "Transistor" | "MOSFET" | "IC" | "IGBT"
  description: string
  manufacturer: string
  package: string
  specifications: Record<string, string>
  equivalents?: Array<{
    id: string
    name: string
    manufacturer: string
    matchScore?: number // Added matchScore as optional
  }>
  datasheetUrl?: string
}

export async function processComponentData(inputPath: string): Promise<ProcessedComponent[]> {
  try {
    // Read the input file
    const data = await fs.readFile(inputPath, "utf8")
    const components: Component[] = JSON.parse(data)

    // Process and transform the data
    return components.map((component) => {
      // Map category to type
      let type: "Transistor" | "MOSFET" | "IC" | "IGBT" = "Transistor"
      if (component.category.toLowerCase().includes("mosfet")) {
        type = "MOSFET"
      } else if (
        component.category.toLowerCase().includes("ic") ||
        component.category.toLowerCase().includes("integrated")
      ) {
        type = "IC"
      } else if (component.category.toLowerCase().includes("igbt")) {
        type = "IGBT"
      }

      // Extract package from keySpecs if available
      const packageType = component.keySpecs["Package"] || "Unknown"

      // Map equivalents
      const mappedEquivalents = component.equivalents.map((eq, index) => ({
        id: `eq_${component.id}_${index}`,
        name: eq.partNumber,
        manufacturer: eq.manufacturer || "Unknown",
        matchScore: eq.percentMatch ? Number.parseInt(eq.percentMatch) : undefined, // Parse percentMatch
      }))

      return {
        id: component.id,
        name: component.name,
        type,
        description: component.description || `${component.name} ${type}`,
        manufacturer: component.manufacturer || "Unknown",
        package: packageType,
        specifications: component.keySpecs,
        equivalents: mappedEquivalents.length > 0 ? mappedEquivalents : undefined,
        datasheetUrl: component.datasheetUrl || undefined,
      }
    })
  } catch (error) {
    console.error("Error processing component data:", error)
    return []
  }
}

export async function saveProcessedData(data: ProcessedComponent[], outputPath: string): Promise<void> {
  try {
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2))
    console.log(`Processed data saved to ${outputPath}`)
  } catch (error) {
    console.error("Error saving processed data:", error)
  }
}

export async function processAndSaveComponentData(inputPath: string, outputPath: string): Promise<void> {
  const processedData = await processComponentData(inputPath)
  await saveProcessedData(processedData, outputPath)
}
