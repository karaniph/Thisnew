"use client"

import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function AwsAmplifyStatus() {
  const [isAmplify, setIsAmplify] = useState(false)

  useEffect(() => {
    // Check if running on AWS Amplify by looking for specific environment variables
    // or headers that would be present in an Amplify environment
    const checkAmplify = () => {
      try {
        // This is a simple check - in production you might want to use
        // a more reliable method to detect Amplify
        const isAmplifyHosted =
          typeof window !== "undefined" &&
          (window.location.hostname.includes("amplifyapp.com") || process.env.NEXT_PUBLIC_AMPLIFY_ENV === "true")

        setIsAmplify(isAmplifyHosted)
      } catch (error) {
        console.error("Error checking Amplify status:", error)
        setIsAmplify(false)
      }
    }

    checkAmplify()
  }, [])

  if (!isAmplify) return null

  return (
    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
      AWS Amplify
    </Badge>
  )
}
