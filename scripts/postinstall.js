const fs = require("fs")
const path = require("path")

// Create necessary directories if they don't exist
const directories = [".next", "public/data"]

directories.forEach((dir) => {
  const dirPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dir}`)
    fs.mkdirSync(dirPath, { recursive: true })
  }
})

// Create a placeholder .env.local file if it doesn't exist
const envPath = path.join(process.cwd(), ".env.local")
if (!fs.existsSync(envPath)) {
  console.log("Creating placeholder .env.local file")
  fs.writeFileSync(
    envPath,
    `# Local environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your Stripe keys here
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
`,
  )
}

console.log("Postinstall script completed successfully")
