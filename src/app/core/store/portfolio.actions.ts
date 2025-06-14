import { createAction, props } from '@ngrx/store';
import { Investment } from '../models/investment.model';
import { PerformanceMetrics } from '../models/performance.model';

export const loadInvestments = createAction('[Portfolio] Load Investments');
export const loadInvestmentsSuccess = createAction(
  '[Portfolio] Load Investments Success',
  props<{ investments: Investment[] }>()
);
export const loadInvestmentsFailure = createAction(
  '[Portfolio] Load Investments Failure',
  props<{ error: any }>()
);

export const addInvestment = createAction(
  '[Portfolio] Add Investment',
  props<{ investment: Investment }>()
);
export const addInvestmentSuccess = createAction(
  '[Portfolio] Add Investment Success',
  props<{ investment: Investment }>()
);
export const addInvestmentFailure = createAction(
  '[Portfolio] Add Investment Failure',
  props<{ error: any }>()
);

export const loadPerformance = createAction('[Portfolio] Load Performance');
export const loadPerformanceSuccess = createAction(
  '[Portfolio] Load Performance Success',
  props<{ performance: PerformanceMetrics }>()
);
export const loadPerformanceFailure = createAction(
  '[Portfolio] Load Performance Failure',
  props<{ error: any }>()
);
