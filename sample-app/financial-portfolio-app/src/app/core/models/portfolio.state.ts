import { Investment } from '../models/investment.model';
import { PerformanceMetrics } from '../models/performance.model';

export interface PortfolioState {
  investments: Investment[];
  performance: PerformanceMetrics | null;
  loading: boolean;
  error: any;
}

export interface AppState {
  portfolio: PortfolioState;
}

export const initialState: PortfolioState = {
  investments: [],
  performance: null,
  loading: false,
  error: null,
};
