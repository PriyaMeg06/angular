import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PortfolioService } from '../portfolio.service';
import * as PortfolioActions from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  loadInvestments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadInvestments),
      mergeMap(() =>
        this.portfolioService.getInvestments().pipe(
          map((investments) =>
            PortfolioActions.loadInvestmentsSuccess({ investments })
          ),
          catchError((error) =>
            of(PortfolioActions.loadInvestmentsFailure({ error }))
          )
        )
      )
    )
  );

  addInvestment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.addInvestment),
      mergeMap((action) =>
        this.portfolioService.addInvestment(action.investment).pipe(
          map((investment) =>
            PortfolioActions.addInvestmentSuccess({ investment })
          ),
          catchError((error) =>
            of(PortfolioActions.addInvestmentFailure({ error }))
          )
        )
      )
    )
  );

  loadPerformance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPerformance),
      mergeMap(() =>
        this.portfolioService.getPortfolioPerformance().pipe(
          map((performance) =>
            PortfolioActions.loadPerformanceSuccess({ performance })
          ),
          catchError((error) =>
            of(PortfolioActions.loadPerformanceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService
  ) {}
}
