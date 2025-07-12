import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { InteractiveChartComponent } from './shared/components/interactive-chart/interactive-chart.component';
import { CurrencyFormatPipe } from './shared/pipes/currency-format.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { MockBackendService } from './core/mock-backend.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import enIN from '@angular/common/locales/en-IN';
import { portfolioReducer } from './core/store/portfolio.reducer'; // Import reducer
import { PortfolioEffects } from './core/store/portfolio.effects'; // Import effects
import { InvestmentListComponent } from './investment-list/investment-list.component'; // Import the new component

registerLocaleData(enIN);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InvestmentFormComponent,
    InteractiveChartComponent,
    CurrencyFormatPipe,
    HighlightDirective,
    InvestmentListComponent, // Add the new component to declarations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ portfolio: portfolioReducer }), // Register reducer
    EffectsModule.forRoot([PortfolioEffects]), // Register effects
    StoreDevtoolsModule.instrument({ // Add for development tools
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    MockBackendService,
    { provide: LOCALE_ID, useValue: 'en-IN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
