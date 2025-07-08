import { OverviewCards } from "@/components/dashboard/overview-cards";
import { StrategyTable } from "@/components/dashboard/strategy-table";
import { PortfolioSimulator } from "@/components/dashboard/portfolio-simulator";
import { AiAnalyzer } from "@/components/dashboard/ai-analyzer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <OverviewCards />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PortfolioSimulator />
        </div>
        <div className="lg:col-span-2">
          <AiAnalyzer />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Strategy Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <StrategyTable />
        </CardContent>
      </Card>
    </div>
  );
}
