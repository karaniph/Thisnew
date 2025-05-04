"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ComponentCard } from "@/components/component-card"
import type { ProcessedComponent } from "@/lib/data-processor"
import { loadComponentData, saveComponentData } from "@/lib/storage-utils"

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

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [componentType, setComponentType] = useState<string>("all")
  const [components, setComponents] = useState<ProcessedComponent[]>([])
  const [loading, setLoading] = useState(true)
  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [packages, setPackages] = useState<string[]>([])
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(24)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Load components using the new storage utility
    try {
      setLoading(true)
      const componentData = loadComponentData()

      if (componentData && componentData.length > 0) {
        setComponents(componentData)

        // Extract unique manufacturers and packages
        const uniqueManufacturers = new Set<string>()
        const uniquePackages = new Set<string>()

        componentData.forEach((component) => {
          if (component.manufacturer) uniqueManufacturers.add(component.manufacturer)
          if (component.package) uniquePackages.add(component.package)
        })

        setManufacturers(Array.from(uniqueManufacturers).sort())
        setPackages(Array.from(uniquePackages).sort())
      } else {
        // If no data in storage, use sample data
        setComponents(sampleComponents)

        // Extract sample data manufacturers and packages
        const uniqueManufacturers = new Set<string>()
        const uniquePackages = new Set<string>()

        sampleComponents.forEach((component) => {
          if (component.manufacturer) uniqueManufacturers.add(component.manufacturer)
          if (component.package) uniquePackages.add(component.package)
        })

        setManufacturers(Array.from(uniqueManufacturers).sort())
        setPackages(Array.from(uniquePackages).sort())
      }

      // Check for search parameter in URL
      const urlSearch = searchParams.get("search")
      if (urlSearch) {
        setSearchQuery(urlSearch)
      }
    } catch (error) {
      console.error("Error loading components:", error)
      // If there's an error, use sample data
      setComponents(sampleComponents)
    } finally {
      setLoading(false)
    }
  }, [searchParams.get("search")])

  const toggleManufacturer = (manufacturer: string) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturer) ? prev.filter((m) => m !== manufacturer) : [...prev, manufacturer],
    )
  }

  const togglePackage = (packageType: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageType) ? prev.filter((p) => p !== packageType) : [...prev, packageType],
    )
  }

  const resetFilters = () => {
    setSelectedManufacturers([])
    setSelectedPackages([])
  }

  const paginate = (items: ProcessedComponent[]) => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return items.slice(indexOfFirstItem, indexOfLastItem)
  }

  const groupedComponents = () => {
    const groups: Record<string, ProcessedComponent[]> = {
      Transistor: [],
      MOSFET: [],
      IC: [],
      IGBT: [],
      Other: [],
    }

    // Use paginated data
    paginate(filteredComponents).forEach((component) => {
      if (component.type && groups[component.type]) {
        groups[component.type].push(component)
      } else {
        groups.Other.push(component)
      }
    })

    return groups
  }

  // Filter components based on search query, selected type, manufacturers, and packages
  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (component.description && component.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (component.manufacturer && component.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = componentType === "all" || component.type === componentType

    const matchesManufacturer =
      selectedManufacturers.length === 0 ||
      (component.manufacturer && selectedManufacturers.includes(component.manufacturer))

    const matchesPackage =
      selectedPackages.length === 0 || (component.package && selectedPackages.includes(component.package))

    return matchesSearch && matchesType && matchesManufacturer && matchesPackage
  })

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Electronic Components</h1>
        <p className="text-muted-foreground">
          Browse our database of electronic components including transistors, MOSFETs, ICs, and IGBTs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, description, or manufacturer..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={componentType} onValueChange={setComponentType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Component Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types ({components.length})</SelectItem>
                <SelectItem value="Transistor">
                  Transistors ({components.filter((c) => c.type === "Transistor").length})
                </SelectItem>
                <SelectItem value="MOSFET">MOSFETs ({components.filter((c) => c.type === "MOSFET").length})</SelectItem>
                <SelectItem value="IC">ICs ({components.filter((c) => c.type === "IC").length})</SelectItem>
                <SelectItem value="IGBT">IGBTs ({components.filter((c) => c.type === "IGBT").length})</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Components</SheetTitle>
                  <SheetDescription>Refine your component search with additional filters.</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <h3 className="mb-2 text-sm font-medium">Manufacturers</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {manufacturers.map((manufacturer) => (
                      <div key={manufacturer} className="flex items-center space-x-2">
                        <Checkbox
                          id={`manufacturer-${manufacturer}`}
                          checked={selectedManufacturers.includes(manufacturer)}
                          onCheckedChange={() => toggleManufacturer(manufacturer)}
                        />
                        <Label htmlFor={`manufacturer-${manufacturer}`}>{manufacturer}</Label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <h3 className="mb-2 text-sm font-medium">Package Types</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {packages.map((packageType) => (
                      <div key={packageType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`package-${packageType}`}
                          checked={selectedPackages.includes(packageType)}
                          onCheckedChange={() => togglePackage(packageType)}
                        />
                        <Label htmlFor={`package-${packageType}`}>{packageType}</Label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[200px] rounded-md border bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredComponents.length > 0 ? (
          <div className="space-y-8 mt-6">
            {Object.entries(groupedComponents()).map(([type, components]) =>
              components.length > 0 ? (
                <div key={type} className="space-y-4">
                  <h2 className="text-2xl font-semibold border-b pb-2">
                    {type}s ({components.length})
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {components.map((component) => (
                      <ComponentCard key={component.id} {...component} />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center mt-6">
            <p className="text-muted-foreground">
              {components.length === 0
                ? "No components found in the database."
                : "No components match your search criteria. Try adjusting your filters."}
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                saveComponentData(sampleComponents)
                setComponents(sampleComponents)
              }}
            >
              Load Sample Data
            </Button>
          </div>
        )}
        {filteredComponents.length > itemsPerPage && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.ceil(filteredComponents.length / itemsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-8 h-8 p-0"
                >
                  {i + 1}
                </Button>
              )).slice(
                Math.max(0, currentPage - 3),
                Math.min(Math.ceil(filteredComponents.length / itemsPerPage), currentPage + 2),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredComponents.length / itemsPerPage)))
              }
              disabled={currentPage === Math.ceil(filteredComponents.length / itemsPerPage)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
