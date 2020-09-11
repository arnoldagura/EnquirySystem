import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerIssue } from '../models/customer-issue.model';
import { map } from 'rxjs/operators';
import { CommonParams } from '../models/common.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerIssueService {

  constructor(private http: HttpClient) { }

  submitCustomerIssue(issue: CustomerIssue) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.post(`${environment.apiUrl}CustomerIssue`, issue, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCustomerIssues() {
    return this.http.get(`${environment.apiUrl}CustomerIssue`).pipe(
      map(response => {
        return response as CustomerIssue[];
      })
    );
  }

  updateCustomerIssue(issue: CustomerIssue) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.put(`${environment.apiUrl}CustomerIssue`, issue, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCustomerIssue(id: number) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.delete(`${environment.apiUrl}CustomerIssue/${id}`, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

}
