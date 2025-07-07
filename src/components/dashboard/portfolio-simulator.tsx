"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialData = [
  { scenario: "Conservative", value: 400000 },
  { scenario: "Moderate", value: 620000 },
  { scenario: "Aggressive", value: 950000 },
];

const chartConfig = {
  value: {
    label: "Projected Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PortfolioSimulator() {
  const [riskLevel, setRiskLevel] = React.useState(50);
  const [timeHorizon, setTimeHorizon] = React.useState("10");

  const simulatedData = React.useMemo(() => {
    const riskFactor = 1 + (riskLevel / 100) * 1.5;
    const timeFactor = parseInt(timeHorizon, 10) / 10;
    return initialData.map((d, i) => ({
      ...d,
      value: Math.round(d.value * riskFactor * timeFactor * (1 + i * 0.1)),
    }));
  }, [riskLevel, timeHorizon]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Scenario & Portfolio Simulation</CardTitle>
        <CardDescription>
          Adjust parameters to simulate potential portfolio growth.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="risk-level">Risk Level: {riskLevel}</Label>
            <Slider
              id="risk-level"
              value={[riskLevel]}
              onValueChange={(value) => setRiskLevel(value[0])}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger id="time-horizon" className="w-full">
                <SelectValue placeholder="Select horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="10">10 Years</SelectItem>
                <SelectItem value="15">15 Years</SelectItem>
                <SelectItem value="20">20 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-[250px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulatedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="scenario"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent
                    formatter={(value) => `$${(value as number).toLocaleString()}`}
                    nameKey="name"
                  />}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
