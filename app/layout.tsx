import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { Suspense } from "react"
import { DataInitializer } from "@/lib/data-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ElectronicParts - Electronic Component Database & Circuit Templates",
  description:
    "Find detailed specifications, equivalents, and calculate parameters for electronic components. Access premium circuit templates for your projects.",
  keywords:
    "electronic components, circuit templates, transistors, resistors, capacitors, circuit design, electronics database",
  authors: [{ name: "ElectronicParts Team" }],
  creator: "ElectronicParts",
  publisher: "ElectronicParts",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com",
    title: "ElectronicParts - Electronic Component Database & Circuit Templates",
    description:
      "Find detailed specifications, equivalents, and calculate parameters for electronic components. Access premium circuit templates for your projects.",
    siteName: "ElectronicParts",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "ElectronicParts - Component Database & Circuit Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectronicParts - Electronic Component Database & Circuit Templates",
    description:
      "Find detailed specifications, equivalents, and calculate parameters for electronic components. Access premium circuit templates for your projects.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"}/twitter-image.jpg`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ElectronicParts",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com",
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com"}/components?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              description:
                "Find detailed specifications, equivalents, and calculate parameters for electronic components. Access premium circuit templates for your projects.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DataInitializer />
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
              <div className="flex gap-6 md:gap-10">
                <Link href="/" className="flex items-center space-x-2">
                  <Logo className="text-primary" />
                  <span className="inline-block font-bold">ElectronicParts</span>
                </Link>
                <div className="hidden md:flex">
                  <MainNav />
                </div>
              </div>
              <div className="flex flex-1 items-center space-x-4 sm:justify-end">
                <form action="/components" method="get" className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input name="search" type="search" placeholder="Search components..." className="w-full pl-8" />
                </form>
              </div>
            </div>
          </header>
          <Suspense
            fallback={
              <div className="flex h-[50vh] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
          <footer className="border-t bg-background/95 py-6 mt-auto">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} ElectronicParts. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                  Privacy
                </Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
