import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../core/portfolio.service';
import { Investment } from '../core/models/investment.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/portfolio.state';
import { selectPortfolioLoading, selectPortfolioError } from '../core/store/portfolio.selectors';
import * as PortfolioActions from '../core/store/portfolio.actions';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss'],
})
export class InvestmentFormComponent implements OnInit, OnDestroy {
  investmentForm: FormGroup;
  submissionSuccess: boolean = false;
  submissionError: string = '';
  loading$: Observable<boolean>;
  error$: Observable<any>;
  private addInvestmentSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private store: Store<AppState>
  ) {
    this.loading$ = this.store.select(selectPortfolioLoading);
    this.error$ = this.store.select(selectPortfolioError);
  }

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      quantity: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      purchasePrice: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
        ],
      ],
      purchaseDate: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.addInvestmentSubscription) {
      this.addInvestmentSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {const newInvestment: Investment = this.investmentForm.value;
      this.portfolioService.addInvestment(newInvestment); // Dispatch the action

      this.addInvestmentSubscription = this.error$.subscribe((error) => {
        if (!error) {
          this.submissionSuccess = true;
          this.submissionError = '';
          this.investmentForm.reset();
        } else {
          this.submissionSuccess = false;
          this.submissionError = 'Failed to add investment. Please try again.';
        }
      });
    } else {
      // Trigger validation to show errors
      Object.values(this.investmentForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get assetType() {
    return this.investmentForm.get('assetType');
  }
  get quantity() {
    return this.investmentForm.get('quantity');
  }
  get purchasePrice() {
    return this.investmentForm.get('purchasePrice');
  }
  get purchaseDate() {
    return this.investmentForm.get('purchaseDate');
  }
}
