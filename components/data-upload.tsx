"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileJson, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { saveComponentData, loadComponentData, clearComponentData } from "@/lib/storage-utils"

export function DataUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isLoadingStatic, setIsLoadingStatic] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  // Modify the handleUpload function to add better error handling and verification
  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setResult(null)

    try {
      // First verify storage is working
      const storageWorking = saveComponentData([]) // Test with empty array

      if (!storageWorking) {
        throw new Error("Browser storage is not working properly")
      }

      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Read the file
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const jsonString = event.target.result as string
            console.log("JSON file size:", jsonString.length, "bytes")

            // Check if file is too large for localStorage (approx 4MB limit)
            if (jsonString.length > 4000000) {
              throw new Error("JSON file is too large for browser storage (>4MB)")
            }

            let data
            try {
              data = JSON.parse(jsonString)
            } catch (parseError) {
              throw new Error(
                `Invalid JSON format: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
              )
            }

            // Validate data structure
            if (!Array.isArray(data)) {
              throw new Error("Data must be an array of components")
            }

            console.log("Component count:", data.length)

            // Ensure each component has required fields
            data.forEach((component, index) => {
              if (!component.id) {
                component.id = `component_${index}`
              }
              if (!component.name) {
                component.name = `Component ${index}`
              }
              if (!component.type) {
                component.type = "Transistor"
              }
            })

            // Clear existing data first
            clearComponentData()

            // Use the storage utility to save data
            const success = saveComponentData(data)

            clearInterval(interval)
            setUploadProgress(100)

            if (success) {
              // Verify data was actually saved
              const savedComponents = loadComponentData()
              if (savedComponents.length === data.length) {
                setResult({
                  success: true,
                  message: `Successfully uploaded ${data.length} components.`,
                })

                // Store a flag indicating successful upload
                localStorage.setItem("last_upload_timestamp", new Date().toISOString())
                localStorage.setItem("last_upload_count", data.length.toString())

                // Reload the page after a short delay
                setTimeout(() => {
                  window.location.href = "/components"
                }, 1500)
              } else {
                throw new Error(`Only ${savedComponents.length} of ${data.length} components were saved`)
              }
            } else {
              throw new Error("Error saving components. The data may be too large for browser storage.")
            }
          }
        } catch (error) {
          clearInterval(interval)
          setResult({
            success: false,
            message: `Error processing JSON file: ${error instanceof Error ? error.message : "Unknown error"}`,
          })
        }
      }

      reader.onerror = () => {
        clearInterval(interval)
        setUploadProgress(0)
        setResult({
          success: false,
          message: "Error reading file. Please try again.",
        })
      }

      reader.readAsText(file)
    } catch (error) {
      setResult({
        success: false,
        message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleLoadFromStatic = async () => {
    setIsLoadingStatic(true)
    setResult(null)

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Fetch from static JSON file
      const response = await fetch("/data/components.json")

      if (!response.ok) {
        throw new Error(`Failed to fetch component data: ${response.status}`)
      }

      const components = await response.json()

      // Clear existing data first
      clearComponentData()

      // Save to localStorage
      const success = saveComponentData(components)

      clearInterval(interval)
      setUploadProgress(100)

      if (success) {
        setResult({
          success: true,
          message: `Successfully loaded ${components.length} components from static file.`,
        })

        // Store a flag indicating successful load
        localStorage.setItem("last_upload_timestamp", new Date().toISOString())
        localStorage.setItem("last_upload_count", components.length.toString())
        localStorage.setItem("data_source", "static_file")

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.href = "/components"
        }, 1500)
      } else {
        throw new Error("Error saving components. The data may be too large for browser storage.")
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error loading from static file: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsLoadingStatic(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Component Data</CardTitle>
        <CardDescription>Upload a JSON file containing your component data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="file-upload">JSON Data File</Label>
            <Input id="file-upload" type="file" accept=".json" onChange={handleFileChange} className="mt-1" />
          </div>

          {file && (
            <div className="flex items-center gap-2 text-sm">
              <FileJson className="h-4 w-4" />
              <span>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}

          {uploadProgress > 0 && <Progress value={uploadProgress} className="h-2" />}

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2 mt-4">
            <div className="text-sm font-medium">Or load from static file:</div>
            <Button
              variant="outline"
              onClick={handleLoadFromStatic}
              disabled={isLoadingStatic}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {isLoadingStatic ? "Loading..." : "Load from Static File"}
            </Button>
            <p className="text-xs text-muted-foreground">
              This will load the component data from the static JSON file in the public directory.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
          {isUploading ? (
            <>Processing...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Components
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
