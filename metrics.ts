export type MetricScores = {
  projectHealth: number;
  teamMorale: number;
  stakeholderSatisfaction: number;
  deliveryFocus: number;
};

export const initialMetrics: MetricScores = {
  projectHealth: 50,
  teamMorale: 50,
  stakeholderSatisfaction: 50,
  deliveryFocus: 50,
};

export function clampMetric(value: number) {
  return Math.min(Math.max(value, 0), 100);
}
