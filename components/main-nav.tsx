"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Calculator, CircuitBoard, Component, Repeat, PenToolIcon as Tool } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/components" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Component className="mr-2 h-4 w-4" />
              <span>Components</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/circuit-templates" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <CircuitBoard className="mr-2 h-4 w-4" />
              <span>Circuit Templates</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/equivalents" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Repeat className="mr-2 h-4 w-4" />
              <span>Equivalents</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Tool className="mr-2 h-4 w-4" />
            <span>Tools</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/calculators"
                  >
                    <Calculator className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">Electronic Calculators</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Specialized calculators for electronic component calculations and circuit design
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/calculators/led-resistor"
                  >
                    <div className="text-sm font-medium leading-none">LED Resistor Calculator</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Calculate the correct resistor value for your LED circuit
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/calculators/circuit-reliability"
                  >
                    <div className="text-sm font-medium leading-none">Circuit Reliability</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Calculate the reliability of your circuit based on component failure rates
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/tools"
                  >
                    <div className="text-sm font-medium leading-none">More Tools</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Additional tools for electronic component selection and circuit design
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
