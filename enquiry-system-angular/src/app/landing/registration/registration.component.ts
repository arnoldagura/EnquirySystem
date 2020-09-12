import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthState } from 'src/app/shared/stores/states/auth.state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration_form : User;
  message: string;
  @Emitter(AuthState.GetUser)
  private getUser: Emittable<void>;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.registration_form = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      userType: null,
      password: null
    };
    this.message = null;
  }

  register(){
    this.userService.register(this.registration_form).subscribe(x => {
      this.authenticationService.login(this.registration_form.username, this.registration_form.password).subscribe(x => {
        this.getUser.emit().subscribe();
        this.router.navigate(['/customer-issues']);
      },err => {
        console.log('err', err);
      this.message = err;
      });
    },err => {
      console.log('err', err);
    this.message = err;
    });
  }
}
