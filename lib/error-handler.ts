type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message
}

export function logError(error: unknown, context?: string): void {
  const errorMessage = getErrorMessage(error)
  const contextMessage = context ? ` [${context}]` : ""
  console.error(`Error${contextMessage}: ${errorMessage}`)

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === "production") {
    // Example: sendToErrorLogging(errorMessage, context);
  }
}
