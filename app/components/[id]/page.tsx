"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SpecificationBarChart } from "@/components/charts/specification-bar-chart"
import { prepareSpecificationChartData } from "@/lib/chart-utils"
import { findEquivalentComponents } from "@/lib/component-matcher"
import type { ProcessedComponent } from "@/lib/data-processor"
import { ErrorBoundary } from "@/components/error-boundary"
import { loadComponentById } from "@/lib/storage-utils"
import { loadComponentData } from "@/lib/data-loader"

export default function ComponentDetailPage({ params }: { params: { id: string } }) {
  const [component, setComponent] = useState<ProcessedComponent | null>(null)
  const [loading, setLoading] = useState(true)
  const [equivalents, setEquivalents] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load component data using the new storage utility
    const fetchComponentData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the new utility to load component by ID
        const foundComponent = loadComponentById(params.id) as ProcessedComponent | null

        if (foundComponent) {
          console.log("Found component:", foundComponent)
          setComponent(foundComponent)

          // Load all components to find equivalents
          const allComponents = loadComponentData()

          if (allComponents && allComponents.length > 0) {
            // Find equivalents
            const foundEquivalents = findEquivalentComponents(
              foundComponent,
              allComponents.filter((c) => c.id !== foundComponent.id),
              70,
            )
            setEquivalents(foundEquivalents)
          }
        } else {
          console.error("Component not found:", params.id)
          setError("Component not found")
        }
      } catch (err) {
        console.error("Error loading component:", err)
        setError("Error loading component data")
      } finally {
        setLoading(false)
      }
    }

    fetchComponentData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex flex-col space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse"></div>
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div className="h-[200px] rounded-md border bg-muted animate-pulse"></div>
            <div className="h-[200px] rounded-md border bg-muted animate-pulse md:col-span-2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !component) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold">Component Not Found</h1>
          <p className="text-muted-foreground mt-2">
            {error || "The component you're looking for doesn't exist in our database."}
          </p>
          <Button asChild className="mt-6">
            <Link href="/components">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Components
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Prepare chart data
  const chartData = component.specifications ? prepareSpecificationChartData(component.specifications) : []

  // Filter chart data to only include numeric values with voltage units
  const voltageData = chartData.filter((item) => item.unit === "V")

  // Filter chart data to only include numeric values with current units
  const currentData = chartData.filter((item) => item.unit === "mA" || item.unit === "A")

  // Add a check for specifications before rendering
  const hasSpecifications = component.specifications && Object.keys(component.specifications).length > 0

  return (
    <ErrorBoundary>
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
              <h1 className="text-3xl font-bold">{component.name}</h1>
              <p className="text-muted-foreground">{component.description}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              {component.datasheetUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={component.datasheetUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Datasheet
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Component Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Type:</div>
                    <div className="text-sm">
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
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Manufacturer:</div>
                    <div className="text-sm">{component.manufacturer}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Package:</div>
                    <div className="text-sm">{component.package}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                {hasSpecifications ? (
                  <Table>
                    <TableBody>
                      {Object.entries(component.specifications).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No specifications available for this component.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="visualizations">
            <TabsList>
              <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
              <TabsTrigger value="equivalents">Equivalent Components</TabsTrigger>
            </TabsList>

            <TabsContent value="visualizations" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Voltage Specifications</CardTitle>
                    <CardDescription>Visual comparison of voltage parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {voltageData.length > 0 ? (
                      <SpecificationBarChart data={voltageData} height={250} />
                    ) : (
                      <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                        No voltage data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Specifications</CardTitle>
                    <CardDescription>Visual comparison of current parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentData.length > 0 ? (
                      <SpecificationBarChart data={currentData} height={250} />
                    ) : (
                      <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                        No current data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>All Specifications</CardTitle>
                    <CardDescription>Complete visualization of component parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.length > 0 ? (
                      <SpecificationBarChart data={chartData} height={300} />
                    ) : (
                      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                        No specification data available for visualization
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="equivalents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equivalent Components</CardTitle>
                  <CardDescription>Alternative components that can be used as replacements.</CardDescription>
                </CardHeader>
                <CardContent>
                  {equivalents.length > 0 ? (
                    <div className="space-y-4">
                      {equivalents.map((eq) => (
                        <div key={eq.component.id} className="border rounded-md p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-medium">{eq.component.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {eq.component.manufacturer} • <Badge>{eq.component.type}</Badge>
                              </p>
                            </div>
                            <Badge
                              variant={eq.matchScore >= 90 ? "default" : eq.matchScore >= 80 ? "secondary" : "outline"}
                            >
                              {eq.matchScore}% Match
                            </Badge>
                          </div>

                          <h4 className="text-sm font-medium mt-4 mb-2">Key Differences:</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Parameter</TableHead>
                                <TableHead>Original</TableHead>
                                <TableHead>Equivalent</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {eq.differences.slice(0, 5).map((diff: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell>{diff.parameter}</TableCell>
                                  <TableCell>{diff.original}</TableCell>
                                  <TableCell>{diff.equivalent}</TableCell>
                                </TableRow>
                              ))}
                              {eq.differences.length > 5 && (
                                <TableRow>
                                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                                    And {eq.differences.length - 5} more differences...
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>

                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/components/${eq.component.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                      No equivalent components found for this component.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  )
}
