import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Cpu, CircuitBoardIcon as Circuit, Calculator } from "lucide-react"

export default function Home() {
  return (
    <main className="container py-6 md:py-12">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Electronic Component Database & Circuit Templates
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Find detailed specifications, equivalents, and calculate parameters for electronic components. Access
            premium circuit templates for your projects.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/components">Browse Components</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/circuit-templates">Circuit Templates</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Our electronic component database offers comprehensive tools and resources for your electronic projects.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <Cpu className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Component Database</CardTitle>
              <CardDescription>
                Browse our extensive database of electronic components with detailed specifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                Find transistors, ICs, resistors, capacitors, and more with comprehensive technical data.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/components" className="flex items-center justify-between w-full">
                  Browse Components <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <Circuit className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Circuit Templates</CardTitle>
              <CardDescription>
                Access ready-to-use circuit templates for common electronic applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                Save time with pre-designed circuits for amplifiers, power supplies, sensors, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/circuit-templates" className="flex items-center justify-between w-full">
                  View Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Electronic Calculators</CardTitle>
              <CardDescription>
                Calculate parameters for your electronic designs with our specialized tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                Calculate resistor values for LEDs, determine circuit reliability, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/calculators" className="flex items-center justify-between w-full">
                  Use Calculators <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}
