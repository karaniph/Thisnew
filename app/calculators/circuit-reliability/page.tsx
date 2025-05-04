"use client"

import { useState } from "react"
import { Calculator, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CircuitReliabilityCalculatorPage() {
  const [failureRate, setFailureRate] = useState<string>("100")
  const [temperature, setTemperature] = useState<string>("25")
  const [humidity, setHumidity] = useState<string>("50")
  const [vibration, setVibration] = useState<string>("5")
  const [dutyCycle, setDutyCycle] = useState<string>("50")
  const [lifespan, setLifespan] = useState<string>("5")
  const [results, setResults] = useState<{
    mtbf: number
    reliabilityScore: number
    componentRatings: {
      temperature: number
      humidity: number
      vibration: number
      dutyCycle: number
    }
    suggestions: string[]
  } | null>(null)

  const calculateReliability = () => {
    // Parse input values
    const failureRateVal = Number.parseFloat(failureRate)
    const temperatureVal = Number.parseFloat(temperature)
    const humidityVal = Number.parseFloat(humidity)
    const vibrationVal = Number.parseFloat(vibration)
    const dutyCycleVal = Number.parseFloat(dutyCycle)
    const lifespanVal = Number.parseFloat(lifespan)

    // Calculate temperature factor (higher temps reduce reliability)
    const tempFactor = temperatureVal <= 25 ? 1 : 1 - (temperatureVal - 25) / 100

    // Calculate humidity factor (higher humidity reduces reliability)
    const humidityFactor = humidityVal <= 60 ? 1 : 1 - (humidityVal - 60) / 200

    // Calculate vibration factor (higher vibration reduces reliability)
    const vibrationFactor = 1 - vibrationVal / 20

    // Calculate duty cycle factor (higher duty cycle reduces reliability)
    const dutyCycleFactor = 1 - dutyCycleVal / 200

    // Calculate MTBF (Mean Time Between Failures) in hours
    // Base formula: MTBF = 1,000,000 / (failure rate * environmental factors)
    const environmentalFactor = 1 / (tempFactor * humidityFactor * vibrationFactor * dutyCycleFactor)
    const mtbf = 1000000 / (failureRateVal * environmentalFactor)

    // Calculate reliability score (0-100%)
    // Using reliability function: R(t) = e^(-t/MTBF)
    // Where t is the expected lifespan in hours
    const t = lifespanVal * 365 * 24 // Convert years to hours
    const reliabilityScore = Math.exp(-t / mtbf) * 100

    // Generate component ratings (0-10 scale)
    const temperatureRating = Math.round(tempFactor * 10)
    const humidityRating = Math.round(humidityFactor * 10)
    const vibrationRating = Math.round(vibrationFactor * 10)
    const dutyCycleRating = Math.round(dutyCycleFactor * 10)

    // Generate improvement suggestions
    const suggestions: string[] = []
    if (temperatureRating < 7) {
      suggestions.push("Consider improving cooling or reducing operating temperature.")
    }
    if (humidityRating < 7) {
      suggestions.push("Consider adding humidity control or protective coating.")
    }
    if (vibrationRating < 7) {
      suggestions.push("Add vibration dampening or improve mechanical stability.")
    }
    if (dutyCycleRating < 7) {
      suggestions.push("Reduce duty cycle or implement power cycling strategies.")
    }
    if (reliabilityScore < 70) {
      suggestions.push("Consider using components with lower failure rates.")
    }

    // Set results
    setResults({
      mtbf,
      reliabilityScore,
      componentRatings: {
        temperature: temperatureRating,
        humidity: humidityRating,
        vibration: vibrationRating,
        dutyCycle: dutyCycleRating,
      },
      suggestions,
    })
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-green-500"
    if (rating >= 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getReliabilityBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    if (score >= 50) return "outline"
    return "destructive"
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
            <h1 className="text-3xl font-bold">Circuit Reliability Predictor</h1>
            <p className="text-muted-foreground">
              Estimate how reliable your electronic circuit is by calculating the Mean Time Between Failures (MTBF).
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Design Parameters
              </CardTitle>
              <CardDescription>Enter your circuit design details to calculate reliability.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="failure-rate">Component Failure Rate (failures per million hours)</Label>
                  <Input
                    id="failure-rate"
                    type="number"
                    placeholder="Enter failure rate"
                    value={failureRate}
                    onChange={(e) => setFailureRate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Operating Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="Enter operating temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="Enter humidity percentage"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vibration">Vibration Level (1-10)</Label>
                  <Input
                    id="vibration"
                    type="number"
                    placeholder="Enter vibration level"
                    value={vibration}
                    onChange={(e) => setVibration(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duty-cycle">Duty Cycle (%)</Label>
                  <Input
                    id="duty-cycle"
                    type="number"
                    placeholder="Enter duty cycle percentage"
                    value={dutyCycle}
                    onChange={(e) => setDutyCycle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifespan">Expected Lifespan (years)</Label>
                  <Input
                    id="lifespan"
                    type="number"
                    placeholder="Enter expected lifespan"
                    value={lifespan}
                    onChange={(e) => setLifespan(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateReliability} className="w-full">
                Calculate Reliability
              </Button>
            </CardFooter>
          </Card>

          {results ? (
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Reliability analysis for your circuit design.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Reliability Score</h3>
                    <Badge variant={getReliabilityBadgeVariant(results.reliabilityScore)}>
                      {results.reliabilityScore.toFixed(2)}%
                    </Badge>
                  </div>
                  <Progress value={results.reliabilityScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Mean Time Between Failures (MTBF)</h3>
                  <p className="text-2xl font-bold">{Math.round(results.mtbf).toLocaleString()} hours</p>
                  <p className="text-sm text-muted-foreground">({(results.mtbf / 8760).toFixed(1)} years)</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Component-Level Analysis</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Temperature Impact</span>
                      <span className="text-sm">{results.componentRatings.temperature}/10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${getRatingColor(results.componentRatings.temperature)}`}
                        style={{ width: `${results.componentRatings.temperature * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Humidity Impact</span>
                      <span className="text-sm">{results.componentRatings.humidity}/10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${getRatingColor(results.componentRatings.humidity)}`}
                        style={{ width: `${results.componentRatings.humidity * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Vibration Impact</span>
                      <span className="text-sm">{results.componentRatings.vibration}/10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${getRatingColor(results.componentRatings.vibration)}`}
                        style={{ width: `${results.componentRatings.vibration * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Duty Cycle Impact</span>
                      <span className="text-sm">{results.componentRatings.dutyCycle}/10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${getRatingColor(results.componentRatings.dutyCycle)}`}
                        style={{ width: `${results.componentRatings.dutyCycle * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {results.suggestions.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Improvement Suggestions</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {results.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
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
                  Fill in the design parameters and click "Calculate Reliability" to see your circuit's reliability
                  analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About Circuit Reliability Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The Circuit Reliability Predictor is a tool designed to help engineers, designers, and hobbyists
                estimate how reliable an electronic circuit is by calculating the Mean Time Between Failures (MTBF) and
                providing a reliability score based on key factors like temperature, humidity, and vibration.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reliability Estimation – Get an accurate MTBF and reliability score (0–100%).</li>
                    <li>Component-Level Analysis – Identify weak points in your circuit with detailed ratings.</li>
                    <li>Stress Analysis – Check how temperature, humidity, and vibration affect your circuit.</li>
                    <li>User-Friendly Design – Easy-to-use interface with clear results.</li>
                    <li>Actionable Insights – Get suggestions to improve your circuit's lifespan and performance.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Why Use This Calculator?</h3>
                  <p>
                    By using the Circuit Reliability Predictor, you can prevent failures, optimize your designs, and
                    build long-lasting and efficient electronic systems. Get started today and take your circuit designs
                    to the next level!
                  </p>
                  <Alert className="mt-4">
                    <AlertTitle>Pro Tip</AlertTitle>
                    <AlertDescription>
                      For critical applications, consider using components with lower failure rates and implementing
                      redundancy for essential functions.
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
