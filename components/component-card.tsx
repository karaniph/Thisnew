import Link from "next/link"
import { PinIcon as Chip, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComponentCardProps {
  id: string
  name: string
  type: "Transistor" | "MOSFET" | "IC" | "IGBT"
  description: string
  manufacturer: string
  package: string
  datasheetUrl?: string
}

export function ComponentCard({
  id,
  name,
  type,
  description,
  manufacturer,
  package: packageType,
  datasheetUrl,
}: ComponentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name || "Unknown Component"}</CardTitle>
          <Badge
            variant={
              type === "Transistor"
                ? "default"
                : type === "MOSFET"
                  ? "secondary"
                  : type === "IC"
                    ? "destructive"
                    : "outline"
            }
          >
            {type || "Unknown"}
          </Badge>
        </div>
        <CardDescription>{description || `${name || "Component"} details`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Manufacturer:</span>
            <span>{manufacturer || "Unknown"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Package:</span>
            <span>{packageType || "Unknown"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/components/${id}`}>
            <Chip className="mr-2 h-4 w-4" />
            Details
          </Link>
        </Button>
        {datasheetUrl ? (
          <Button variant="outline" size="sm" asChild>
            <a href={datasheetUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Datasheet
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" />
            No Datasheet
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
