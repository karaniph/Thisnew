"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Share2, Lock, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircuitSchematic } from "@/components/circuit-schematic"
import { getCircuitTemplateById } from "@/lib/circuit-templates"

export default function CircuitTemplatePage({ params }: { params: { id: string } }) {
  const [template, setTemplate] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the circuit template data
    const fetchTemplate = async () => {
      setLoading(true)
      try {
        const templateData = await getCircuitTemplateById(params.id)
        setTemplate(templateData)
      } catch (error) {
        console.error("Error fetching template:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplate()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex flex-col space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-muted rounded animate-pulse"></div>
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="h-[300px] rounded-md border bg-muted animate-pulse"></div>
            <div className="h-[300px] rounded-md border bg-muted animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold">Circuit Template Not Found</h1>
          <p className="text-muted-foreground mt-2">The circuit template you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link href="/circuit-templates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Circuit Templates
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get difficulty badge variant
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "default"
      case "intermediate":
        return "secondary"
      case "advanced":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/circuit-templates">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{template.name}</h1>
              {template.isPremium && (
                <Badge variant="outline" className="ml-2">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{template.description}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {template.isPremium && (
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>Premium Circuit Design</AlertTitle>
            <AlertDescription>
              This is a premium circuit design. Upgrade to access the full schematic, PCB layout, and detailed
              instructions.
              <div className="mt-2">
                <Button>Upgrade to Premium</Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Circuit Schematic</CardTitle>
              <CardDescription>Visual representation of the circuit design</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className={template.isPremium ? "filter blur-sm" : ""}>
                <CircuitSchematic circuitId={template.id} />
              </div>
              {template.isPremium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 p-4 rounded-md shadow-lg text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Premium Content</p>
                    <p className="text-sm text-muted-foreground">Upgrade to view the full schematic</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Information about this circuit design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Category:</div>
                  <div className="text-sm capitalize">{template.category}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Difficulty:</div>
                  <div className="text-sm">
                    <Badge variant={getDifficultyBadge(template.difficulty)}>
                      {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Power Supply:</div>
                  <div className="text-sm">{template.powerSupply || "5-12V DC"}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Estimated Build Time:</div>
                  <div className="text-sm">{template.buildTime || "30-60 minutes"}</div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Required Components:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {template.components.map((component: string, index: number) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Required Tools:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {(template.tools || ["Soldering iron", "Wire cutters", "Multimeter"]).map(
                      (tool: string, index: number) => (
                        <li key={index}>{tool}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="instructions">
          <TabsList>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="theory">Circuit Theory</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="instructions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Assembly Instructions</CardTitle>
                <CardDescription>Step-by-step guide to build this circuit</CardDescription>
              </CardHeader>
              <CardContent>
                {template.isPremium ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                    <p className="text-muted-foreground max-w-md">
                      Detailed assembly instructions are available to premium users. Upgrade to access step-by-step
                      instructions with images.
                    </p>
                    <Button className="mt-4">Upgrade to Premium</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {template.instructions?.map((instruction: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{instruction.title}</h3>
                          <p className="text-sm text-muted-foreground">{instruction.description}</p>
                          {instruction.note && (
                            <Alert className="mt-2">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>{instruction.note}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Circuit Theory</CardTitle>
                <CardDescription>How this circuit works and the principles behind it</CardDescription>
              </CardHeader>
              <CardContent>
                {template.isPremium ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                    <p className="text-muted-foreground max-w-md">
                      Detailed circuit theory and explanations are available to premium users. Upgrade to access
                      in-depth analysis of how this circuit works.
                    </p>
                    <Button className="mt-4">Upgrade to Premium</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p>{template.theory?.overview || "This circuit demonstrates fundamental electronic principles."}</p>

                    <h3 className="text-lg font-medium mt-6 mb-2">Key Concepts</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {(
                        template.theory?.concepts || [
                          "Basic circuit analysis",
                          "Component functionality",
                          "Electronic principles",
                        ]
                      ).map((concept: string, index: number) => (
                        <li key={index}>{concept}</li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-medium mt-6 mb-2">Circuit Analysis</h3>
                    <p>
                      {template.theory?.analysis ||
                        "The circuit operates by applying basic electronic principles to achieve the desired functionality."}
                    </p>

                    {template.theory?.equations && (
                      <>
                        <h3 className="text-lg font-medium mt-6 mb-2">Key Equations</h3>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                          {template.theory.equations.map((equation: string, index: number) => (
                            <div key={index} className="mb-2">
                              {equation}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting Guide</CardTitle>
                <CardDescription>Common issues and how to resolve them</CardDescription>
              </CardHeader>
              <CardContent>
                {template.isPremium ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Premium Content</h3>
                    <p className="text-muted-foreground max-w-md">
                      Detailed troubleshooting guides are available to premium users. Upgrade to access solutions to
                      common problems.
                    </p>
                    <Button className="mt-4">Upgrade to Premium</Button>
                  </div>
                ) : (
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Issue</TableHead>
                          <TableHead>Possible Cause</TableHead>
                          <TableHead>Solution</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(
                          template.troubleshooting || [
                            {
                              issue: "Circuit doesn't power on",
                              cause: "Incorrect power connection",
                              solution: "Check power supply polarity and voltage",
                            },
                            {
                              issue: "Component overheating",
                              cause: "Incorrect component value or connection",
                              solution: "Verify component values and check for shorts",
                            },
                            {
                              issue: "Unexpected behavior",
                              cause: "Design implementation error",
                              solution: "Double-check all connections against the schematic",
                            },
                          ]
                        ).map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{item.issue}</TableCell>
                            <TableCell>{item.cause}</TableCell>
                            <TableCell>{item.solution}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Testing Tips</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {(
                          template.testingTips || [
                            "Use a multimeter to verify voltages at key points",
                            "Start with lower voltage to test functionality",
                            "Check for proper grounding",
                          ]
                        ).map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Related Circuit Designs</CardTitle>
            <CardDescription>Similar projects you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {(
                template.relatedCircuits || [
                  {
                    id: "simple-led",
                    name: "Simple LED Circuit",
                    difficulty: "beginner",
                  },
                  {
                    id: "astable-multivibrator",
                    name: "Astable Multivibrator",
                    difficulty: "intermediate",
                  },
                  {
                    id: "transistor-regulator",
                    name: "Transistor Voltage Regulator",
                    difficulty: "beginner",
                  },
                ]
              ).map((related: any) => (
                <Card key={related.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{related.name}</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/circuit-templates/${related.id}`}>View Circuit</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
