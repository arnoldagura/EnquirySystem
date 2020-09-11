import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { CustomerIssue } from 'src/app/shared/models/customer-issue.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-issue-form',
  templateUrl: './customer-issue-form.component.html',
  styleUrls: ['./customer-issue-form.component.css']
})
export class CustomerIssueFormComponent implements OnInit {

  issue_form: CustomerIssue;

  @Output()
  submit: EventEmitter<CustomerIssue> = new EventEmitter<CustomerIssue>();
  
  @ViewChild('modal', { static: true })
  private modalCreated: TemplateRef<any>;

  private currentModal: NgbModalRef;
  constructor(
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.issue_form = {
      category: null,
      description: null,
      email: null
    }
  }

  open() {
    this.currentModal = this.modal.open(this.modalCreated, {
      size: 'lg',
      backdropClass: 'transparent-backdrop',
       backdrop: 'static',
      centered: true
    });
  }

  close() {
    if (this.currentModal) {
      this.currentModal.close();
    }
  }

  onSubmit() {
    this.submit.emit(this.issue_form);
    this.issue_form = {
      category: null,
      description: null,
      email: null
    }
  }

}
