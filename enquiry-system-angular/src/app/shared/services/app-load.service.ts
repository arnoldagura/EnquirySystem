import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Emittable, Emitter } from '@ngxs-labs/emitter';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { switchMap } from 'rxjs/operators';
import { AuthState } from '../stores/states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class ApploadService {


  @SelectSnapshot(AuthState.isAuthorized)
  private isAuthorized: boolean;
  
  @Emitter(AuthState.GetUser)
  private getUser: Emittable<void>;

  constructor(private router: Router) { }

  load() {
    return new Promise((resolve) => {
      this.getUser.emit().subscribe(() => {
          if(this.isAuthorized) {
             this.router.navigate(['/customer-issues']);
          }
        resolve(true);
      });
    });
  }
}
