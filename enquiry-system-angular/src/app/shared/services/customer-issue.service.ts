import { Injectable } from '@angular/core';
import { ServerConfig } from 'src/app/config/server.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerIssue } from '../models/customer-issue.model';
import { map } from 'rxjs/operators';
import { CommonParams } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerIssueService {

  constructor(private http: HttpClient) { }

  submitCustomerIssue(issue: CustomerIssue) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.post(`${ServerConfig.API}CustomerIssue`, issue, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCustomerIssues() {
    return this.http.get(`${ServerConfig.API}CustomerIssue`).pipe(
      map(response => {
        return response as CustomerIssue[];
      })
    );
  }

  updateCustomerIssue(issue: CustomerIssue) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.put(`${ServerConfig.API}CustomerIssue`, issue, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteCustomerIssue(id: number) {
    const headers = new HttpHeaders().append('Accept', 'application/json');
    return this.http.delete(`${ServerConfig.API}CustomerIssue/${id}`, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

}
