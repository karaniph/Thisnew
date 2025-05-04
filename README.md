# Electronic Component App

A comprehensive web application for electronic component database and circuit templates.

## Features

- Component database with detailed specifications
- Circuit templates with schematics
- Premium circuit templates with Stripe integration
- Electronic calculators
- Component equivalents finder
- Mobile-responsive design

## Deployment on AWS Amplify

### Prerequisites

1. AWS Account
2. Stripe Account (for premium templates)
3. Node.js 18+ and npm

### Environment Variables

Set the following environment variables in AWS Amplify:

- `NEXT_PUBLIC_APP_URL`: Your application's URL
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

### Deployment Steps

1. Connect your repository to AWS Amplify
2. AWS Amplify will automatically detect the build settings from amplify.yml
3. Add the environment variables in the Amplify Console
4. Deploy the application

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable React components
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and data handling
- `/public`: Static assets

## License

MIT
