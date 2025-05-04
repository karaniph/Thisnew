import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Circuit Design Templates - ElectronicParts",
  description: "Ready-to-use circuit designs with component lists and instructions",
}

export default function CircuitTemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
