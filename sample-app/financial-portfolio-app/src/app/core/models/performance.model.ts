export interface PerformanceDataPoint {
  date: Date;
  value: number;
}

export interface PerformanceMetrics {
  totalValue: number;
  changePercentage: number;
  historicalPerformance: PerformanceDataPoint[];
}