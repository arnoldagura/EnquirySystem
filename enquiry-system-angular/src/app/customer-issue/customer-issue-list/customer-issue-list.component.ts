import { Component, Input, OnInit } from '@angular/core';
import { CustomerIssue } from 'src/app/shared/models/customer-issue.model';
import { CustomerIssueService } from 'src/app/shared/services/customer-issue.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerIssueState } from 'src/app/shared/stores/states/customer-issue.state';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-customer-issue-list',
  templateUrl: './customer-issue-list.component.html',
  styleUrls: ['./customer-issue-list.component.css']
})
export class CustomerIssueListComponent implements OnInit {

  @Emitter(CustomerIssueState.getCustomerIssues)
  private getCustomerIssues: Emittable<void>;

  @Emitter(CustomerIssueState.getCustomerIssuesByEmail)
  private getCustomerIssuesByEmail: Emittable<string>;

  @Select(CustomerIssueState.customerIssues)
  customerIssues$: Observable<CustomerIssue[]>;

  @Input()
  private user: User;

  constructor(
    public customerIssueService: CustomerIssueService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadList();
  }

  populateForm(ci: CustomerIssue) {
    // this.service.formData = Object.assign({}, ci);
  }

  loadList(){
    if(this.user.userType == 'Admin')
    {
      this.getCustomerIssues.emit();
    } else {
      this.getCustomerIssuesByEmail.emit(this.user.email);
    }
  }

  onDelete(id) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.customerIssueService.deleteCustomerIssue(id).subscribe(
        res => {
          this.toastr.info('Deleted Successfully', 'Customer Issue');
          this.loadList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
