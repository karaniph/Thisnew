import { Wrench, Database, Calculator } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataImportExport } from "@/components/data-import-export"
import Link from "next/link"

export default function ToolsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tools & Utilities</h1>
          <p className="text-muted-foreground mt-2">
            Access various tools and utilities for working with electronic components.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculators
              </CardTitle>
              <CardDescription>Calculate parameters for electronic components.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access various calculators for Ohm's Law, LED resistors, transistor bias, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/calculators">Open Calculators</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Import and export component data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Import component data from JSON files or export the current database.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/admin">Manage Data</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Component Utilities
              </CardTitle>
              <CardDescription>Additional tools for working with components.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access utilities for component comparison, parameter conversion, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>

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
