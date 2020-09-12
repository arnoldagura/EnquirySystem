import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { CustomerIssueService } from '../shared/services/customer-issue.service';
import { AuthState } from '../shared/stores/states/auth.state';
import { CustomerIssueState } from '../shared/stores/states/customer-issue.state';
import { CustomerIssueFormComponent } from './customer-issue-form/customer-issue-form.component';

@Component({
  selector: 'app-customer-issue',
  templateUrl: './customer-issue.component.html',
  styleUrls: ['./customer-issue.component.css']
})
export class CustomerIssueComponent implements OnInit {

  @ViewChild('issueForm', { static: true })
  issue_form_modal: CustomerIssueFormComponent;

  @Emitter(CustomerIssueState.getCustomerIssues)
  private getCustomerIssues: Emittable<void>;

  @Select(CustomerIssueState.customerIssueCount)
  customerIssueCount$: Observable<number>;
  
  @Select(AuthState.user)
  user$: Observable<User>;

  constructor(
    public customerIssueService: CustomerIssueService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addIssue() {
    this.issue_form_modal.open();
  }
  onSubmit(issue) {
    this.customerIssueService.submitCustomerIssue(issue).subscribe(  res => {
      this.toastr.success('Added Successfully', 'Customer Issue');
      this.getCustomerIssues.emit();
      this.issue_form_modal.close();
    },
    err => {
      console.log(err);
    });
  }  
  logout() {
    this.authenticationService.logout();
  }

}
