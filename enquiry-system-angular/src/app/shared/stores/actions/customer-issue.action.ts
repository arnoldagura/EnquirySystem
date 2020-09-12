import { CustomerIssue } from '../../models/customer-issue.model';

export class GetCustomerIssues {
  public static readonly type = '[CustomerIssue] Get Customer Issues';
  constructor(public payload: void) { }
}

export class GetCustomerIssuesByEmail {
  public static readonly type = '[CustomerIssue] Get Customer Issues By Email';
  constructor(public payload: string) { }
}

export class UpdateCustomerIssue {
  public static readonly type = '[CustomerIssue] Update Customer Issue';
  constructor(public payload: CustomerIssue) { }
}

export class DeleteCustomerIssue {
  public static readonly type = '[CustomerIssue] Delete Customer Issue';
  constructor(public payload: CustomerIssue) { }
}
