"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ParameterDistributionChartProps {
  data: {
    name: string
    value: number
    color?: string
  }[]
  title?: string
  height?: number
}

export function ParameterDistributionChart({ data, title, height = 300 }: ParameterDistributionChartProps) {
  // Assign colors if not provided
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height }}>
        <ChartContainer
          config={chartData.reduce(
            (acc, item, index) => {
              acc[`segment-${index}`] = {
                label: item.name,
                color: item.color,
              }
              return acc
            },
            {} as Record<string, { label: string; color: string }>,
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        return (
                          <div>
                            <p className="text-sm font-medium">{payload[0].name}</p>
                            <p className="text-sm">
                              {payload[0].value} (
                              {((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}
                              %)
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
