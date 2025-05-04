import { getErrorMessage } from "./error-handler"

export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as T
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    console.error(`Fetch error for ${url}: ${errorMessage}`)
    throw error
  }
}

export function handleApiError(error: unknown): { message: string; statusCode: number } {
  console.error("API error:", error)

  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred",
      statusCode: 500,
    }
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  }
}
