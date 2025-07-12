import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioService } from '../core/portfolio.service';
import { PerformanceMetrics, PerformanceDataPoint } from '../core/models/performance.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/portfolio.state';
import { selectPortfolioPerformance, selectPortfolioLoading, selectPortfolioError } from '../core/store/portfolio.selectors';
import * as PortfolioActions from '../core/store/portfolio.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  performanceMetrics$: Observable<PerformanceMetrics | null>;
  chartData: { labels: string[]; data: number[] } | null = null;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  private performanceSubscription?: Subscription;

  constructor(private portfolioService: PortfolioService, private store: Store<AppState>) {
    this.performanceMetrics$ = this.store.select(selectPortfolioPerformance);
    this.loading$ = this.store.select(selectPortfolioLoading);
    this.error$ = this.store.select(selectPortfolioError);
  }

  ngOnInit(): void {
    this.loadPortfolioPerformance();
    this.performanceSubscription = this.performanceMetrics$.subscribe(performance => {
      if (performance) {
        this.prepareChartData(performance.historicalPerformance);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.performanceSubscription) {
      this.performanceSubscription.unsubscribe();
    }
  }
  loadPortfolioPerformance(): void {
    this.portfolioService.getPortfolioPerformance();
  }

  prepareChartData(historicalData: PerformanceDataPoint[]): void {
    this.chartData = {
      labels: historicalData.map((item) => item.date.toLocaleDateString()),
      data: historicalData.map((item) => item.value),
    };
  }
}
