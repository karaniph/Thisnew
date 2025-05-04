"use client"

import { useState, useEffect } from "react"
import { Search, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { findEquivalentComponents } from "@/lib/component-matcher"
import type { ProcessedComponent } from "@/lib/data-processor"

export default function EquivalentsPage() {
  const [componentName, setComponentName] = useState("")
  const [componentType, setComponentType] = useState("all")
  const [searchResults, setSearchResults] = useState<null | {
    original: ProcessedComponent
    equivalents: Array<{
      id: string
      name: string
      manufacturer: string
      matchScore?: number
      differences: Array<{
        parameter: string
        original: string
        equivalent: string
      }>
    }>
  }>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [componentDatabase, setComponentDatabase] = useState<ProcessedComponent[]>([])

  // Load component database from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("componentDatabase")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setComponentDatabase(Array.isArray(parsedData) ? parsedData : [])
      } catch (error) {
        console.error("Error parsing component database:", error)
      }
    }
  }, []) // Empty dependency array to run only once

  // Update the component search logic to be more robust
  const handleSearch = () => {
    if (!componentName) return

    setIsSearching(true)
    setSearchResults(null)

    // Find the component in the database - make search case insensitive
    const component = componentDatabase.find(
      (c) =>
        c.name.toLowerCase() === componentName.toLowerCase() ||
        c.id.toLowerCase() === componentName.toLowerCase() ||
        (c.partNumber && c.partNumber.toLowerCase() === componentName.toLowerCase()),
    )

    if (component) {
      try {
        // Find equivalent components with type filtering
        const filteredComponents =
          componentType === "all"
            ? componentDatabase.filter((c) => c.id !== component.id)
            : componentDatabase.filter((c) => c.type === componentType && c.id !== component.id)

        const equivalents = findEquivalentComponents(
          component,
          filteredComponents,
          50, // Minimum match score
        )

        setSearchResults({
          original: component,
          equivalents: equivalents.map((eq) => ({
            id: eq.component.id,
            name: eq.component.name,
            manufacturer: eq.component.manufacturer || "Unknown",
            matchScore: eq.matchScore,
            differences: eq.differences,
          })),
        })
      } catch (error) {
        console.error("Error finding equivalents:", error)
        // Show a message to the user
        setSearchResults({
          original: component,
          equivalents: [],
        })
      }
    }

    setIsSearching(false)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Equivalent Finder</h1>
          <p className="text-muted-foreground mt-2">
            Find equivalent or replacement components when your preferred part is unavailable.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search for Equivalents</CardTitle>
            <CardDescription>Enter a component name or part number to find equivalent components.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Enter component name or part number..."
                  className="pl-8"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                />
              </div>

              <Select value={componentType} onValueChange={setComponentType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Component Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Transistor">Transistor</SelectItem>
                  <SelectItem value="MOSFET">MOSFET</SelectItem>
                  <SelectItem value="IC">IC</SelectItem>
                  <SelectItem value="IGBT">IGBT</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} disabled={isSearching || !componentName}>
                {isSearching ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  "Find Equivalents"
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between text-xs text-muted-foreground">
            <p>Try searching for components in your database</p>
            {componentDatabase.length === 0 && (
              <p>
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                  <a href="/admin">Upload components first</a>
                </Button>
              </p>
            )}
          </CardFooter>
        </Card>

        {componentDatabase.length > 1000 && (
          <Alert className="mt-4">
            <AlertDescription>
              Your database contains {componentDatabase.length} components. For better performance, try to narrow your
              search by selecting a specific component type.
            </AlertDescription>
          </Alert>
        )}

        {searchResults ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Component</CardTitle>
                <CardDescription>Details of the component you're looking to replace.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold">{searchResults.original.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchResults.original.manufacturer || "Unknown"} • <Badge>{searchResults.original.type}</Badge>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Specifications:</h4>
                    <ul className="text-sm space-y-1">
                      {Object.entries(searchResults.original.specifications).map(([key, value]) => (
                        <li key={key}>
                          <span className="text-muted-foreground">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {searchResults.equivalents.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mt-8">Equivalent Components</h2>
                <p className="text-muted-foreground">
                  The following components can be used as replacements with varying degrees of compatibility.
                </p>

                <div className="space-y-4">
                  {searchResults.equivalents.map((equivalent) => (
                    <Card key={equivalent.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{equivalent.name}</CardTitle>
                          <Badge
                            variant={
                              equivalent.matchScore && equivalent.matchScore >= 90
                                ? "default"
                                : equivalent.matchScore && equivalent.matchScore >= 80
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {equivalent.matchScore ? `${equivalent.matchScore}% Match` : "Match N/A"}
                          </Badge>
                        </div>
                        <CardDescription>{equivalent.manufacturer}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-sm font-medium mb-2">Parameter Differences:</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Parameter</TableHead>
                              <TableHead>Original</TableHead>
                              <TableHead>Equivalent</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {equivalent.differences.map((diff, index) => (
                              <TableRow key={index}>
                                <TableCell>{diff.parameter}</TableCell>
                                <TableCell>{diff.original}</TableCell>
                                <TableCell>{diff.equivalent}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="ml-auto" asChild>
                          <a href={`/components/${equivalent.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Alert>
                <AlertTitle>No equivalents found</AlertTitle>
                <AlertDescription>
                  We couldn't find any equivalent components for "{componentName}". Try a different component or adjust
                  your search criteria.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : componentName && !isSearching ? (
          <Alert>
            <AlertTitle>No component found</AlertTitle>
            <AlertDescription>
              We couldn't find a component named "{componentName}" in the database. Please check your spelling or try a
              different component.
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
    </div>
  )
}
