import produce from 'immer';
import { AppStatusEmitter } from '../emitters/app-status.emitter';
import { catchError, tap } from 'rxjs/operators';
import { Emittable, Emitter, Receiver } from '@ngxs-labs/emitter';
import { Injectable, Injector } from '@angular/core';
import { Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { CustomerIssueService } from '../../services/customer-issue.service';
import { CustomerIssue } from '../../models/customer-issue.model';
import { GetCustomerIssues, UpdateCustomerIssue } from '../actions/customer-issue.action';

export class CustomerIssueStateModel {
  customer_issues: CustomerIssue[];
  customer_issue: CustomerIssue;
}

@Injectable()
@State<CustomerIssueStateModel>({
  name: 'user',
  defaults: {
    customer_issues: [],
    customer_issue: {
      category: null,
      email: null,
      description: null
    }
  }
})
export class CustomerIssueState {

  private static customerIssueService: CustomerIssueService;
  private static appStatusEmitter: AppStatusEmitter;

  constructor(injector: Injector) {
    CustomerIssueState.customerIssueService = injector.get<CustomerIssueService>(CustomerIssueService);
    CustomerIssueState.appStatusEmitter = injector.get<AppStatusEmitter>(AppStatusEmitter);
  }

  @Selector()
  static customerIssues({ customer_issues }: CustomerIssueStateModel) {
    return customer_issues;
  }

  @Selector()
  static customerIssueCount({ customer_issues }: CustomerIssueStateModel) {
    return customer_issues.length;
  }

  @Receiver({ action: GetCustomerIssues, cancelUncompleted: true })
  static getCustomerIssues({ setState }: StateContext<CustomerIssueStateModel>, { payload }: GetCustomerIssues) {
    return this.customerIssueService.getCustomerIssues().pipe(
      tap(result => {
        setState(produce((draft: CustomerIssueStateModel) => {
          draft.customer_issues = result;
        }));
      }),
      catchError(err => {
        setState(produce((draft: CustomerIssueStateModel) => {
          draft.customer_issues = [];
        }));
        const error = {
          type: GetCustomerIssues.type,
          message: err.error,
          status: 400,
          showToast: false
        };
        this.appStatusEmitter.errors.emit(error);
        return throwError(err);
      })
    );
  }

  @Receiver({ action: UpdateCustomerIssue, cancelUncompleted: true })
  static updateCustomerIssue(
    _ctx: StateContext<CustomerIssueStateModel>,
    { payload }: UpdateCustomerIssue
  ) {
    return this.customerIssueService.updateCustomerIssue(payload).pipe(
      tap(result => {
       
          const success = {
            type: UpdateCustomerIssue.type,
            message: 'Customer Issue has been updated successfully!',
            status: 200,
            showToast: true
          };

          this.appStatusEmitter.success.emit(success);
      }),
      catchError(err => {
        const error = {
          type: UpdateCustomerIssue.type,
          message: err.error,
          status: 400,
          showToast: true
        };
        this.appStatusEmitter.errors.emit(error);
        return throwError(err);
      })
    );
  }

}
