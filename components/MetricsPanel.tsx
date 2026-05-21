import type { MetricScores } from "@/metrics";

const metricLabels: Record<keyof MetricScores, string> = {
  projectHealth: "Project Health",
  teamMorale: "Team Morale",
  stakeholderSatisfaction: "Stakeholder Satisfaction",
  deliveryFocus: "Delivery Focus",
};

function getBarColor(value: number) {
  if (value < 40) {
    return "bg-red-500";
  }

  if (value < 70) {
    return "bg-yellow-500";
  }

  return "bg-green-500";
}

export function MetricsPanel({ metrics }: { metrics: MetricScores }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {(Object.keys(metricLabels) as Array<keyof MetricScores>).map((key) => {
        const value = metrics[key];

        return (
          <div
            key={key}
            className="rounded-lg border border-white/10 bg-slate-900/70 p-4 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-400">
                {metricLabels[key]}
              </p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${getBarColor(value)}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
