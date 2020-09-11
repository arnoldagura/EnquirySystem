import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIssueFormComponent } from './customer-issue-form.component';

describe('CustomerIssueFormComponent', () => {
  let component: CustomerIssueFormComponent;
  let fixture: ComponentFixture<CustomerIssueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIssueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
