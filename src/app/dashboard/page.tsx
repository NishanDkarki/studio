import { getClicks, getDashboardStats } from '@/lib/data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ClicksTable } from '@/components/dashboard/clicks-table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ClicksChart } from '@/components/dashboard/clicks-chart';

export default async function DashboardPage() {
  const [clicks, stats] = await Promise.all([
    getClicks(),
    getDashboardStats(),
  ]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCards stats={stats} />
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Clicks</CardTitle>
                <CardDescription>A list of the most recent link clicks.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClicksTable clicks={clicks} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Clicks by Browser</CardTitle>
                <CardDescription>Distribution of clicks across different browsers.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClicksChart clicks={clicks} />
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
