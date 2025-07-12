import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Investment } from '../core/models/investment.model';
import { PortfolioService } from '../core/portfolio.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/portfolio.state';
import { selectAllInvestments, selectPortfolioLoading, selectPortfolioError } from '../core/store/portfolio.selectors';
import * as PortfolioActions from '../core/store/portfolio.actions';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss'],
})
export class InvestmentListComponent implements OnInit, OnDestroy {
  investments$: Observable<Investment[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  private investmentsSubscription?: Subscription;

  constructor(private portfolioService: PortfolioService, private store: Store<AppState>) {
    this.investments$ = this.store.select(selectAllInvestments);
    this.loading$ = this.store.select(selectPortfolioLoading);
    this.error$ = this.store.select(selectPortfolioError);
  }

  ngOnInit(): void {
    this.loadInvestments();
  }

  ngOnDestroy(): void {
    if (this.investmentsSubscription) {
      this.investmentsSubscription.unsubscribe();
    }
  }

  loadInvestments(): void {
    this.portfolioService.getInvestments();
  }
}
