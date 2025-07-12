import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, PortfolioState } from './portfolio.state';

export const selectPortfolioState = createFeatureSelector<AppState, PortfolioState>(
  'portfolio'
);

export const selectAllInvestments = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.investments
);

export const selectPortfolioPerformance = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.performance
);

export const selectPortfolioLoading = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.loading
);

export const selectPortfolioError = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.error
);
