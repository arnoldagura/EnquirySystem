import { TestBed } from '@angular/core/testing';

import { CustomerIssueService } from './customer-issue.service';

describe('CustomerIssueService', () => {
  let service: CustomerIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
