import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerIssueComponent } from './customer-issue/customer-issue.component';
import { CustomerIssueListComponent } from './customer-issue/customer-issue-list/customer-issue-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from './shared/stores/store.module';
import { CustomerIssueFormComponent } from './customer-issue/customer-issue-form/customer-issue-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerIssueComponent,
    CustomerIssueListComponent,
    CustomerIssueFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
