"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, X, Download, Share2, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarComparisonChart } from "@/components/charts/radar-comparison-chart"
import { SpecificationBarChart } from "@/components/charts/specification-bar-chart"
import { prepareRadarComparisonData } from "@/lib/chart-utils"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock component database - in a real app this would come from an API or database
const componentDatabase = {
  "2n2222": {
    id: "2n2222",
    name: "2N2222",
    type: "Transistor" as const,
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
  "2n3904": {
    id: "2n3904",
    name: "2N3904",
    type: "Transistor" as const,
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
  bc547: {
    id: "bc547",
    name: "BC547",
    type: "Transistor" as const,
    description: "NPN general purpose transistor",
    manufacturer: "Fairchild Semiconductor",
    package: "TO-92",
    specifications: {
      "Collector-Emitter Voltage (Vce)": "45V",
      "Collector-Base Voltage (Vcb)": "50V",
      "Emitter-Base Voltage (Veb)": "6V",
      "Collector Current (Ic)": "100mA",
      "Power Dissipation (Pd)": "500mW",
      "Transition Frequency (ft)": "150MHz",
      "Collector-Emitter Saturation Voltage (Vce(sat))": "0.25V",
      "DC Current Gain (hFE)": "110",
    },
  },
  irf540n: {
    id: "irf540n",
    name: "IRF540N",
    type: "MOSFET" as const,
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
  irf640: {
    id: "irf640",
    name: "IRF640",
    type: "MOSFET" as const,
    description: "N-Channel 200V 18A Power MOSFET",
    manufacturer: "Vishay",
    package: "TO-220",
    specifications: {
      "Drain-Source Voltage (Vds)": "200V",
      "Gate-Source Voltage (Vgs)": "20V",
      "Drain Current (Id)": "18A",
      "Power Dissipation (Pd)": "125W",
      "Rds(on)": "150mΩ",
      "Gate Charge (Qg)": "67nC",
    },
  },
  lm358: {
    id: "lm358",
    name: "LM358",
    type: "IC" as const,
    description: "Dual Operational Amplifier",
    manufacturer: "Texas Instruments",
    package: "SOIC-8",
    specifications: {
      "Supply Voltage": "3V to 32V",
      "Input Offset Voltage": "2mV",
      "Input Bias Current": "20nA",
      "Gain Bandwidth Product": "1.1MHz",
      "Slew Rate": "0.5V/μs",
      CMRR: "85dB",
    },
  },
  ne555: {
    id: "ne555",
    name: "NE555",
    type: "IC" as const,
    description: "Timer IC",
    manufacturer: "Texas Instruments",
    package: "DIP-8",
    specifications: {
      "Supply Voltage": "4.5V to 16V",
      "Supply Current": "10mA",
      "Timing Range": "μs to hours",
      "Max Operating Frequency": "100kHz",
      "Temperature Stability": "50ppm/°C",
      "Output Current": "200mA",
    },
  },
}

// Interface for component type
interface Component {
  id: string
  name: string
  type: "Transistor" | "MOSFET" | "IC" | "IGBT"
  description: string
  manufacturer: string
  package: string
  specifications: Record<string, string>
}

export default function ComparePage() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [availableComponents, setAvailableComponents] = useState<Component[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
  const [allSpecifications, setAllSpecifications] = useState<string[]>([])
  const [comparisonName, setComparisonName] = useState("")
  const [savedComparisons, setSavedComparisons] = useState<{ name: string; components: string[] }[]>([])

  // Initialize with mock data - in a real app, this would fetch from an API
  useEffect(() => {
    const components = Object.values(componentDatabase)
    setAvailableComponents(components)

    // Extract all unique specifications
    const allSpecs = new Set<string>()
    components.forEach((component) => {
      Object.keys(component.specifications).forEach((spec) => {
        allSpecs.add(spec)
      })
    })
    const specsList = Array.from(allSpecs).sort()
    setAllSpecifications(specsList)

    // By default, select all specifications
    setSelectedSpecs(specsList)

    // Load saved comparisons from localStorage
    const savedComps = localStorage.getItem("savedComparisons")
    if (savedComps) {
      setSavedComparisons(JSON.parse(savedComps))
    }
  }, [])

  const handleAddComponent = (componentId: string) => {
    if (componentId && !selectedComponents.includes(componentId)) {
      setSelectedComponents([...selectedComponents, componentId])
    }
  }

  const handleRemoveComponent = (componentId: string) => {
    setSelectedComponents(selectedComponents.filter((id) => id !== componentId))
  }

  const handleSaveComparison = () => {
    if (comparisonName && selectedComponents.length > 0) {
      const newComparison = {
        name: comparisonName,
        components: selectedComponents,
      }
      const updatedComparisons = [...savedComparisons, newComparison]
      setSavedComparisons(updatedComparisons)
      localStorage.setItem("savedComparisons", JSON.stringify(updatedComparisons))
      setComparisonName("")
    }
  }

  const handleLoadComparison = (comparison: { name: string; components: string[] }) => {
    setSelectedComponents(comparison.components)
  }

  const handleDeleteComparison = (index: number) => {
    const updatedComparisons = savedComparisons.filter((_, i) => i !== index)
    setSavedComparisons(updatedComparisons)
    localStorage.setItem("savedComparisons", JSON.stringify(updatedComparisons))
  }

  const toggleSpecification = (spec: string) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter((s) => s !== spec))
    } else {
      setSelectedSpecs([...selectedSpecs, spec])
    }
  }

  const selectAllSpecs = () => {
    setSelectedSpecs([...allSpecifications])
  }

  const clearAllSpecs = () => {
    setSelectedSpecs([])
  }

  // Filter available components based on search and type filter
  const filteredComponents = availableComponents.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || component.type === filterType

    return matchesSearch && matchesType
  })

  // Get the selected component data
  const selectedComponentData = selectedComponents
    .map((id) => componentDatabase[id as keyof typeof componentDatabase])
    .filter(Boolean) // Filter out any undefined components

  // Prepare radar chart data
  const { data: radarData, components: radarComponents } = prepareRadarComparisonData(
    selectedComponentData.map((component) => ({
      id: component.id,
      name: component.name,
      specifications: component.specifications,
    })),
  )

  // Prepare bar chart data for a specific specification
  const prepareBarChartData = (specName: string) => {
    return selectedComponentData
      .map((component) => {
        const value = component.specifications[specName] || "0"
        const numericValue = Number.parseFloat(value.replace(/[^\d.-]/g, ""))
        return {
          name: component.name,
          value: isNaN(numericValue) ? 0 : numericValue,
          unit: value.replace(/[\d.-]/g, "").trim(),
        }
      })
      .filter((item) => item.value > 0)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/components">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Component Comparison</h1>
            <p className="text-muted-foreground">Compare specifications of multiple electronic components</p>
          </div>

          <div className="ml-auto flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Save/Load
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save or Load Comparisons</DialogTitle>
                  <DialogDescription>Save your current comparison or load a previously saved one.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="comparison-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="comparison-name"
                      placeholder="My Comparison"
                      className="col-span-3"
                      value={comparisonName}
                      onChange={(e) => setComparisonName(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveComparison}
                      disabled={!comparisonName || selectedComponents.length === 0}
                    >
                      Save Current Comparison
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-2 font-medium">Saved Comparisons</h4>
                    {savedComparisons.length > 0 ? (
                      <div className="space-y-2">
                        {savedComparisons.map((comparison, index) => (
                          <div key={index} className="flex items-center justify-between rounded-md border p-2">
                            <div>
                              <p className="font-medium">{comparison.name}</p>
                              <p className="text-xs text-muted-foreground">{comparison.components.length} components</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleLoadComparison(comparison)}>
                                Load
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteComparison(index)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No saved comparisons</p>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Export as CSV
                if (selectedComponentData.length === 0) return

                // Get all unique specs
                const allSpecs = new Set<string>()
                selectedComponentData.forEach((component) => {
                  Object.keys(component.specifications).forEach((spec) => {
                    if (selectedSpecs.includes(spec)) {
                      allSpecs.add(spec)
                    }
                  })
                })

                // Create CSV header
                let csv = "Component,Type,Manufacturer,Package," + Array.from(allSpecs).join(",") + "\n"

                // Add data rows
                selectedComponentData.forEach((component) => {
                  let row = `"${component.name}","${component.type}","${component.manufacturer}","${component.package}",`

                  // Add specs
                  Array.from(allSpecs).forEach((spec) => {
                    const value = component.specifications[spec] || ""
                    row += `"${value}",`
                  })

                  csv += row.slice(0, -1) + "\n" // Remove trailing comma and add newline
                })

                // Create download link
                const blob = new Blob([csv], { type: "text/csv" })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.setAttribute("hidden", "")
                a.setAttribute("href", url)
                a.setAttribute("download", "component_comparison.csv")
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Add Components</CardTitle>
              <CardDescription>Select components to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="search-components">Search Components</Label>
                  <div className="relative">
                    <Input
                      id="search-components"
                      placeholder="Search by name, description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="filter-type">Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="filter-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Transistor">Transistors</SelectItem>
                      <SelectItem value="MOSFET">MOSFETs</SelectItem>
                      <SelectItem value="IC">ICs</SelectItem>
                      <SelectItem value="IGBT">IGBTs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-md h-[300px] overflow-y-auto p-2">
                  {filteredComponents.length > 0 ? (
                    <div className="space-y-2">
                      {filteredComponents.map((component) => (
                        <div
                          key={component.id}
                          className="flex items-center justify-between rounded-md border p-2 hover:bg-accent"
                        >
                          <div>
                            <p className="font-medium">{component.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{component.type}</Badge>
                              <span className="text-xs text-muted-foreground">{component.manufacturer}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleAddComponent(component.id)}
                            disabled={selectedComponents.includes(component.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-muted-foreground">No components found</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Selected Components</CardTitle>
              <CardDescription>Components selected for comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedComponentData.map((component) => (
                  <Badge key={component.id} className="px-3 py-1 text-sm flex items-center gap-2">
                    {component.name}
                    <button
                      onClick={() => handleRemoveComponent(component.id)}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}

                {selectedComponentData.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No components selected. Add components from the left panel.
                  </div>
                )}
              </div>

              {selectedComponentData.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Specifications to Compare</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={selectAllSpecs}>
                        Select All
                      </Button>
                      <Button variant="outline" size="sm" onClick={clearAllSpecs}>
                        Clear All
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {allSpecifications.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spec-${spec}`}
                          checked={selectedSpecs.includes(spec)}
                          onCheckedChange={() => toggleSpecification(spec)}
                        />
                        <Label htmlFor={`spec-${spec}`} className="text-sm">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            {selectedComponentData.length > 0 && (
              <CardFooter>
                <Alert>
                  <AlertDescription>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-sm">
                            <BarChart3 className="h-4 w-4" />
                            <span>Pro Tip: Use the tabs below to view different comparison formats</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Table view shows all specifications side by side</p>
                          <p>Chart view provides visual comparison</p>
                          <p>Parameter view lets you compare specific parameters</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </AlertDescription>
                </Alert>
              </CardFooter>
            )}
          </Card>
        </div>

        {selectedComponentData.length > 0 && (
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="parameters">Parameter View</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specification Comparison</CardTitle>
                  <CardDescription>Side-by-side comparison of component specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Specification</TableHead>
                          {selectedComponentData.map((component) => (
                            <TableHead key={component.id}>
                              <div className="flex flex-col">
                                <span>{component.name}</span>
                                <span className="text-xs text-muted-foreground">{component.manufacturer}</span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Basic information */}
                        <TableRow>
                          <TableCell className="font-medium">Type</TableCell>
                          {selectedComponentData.map((component) => (
                            <TableCell key={`${component.id}-type`}>
                              <Badge
                                variant={
                                  component.type === "Transistor"
                                    ? "default"
                                    : component.type === "MOSFET"
                                      ? "secondary"
                                      : component.type === "IC"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {component.type}
                              </Badge>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Package</TableCell>
                          {selectedComponentData.map((component) => (
                            <TableCell key={`${component.id}-package`}>{component.package}</TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Description</TableCell>
                          {selectedComponentData.map((component) => (
                            <TableCell key={`${component.id}-description`}>{component.description}</TableCell>
                          ))}
                        </TableRow>

                        {/* Get all selected specification keys */}
                        {selectedSpecs.sort().map((specKey) => (
                          <TableRow key={specKey}>
                            <TableCell className="font-medium">{specKey}</TableCell>
                            {selectedComponentData.map((component) => (
                              <TableCell key={`${component.id}-${specKey}`}>
                                {component.specifications[specKey] || "-"}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specification Visualization</CardTitle>
                  <CardDescription>Radar chart comparing component specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  {radarData.length > 0 ? (
                    <RadarComparisonChart data={radarData} components={radarComponents} height={500} />
                  ) : (
                    <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                      No comparable specifications found between selected components
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parameters" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {selectedSpecs.map((spec) => {
                  const chartData = prepareBarChartData(spec)
                  if (chartData.length < 2) return null // Only show if at least 2 components have this spec

                  return (
                    <Card key={spec}>
                      <CardHeader>
                        <CardTitle className="text-base">{spec}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpecificationBarChart data={chartData} height={200} />
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
