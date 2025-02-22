"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", bargeld: 186, karte: 80 },
  { month: "February", bargeld: 305, karte: 200 },
  { month: "March", bargeld: 237, karte: 120 },
  { month: "April", bargeld: 73, karte: 190 },
  { month: "May", bargeld: 209, karte: 130 },
  { month: "June", bargeld: 214, karte: 140 },
];

const chartConfig = {
  bargeld: {
    label: "Bargeld",
    color: "hsl(var(--chart-1))",
  },
  karte: {
    label: "Karte",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartStacked() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="bargeld"
              stackId="a"
              fill="var(--color-bargeld)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="karte"
              stackId="a"
              fill="var(--color-karte)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
