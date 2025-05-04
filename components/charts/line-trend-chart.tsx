"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface LineTrendChartProps {
  data: {
    name: string
    [key: string]: number | string
  }[]
  lines: {
    id: string
    name: string
    color?: string
    strokeDasharray?: string
  }[]
  title?: string
  height?: number
  xAxisLabel?: string
  yAxisLabel?: string
}

export function LineTrendChart({ data, lines, title, height = 300, xAxisLabel, yAxisLabel }: LineTrendChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full" style={{ height }}>
        <ChartContainer
          config={lines.reduce(
            (acc, line, index) => {
              acc[line.id] = {
                label: line.name,
                color: line.color || `hsl(var(--chart-${(index % 5) + 1}))`,
              }
              return acc
            },
            {} as Record<string, { label: string; color: string }>,
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -10 } : undefined}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : undefined}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {lines.map((line) => (
                <Line
                  key={line.id}
                  type="monotone"
                  dataKey={line.id}
                  name={line.name}
                  stroke={`var(--color-${line.id})`}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeDasharray={line.strokeDasharray}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
