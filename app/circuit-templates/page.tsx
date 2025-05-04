"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CircuitSchematic } from "@/components/circuit-schematic"
import { getAllCircuitTemplates } from "@/lib/circuit-templates"

export default function CircuitTemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("basic")

  // Get all circuit templates
  const circuitTemplates = getAllCircuitTemplates()

  // Filter templates by active category
  const filteredTemplates = circuitTemplates.filter((template) => template.category === activeCategory)

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
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Circuit Design Templates</h1>
          <p className="text-muted-foreground mt-2">
            Ready-to-use circuit designs with component lists and instructions
          </p>
        </div>

        <Tabs defaultValue="basic" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="amplifiers">Amplifiers</TabsTrigger>
            <TabsTrigger value="oscillators">Oscillators</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
          </TabsList>

          {["basic", "amplifiers", "oscillators", "power", "sensors", "digital"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <CircuitSchematic circuitId={template.id} preview />
                      </div>
                      {template.isPremium && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="flex flex-col items-center text-white">
                            <Lock className="h-8 w-8 mb-2" />
                            <span className="font-medium">Premium Design</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant={getDifficultyBadge(template.difficulty)}>
                          {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Components:</h4>
                        <ul className="text-sm space-y-1">
                          {template.components.slice(0, 3).map((component, index) => (
                            <li key={index}>{component}</li>
                          ))}
                          {template.components.length > 3 && (
                            <li className="text-muted-foreground">+{template.components.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant={template.isPremium ? "outline" : "default"} className="w-full" asChild>
                        <Link href={`/circuit-templates/${template.id}`}>
                          {template.isPremium ? "View Premium Design" : "View Full Design"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
