"use client"

import { useState, useEffect } from "react"
import { Calculator, Wrench, Database, BarChart3, Zap, Cpu, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataImportExport } from "@/components/data-import-export"
import Link from "next/link"

export default function CalculatorsPage() {
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([])

  useEffect(() => {
    // Load recently used calculators from localStorage
    const stored = localStorage.getItem("recentlyUsedCalculators")
    if (stored) {
      try {
        setRecentlyUsed(JSON.parse(stored))
      } catch (e) {
        console.error("Error parsing recently used calculators:", e)
      }
    }
  }, [])

  const trackCalculatorUsage = (calculatorId: string) => {
    const updated = [calculatorId, ...recentlyUsed.filter((id) => id !== calculatorId)].slice(0, 3)

    setRecentlyUsed(updated)
    localStorage.setItem("recentlyUsedCalculators", JSON.stringify(updated))
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Electronic Calculators</h1>
          <p className="text-muted-foreground mt-2">
            Useful calculators for electronic component calculations and circuit design.
          </p>
        </div>

        <Tabs defaultValue="all-calculators">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-calculators">All Calculators</TabsTrigger>
            <TabsTrigger value="recently-used">Recently Used</TabsTrigger>
          </TabsList>

          <TabsContent value="all-calculators" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Ohm's Law Calculator
                  </CardTitle>
                  <CardDescription>Calculate voltage, current, or resistance using Ohm's Law.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Calculate voltage, current, or resistance using the formula V = I × R. Simply enter any two values
                    to find the third.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("ohms-law")}>
                    <Link href="/calculators#ohms-law">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    LED Resistor Calculator
                  </CardTitle>
                  <CardDescription>Calculate the correct resistor value for LED circuits.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Determine the correct resistance needed to safely power one or more LEDs in a series. Get standard
                    resistor values and power ratings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("led-resistor")}>
                    <Link href="/calculators/led-resistor">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Voltage Divider Calculator
                  </CardTitle>
                  <CardDescription>Calculate resistor values for voltage dividers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Calculate resistor values for voltage dividers and bias networks. Get standard resistor values and
                    power ratings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("voltage-divider")}>
                    <Link href="/calculators#voltage-divider">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    SMPS Design Calculator
                  </CardTitle>
                  <CardDescription>Design buck, boost, and buck-boost converters.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Design switch-mode power supplies with calculations for inductor values, capacitor values, and
                    component ratings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("smps-design")}>
                    <Link href="/calculators#smps">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Op-Amp Circuit Designer
                  </CardTitle>
                  <CardDescription>Calculate component values for op-amp configurations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Design inverting, non-inverting, and differential amplifier circuits with calculations for resistor
                    values and performance metrics.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("opamp-design")}>
                    <Link href="/calculators#opamp">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    RF Matching Network
                  </CardTitle>
                  <CardDescription>Design impedance matching networks for RF circuits.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Design L, T, and π matching networks for RF circuits with calculations for component values and
                    performance metrics.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("rf-matching")}>
                    <Link href="/calculators#rf-matching">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Circuit Reliability Predictor
                  </CardTitle>
                  <CardDescription>Estimate circuit reliability and MTBF.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Estimate how reliable your electronic circuit is by calculating the Mean Time Between Failures
                    (MTBF) and reliability score.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" onClick={() => trackCalculatorUsage("circuit-reliability")}>
                    <Link href="/calculators/circuit-reliability">Open Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recently-used" className="mt-6">
            {recentlyUsed.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {recentlyUsed.includes("ohms-law") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Ohm's Law Calculator
                      </CardTitle>
                      <CardDescription>Calculate voltage, current, or resistance using Ohm's Law.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Calculate voltage, current, or resistance using the formula V = I × R.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators#ohms-law">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("led-resistor") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        LED Resistor Calculator
                      </CardTitle>
                      <CardDescription>Calculate the correct resistor value for LED circuits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Determine the correct resistance needed to safely power LEDs in a series.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators/led-resistor">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("voltage-divider") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5" />
                        Voltage Divider Calculator
                      </CardTitle>
                      <CardDescription>Calculate resistor values for voltage dividers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Calculate resistor values for voltage dividers and bias networks.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators#voltage-divider">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("smps-design") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        SMPS Design Calculator
                      </CardTitle>
                      <CardDescription>Design buck, boost, and buck-boost converters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Design switch-mode power supplies with calculations for component values.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators#smps">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("opamp-design") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Op-Amp Circuit Designer
                      </CardTitle>
                      <CardDescription>Calculate component values for op-amp configurations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Design inverting, non-inverting, and differential amplifier circuits.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators#opamp">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("rf-matching") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        RF Matching Network
                      </CardTitle>
                      <CardDescription>Design impedance matching networks for RF circuits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Design L, T, and π matching networks for RF circuits.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators#rf-matching">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {recentlyUsed.includes("circuit-reliability") && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Cpu className="h-5 w-5" />
                        Circuit Reliability Predictor
                      </CardTitle>
                      <CardDescription>Estimate circuit reliability and MTBF.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Estimate how reliable your electronic circuit is by calculating the MTBF.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/calculators/circuit-reliability">Open Calculator</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No recently used calculators. Start using calculators to see them here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="import-export" className="mt-6">
          <TabsList>
            <TabsTrigger value="import-export">Import/Export</TabsTrigger>
            <TabsTrigger value="data-processing">Data Processing</TabsTrigger>
          </TabsList>
          <TabsContent value="import-export" className="mt-4">
            <DataImportExport />
          </TabsContent>
          <TabsContent value="data-processing" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Component Data Processing</CardTitle>
                <CardDescription>
                  Process and clean component data using the built-in data processing utilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The application includes utilities for processing and cleaning component data from various sources.
                  These utilities can extract part numbers, specifications, equivalents, and datasheet URLs from raw
                  data.
                </p>
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <h3 className="text-sm font-medium mb-2">Processing Features:</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Extract part numbers from component descriptions</li>
                    <li>Parse key-value specifications from text</li>
                    <li>Identify equivalent components</li>
                    <li>Extract datasheet URLs</li>
                    <li>Normalize component categories</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/admin">Go to Admin Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
