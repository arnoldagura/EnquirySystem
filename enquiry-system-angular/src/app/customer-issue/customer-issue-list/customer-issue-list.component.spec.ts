import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIssueListComponent } from './customer-issue-list.component';

describe('CustomerIssueListComponent', () => {
  let component: CustomerIssueListComponent;
  let fixture: ComponentFixture<CustomerIssueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIssueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
