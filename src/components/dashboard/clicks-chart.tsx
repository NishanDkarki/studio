"use client";

import type { Click } from '@/lib/data';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo } from 'react';

export function ClicksChart({ clicks }: { clicks: Click[] }) {
    const chartData = useMemo(() => {
        const browserCounts = clicks.reduce((acc, click) => {
            const browser = click.device.browser || 'Unknown';
            acc[browser] = (acc[browser] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(browserCounts).map(([browser, count]) => ({
            browser,
            count,
        }));
    }, [clicks]);

  if (chartData.length === 0) {
    return <div className="flex h-[300px] items-center justify-center text-muted-foreground">No data to display</div>;
  }

  return (
    <ChartContainer config={{}} className="h-[300px] w-full">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          dataKey="browser"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={80}
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
