"use client"

import { useState } from "react"
import { Calculator, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function LedResistorCalculatorPage() {
  const [supplyVoltage, setSupplyVoltage] = useState<string>("")
  const [forwardVoltage, setForwardVoltage] = useState<string>("")
  const [ledCurrent, setLedCurrent] = useState<string>("")
  const [ledCount, setLedCount] = useState<string>("1")
  const [results, setResults] = useState<{
    exactResistance: number
    standardResistance: number
    powerDissipation: number
    highPowerWarning: boolean
    circuitDiagram: boolean
  } | null>(null)

  // Standard E12 resistor values
  const e12Values = [
    1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100,
    120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600,
    6800, 8200, 10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000, 100000, 120000,
    150000, 180000, 220000, 270000, 330000, 390000, 470000, 560000, 680000, 820000, 1000000,
  ]

  const calculateResistor = () => {
    // Parse input values
    const supplyVoltageVal = Number.parseFloat(supplyVoltage)
    const forwardVoltageVal = Number.parseFloat(forwardVoltage)
    const ledCurrentVal = Number.parseFloat(ledCurrent)
    const ledCountVal = Number.parseInt(ledCount)

    // Calculate the exact resistance needed
    // R = (Vs - (Vf * n)) / I
    // Where:
    // Vs = Supply voltage
    // Vf = LED forward voltage
    // n = Number of LEDs in series
    // I = LED current in amps
    const totalForwardVoltage = forwardVoltageVal * ledCountVal
    const currentInAmps = ledCurrentVal / 1000 // Convert mA to A
    const exactResistance = (supplyVoltageVal - totalForwardVoltage) / currentInAmps

    // Find the nearest standard E12 resistor value
    const standardResistance = findNearestStandardResistor(exactResistance)

    // Calculate power dissipation in the resistor
    // P = I² * R
    const powerDissipation = currentInAmps * currentInAmps * standardResistance

    // Check if power dissipation is too high (> 0.25W for standard resistors)
    const highPowerWarning = powerDissipation > 0.25

    // Set results
    setResults({
      exactResistance,
      standardResistance,
      powerDissipation,
      highPowerWarning,
      circuitDiagram: true,
    })
  }

  // Find the nearest standard E12 resistor value
  const findNearestStandardResistor = (value: number): number => {
    // Find the decade (power of 10)
    const decade = Math.floor(Math.log10(value))
    const normalizedValue = value / Math.pow(10, decade)

    // Find the closest standard value in the normalized range
    let closestValue = e12Values[0]
    let minDiff = Math.abs(normalizedValue - e12Values[0])

    for (const stdValue of e12Values) {
      const diff = Math.abs(normalizedValue - stdValue)
      if (diff < minDiff) {
        minDiff = diff
        closestValue = stdValue
      }
    }

    // Return the actual resistor value
    return closestValue * Math.pow(10, decade)
  }

  // Format resistance value for display
  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MΩ`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`
    } else {
      return `${value.toFixed(2)} Ω`
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/calculators">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">LED Series Resistor Calculator</h1>
            <p className="text-muted-foreground">Calculate the correct resistor value for your LED circuit.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                LED Circuit Parameters
              </CardTitle>
              <CardDescription>Enter your LED circuit details to calculate the required resistor.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                  <Input
                    id="supply-voltage"
                    type="number"
                    placeholder="Enter supply voltage"
                    value={supplyVoltage}
                    onChange={(e) => setSupplyVoltage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the voltage of your power source (e.g., 9V battery, 12V adapter, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forward-voltage">LED Forward Voltage (V)</Label>
                  <Input
                    id="forward-voltage"
                    type="number"
                    placeholder="Enter LED forward voltage"
                    value={forwardVoltage}
                    onChange={(e) => setForwardVoltage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Typically 2V for red LEDs and 3.2V for white/blue LEDs. Check your LED's datasheet.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="led-current">LED Current (mA)</Label>
                  <Input
                    id="led-current"
                    type="number"
                    placeholder="Enter LED current in mA"
                    value={ledCurrent}
                    onChange={(e) => setLedCurrent(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Most standard LEDs operate between 10mA and 20mA.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="led-count">Number of LEDs in Series</Label>
                  <Input
                    id="led-count"
                    type="number"
                    placeholder="Enter number of LEDs"
                    value={ledCount}
                    onChange={(e) => setLedCount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    If connecting multiple LEDs in series, enter the total count.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={calculateResistor}
                className="w-full"
                disabled={!supplyVoltage || !forwardVoltage || !ledCurrent || !ledCount}
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>

          {results ? (
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Calculated resistor value for your LED circuit.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Required Resistor Value</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{formatResistance(results.standardResistance)}</span>
                    <Badge>E12 Standard Value</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Exact calculated value: {formatResistance(results.exactResistance)}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Power Dissipation</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{results.powerDissipation.toFixed(2)} W</span>
                    {results.highPowerWarning && <Badge variant="destructive">High Power</Badge>}
                  </div>
                  {results.highPowerWarning && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertTitle>Warning: High Power Dissipation</AlertTitle>
                      <AlertDescription>
                        The calculated power dissipation exceeds 0.25W. Use a resistor with an appropriate power rating
                        (at least {Math.ceil(results.powerDissipation * 2) / 2}W).
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Circuit Diagram</h3>
                  <div className="p-4 bg-muted rounded-md flex justify-center">
                    <svg width="300" height="120" viewBox="0 0 300 120" className="text-foreground">
                      {/* Power supply */}
                      <text x="10" y="60" className="text-xs">
                        V+
                      </text>
                      <line x1="30" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="2" />

                      {/* Resistor */}
                      <rect x="80" y="50" width="40" height="20" fill="white" stroke="currentColor" strokeWidth="2" />
                      <text x="85" y="65" className="text-xs">
                        {formatResistance(results.standardResistance)}
                      </text>
                      <line x1="120" y1="60" x2="150" y2="60" stroke="currentColor" strokeWidth="2" />

                      {/* LEDs */}
                      {Array.from({ length: Number.parseInt(ledCount) }).map((_, i) => {
                        const xOffset = 150 + i * 30
                        return (
                          <g key={i}>
                            <polygon
                              points={`${xOffset},50 ${xOffset + 20},60 ${xOffset},70 ${xOffset},50`}
                              fill="white"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1={xOffset + 10}
                              y1="45"
                              x2={xOffset + 10}
                              y2="75"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeDasharray="2,1"
                            />
                            <line
                              x1={xOffset + 20}
                              y1="60"
                              x2={i === Number.parseInt(ledCount) - 1 ? 270 : xOffset + 30}
                              y2="60"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </g>
                        )
                      })}

                      {/* Ground */}
                      <line x1="270" y1="60" x2="270" y2="90" stroke="currentColor" strokeWidth="2" />
                      <line x1="260" y1="90" x2="280" y2="90" stroke="currentColor" strokeWidth="2" />
                      <line x1="263" y1="95" x2="277" y2="95" stroke="currentColor" strokeWidth="2" />
                      <line x1="266" y1="100" x2="274" y2="100" stroke="currentColor" strokeWidth="2" />
                      <text x="260" y="115" className="text-xs">
                        GND
                      </text>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Enter your parameters and click Calculate to see results.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                <Calculator className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Fill in the LED circuit parameters and click "Calculate" to determine the required resistor value.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use the LED Series Resistor Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                This calculator makes it easy to determine the correct resistance needed to safely power one or more
                LEDs in a series. Simply enter your power supply voltage, LED forward voltage, LED current, and the
                number of LEDs in series, and let our tool do the rest.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">LED Forward Voltage Reference</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Red LEDs:</strong> 1.8V - 2.2V (typically 2.0V)
                    </li>
                    <li>
                      <strong>Green LEDs:</strong> 2.0V - 2.4V (typically 2.2V)
                    </li>
                    <li>
                      <strong>Blue LEDs:</strong> 2.8V - 3.4V (typically 3.2V)
                    </li>
                    <li>
                      <strong>White LEDs:</strong> 2.8V - 3.4V (typically 3.2V)
                    </li>
                    <li>
                      <strong>Yellow LEDs:</strong> 1.8V - 2.2V (typically 2.0V)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Why Use This Calculator?</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Instantly calculates the exact resistor needed</li>
                    <li>Provides a standard resistor value suggestion</li>
                    <li>Warns if power dissipation is too high</li>
                    <li>Displays an interactive circuit diagram</li>
                    <li>100% free and easy to use</li>
                  </ul>
                  <Alert className="mt-4">
                    <AlertTitle>Pro Tip</AlertTitle>
                    <AlertDescription>
                      For high-brightness LEDs or when driving multiple LEDs, consider using a constant current driver
                      instead of a simple resistor for better efficiency and brightness control.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
