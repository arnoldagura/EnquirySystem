import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIssueComponent } from './customer-issue.component';

describe('CustomerIssueComponent', () => {
  let component: CustomerIssueComponent;
  let fixture: ComponentFixture<CustomerIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
