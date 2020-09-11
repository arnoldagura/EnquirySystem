import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerIssueComponent } from './customer-issue/customer-issue.component';


const routes: Routes = [
  { path: '', redirectTo: '/customer-issues', pathMatch: 'full' },

  { path: 'customer-issues', component: CustomerIssueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
