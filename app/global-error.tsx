"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Application Error</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            A critical error occurred in the application. Please try refreshing the page.
          </p>
          <Button onClick={reset}>Refresh</Button>
        </div>
      </body>
    </html>
  )
}
