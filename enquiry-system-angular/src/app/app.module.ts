import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerIssueComponent } from './customer-issue/customer-issue.component';
import { CustomerIssueListComponent } from './customer-issue/customer-issue-list/customer-issue-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from './shared/stores/store.module';
import { CustomerIssueFormComponent } from './customer-issue/customer-issue-form/customer-issue-form.component';
import { RegistrationComponent } from './landing/registration/registration.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ApploadService } from './shared/services/app-load.service';
export function initializeAppFactory(provider: ApploadService) {
  return () => provider.load();
}
@NgModule({
  declarations: [
    AppComponent,
    CustomerIssueComponent,
    CustomerIssueListComponent,
    CustomerIssueFormComponent,
    LandingComponent,
    RegistrationComponent,
    LoginComponent
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
  providers: [
    ApploadService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [ApploadService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
