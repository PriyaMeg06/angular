import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Investment } from './models/investment.model';
import { PerformanceMetrics } from './models/performance.model';
import { MockBackendService } from './mock-backend.service';
import { Store } from '@ngrx/store';
import * as PortfolioActions from './store/portfolio.actions';
import { AppState } from './store/portfolio.state';
import { selectAllInvestments, selectPortfolioPerformance } from './store/portfolio.selectors';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = '/api/portfolio'; // This will be intercepted by the mock backend

  constructor(
    private http: HttpClient,
    private mockBackend: MockBackendService,
    private store: Store<AppState>
  ) {}

  getPortfolioPerformance(): Observable<PerformanceMetrics> {
    // return this.http.get<PerformanceMetrics>(`${this.apiUrl}/performance`);
    this.store.dispatch(PortfolioActions.loadPerformance());
    return this.store.select(selectPortfolioPerformance);
    // return this.mockBackend.getPortfolioPerformance();
  }

  addInvestment(investment: Investment): Observable<Investment> {
    // return this.http.post<Investment>(`${this.apiUrl}/investments`, investment);
    this.store.dispatch(PortfolioActions.addInvestment({ investment }));
    return of(investment); // Return the investment
    // return this.mockBackend.addInvestment(investment);
  }

  getInvestments(): Observable<Investment[]> {
    // return this.http.get<Investment[]>(`${this.apiUrl}/investments`);
    this.store.dispatch(PortfolioActions.loadInvestments());
    return this.store.select(selectAllInvestments);
    // return this.mockBackend.getInvestments();
  }
}
