import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Investment } from './models/investment.model';
import { PerformanceMetrics } from './models/performance.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  private investments: Investment[] = [
    { id: uuidv4(), assetType: 'Stock', quantity: 100, purchasePrice: 150.00, purchaseDate: new Date('2024-01-15') },
    { id: uuidv4(), assetType: 'Bond', quantity: 50, purchasePrice: 105.50, purchaseDate: new Date('2024-03-20') },
  ];

  private performanceData: PerformanceMetrics = {
    totalValue: 20500.00,
    changePercentage: 5.2,
    historicalPerformance: [
      { date: new Date('2024-04-01'), value: 19500.00 },
      { date: new Date('2024-05-01'), value: 20500.00 },
    ],
  };

  getPortfolioPerformance(): Observable<PerformanceMetrics> {
    return of(this.performanceData);
  }

  addInvestment(investment: Investment): Observable<Investment> {
    investment.id = uuidv4();
    this.investments.push(investment);
    return of(investment);
  }

  getInvestments(): Observable<Investment[]> {
    return of(this.investments);
  }
}