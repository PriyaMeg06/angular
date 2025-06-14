import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { InvestmentListComponent } from './investment-list/investment-list.component'; // Import the new component

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-investment', component: InvestmentFormComponent },
  { path: 'investments', component: InvestmentListComponent }, // Add this route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}