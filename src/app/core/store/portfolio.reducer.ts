import { createReducer, on } from '@ngrx/store';
import { initialState } from './portfolio.state';
import * as PortfolioActions from './portfolio.actions';

export const portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.loadInvestmentsSuccess, (state, { investments }) => ({
    ...state,
    investments,
    loading: false,
    error: null,
  })),
  on(PortfolioActions.loadInvestmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PortfolioActions.addInvestmentSuccess, (state, { investment }) => ({
    ...state,
    investments: [...state.investments, investment],
    error: null,
  })),
  on(PortfolioActions.addInvestmentFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PortfolioActions.loadPerformanceSuccess, (state, { performance }) => ({
    ...state,
    performance,
    loading: false,
    error: null,
  })),
  on(PortfolioActions.loadPerformanceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
