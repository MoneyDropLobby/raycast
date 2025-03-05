import { BarChartDefault } from "@/components/charts/bar-chart";
import { BarChartStacked } from "@/components/charts/bar-chart-stacked";
import { PieChartLabel } from "@/components/charts/pie-chart-label";

export default function Page() {
  return (
    <>
      <div className="grid h-fit auto-rows-min gap-4 md:grid-cols-3">
        <BarChartStacked />
        <PieChartLabel />
        <BarChartDefault />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </>
  );
}
