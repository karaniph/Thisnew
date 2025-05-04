"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RadarComparisonChartProps {
  data: {
    subject: string
    [key: string]: number | string
  }[]
  components: {
    id: string
    name: string
    color: string
  }[]
  title?: string
  height?: number
}

export function RadarComparisonChart({ data, components, title, height = 400 }: RadarComparisonChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height }}>
        <ChartContainer
          config={components.reduce(
            (acc, component, index) => {
              acc[component.id] = {
                label: component.name,
                color: component.color || `hsl(var(--chart-${(index % 5) + 1}))`,
              }
              return acc
            },
            {} as Record<string, { label: string; color: string }>,
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {components.map((component) => (
                <Radar
                  key={component.id}
                  name={component.name}
                  dataKey={component.id}
                  stroke={`var(--color-${component.id})`}
                  fill={`var(--color-${component.id})`}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
