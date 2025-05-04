"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SpecificationBarChartProps {
  data: {
    name: string
    value: number
    unit: string
  }[]
  title?: string
  height?: number
}

export function SpecificationBarChart({ data, title, height = 300 }: SpecificationBarChartProps) {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    unit: item.unit,
    fill: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
  }))

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height }}>
        <ChartContainer
          config={{
            value: {
              label: "Value",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        return (
                          <div>
                            <p className="text-sm font-medium">{payload[0].payload.name}</p>
                            <p className="text-sm">
                              {payload[0].value} {payload[0].payload.unit}
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
