// Validate environment variables
export function validateEnv() {
  const requiredEnvVars = ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_APP_URL"]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    console.warn(`Warning: Missing required environment variables: ${missingEnvVars.join(", ")}`)

    // In development, provide more helpful messages
    if (process.env.NODE_ENV !== "production") {
      console.info(`
        For local development:
        1. Create a .env.local file in the project root
        2. Add the missing environment variables:
           ${missingEnvVars.map((envVar) => `${envVar}=your_value_here`).join("\n           ")}
      `)
    }

    return false
  }

  return true
}

// Get environment variables with type safety
export function getEnv<T extends string>(key: string, defaultValue?: T): T {
  const value = process.env[key] as T | undefined

  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${key} is not defined`)
  }

  return value
}
