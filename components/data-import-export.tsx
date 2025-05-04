"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { saveComponentData, loadComponentData } from "@/lib/storage-utils"

export function DataImportExport() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null)
  const [exportResult, setExportResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setUploadResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadResult(null)

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

      // Read the file
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const data = JSON.parse(event.target.result as string)

            // Validate data structure
            if (!Array.isArray(data)) {
              throw new Error("Data must be an array of components")
            }

            // Use the new storage utility to save data
            const success = saveComponentData(data)

            clearInterval(interval)
            setUploadProgress(100)

            if (success) {
              setUploadResult({
                success: true,
                message: `Successfully uploaded ${data.length} components.`,
              })

              // Reload the page after a short delay
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            } else {
              setUploadResult({
                success: false,
                message: "Error saving components. The data may be too large for browser storage.",
              })
            }
          }
        } catch (error) {
          clearInterval(interval)
          setUploadResult({
            success: false,
            message: "Error parsing JSON file. Please check the file format.",
          })
        }
      }

      reader.onerror = () => {
        clearInterval(interval)
        setUploadResult({
          success: false,
          message: "Error reading file. Please try again.",
        })
      }

      reader.readAsText(file)
    } catch (error) {
      setUploadResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleExport = () => {
    setExportResult(null)
    try {
      const components = loadComponentData()

      if (components && components.length > 0) {
        const json = JSON.stringify(components, null, 2)
        const blob = new Blob([json], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "component_database.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setExportResult({ success: true, message: "Successfully exported component data." })
      } else {
        setExportResult({ success: false, message: "No component data found in storage." })
      }
    } catch (error) {
      setExportResult({ success: false, message: "Error exporting component data." })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Import / Export</CardTitle>
        <CardDescription>Import or export component data in JSON format.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <Label htmlFor="import-file">Import Data</Label>
          <Input id="import-file" type="file" accept=".json" onChange={handleFileChange} className="mt-1" />
          {file && (
            <div className="flex items-center gap-2 text-sm mt-2">
              <Upload className="h-4 w-4" />
              <span>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
            </div>
          )}
          {uploadProgress > 0 && <Progress value={uploadProgress} className="h-2 mt-2" />}
          {uploadResult && (
            <Alert variant={uploadResult.success ? "default" : "destructive"} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadResult.message}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleUpload} disabled={!file || isUploading} className="mt-4">
            {isUploading ? (
              "Importing..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </>
            )}
          </Button>
        </div>

        <div>
          <Label>Export Data</Label>
          {exportResult && (
            <Alert variant={exportResult.success ? "default" : "destructive"} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{exportResult.message}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleExport} className="mt-4">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
