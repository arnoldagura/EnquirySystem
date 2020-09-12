import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: Login;
  message: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = {
      username: null,
      password: null
    };
  }

  login() {
    this.message = null;
    this.authenticationService.login(this.loginForm.username, this.loginForm.password).subscribe(x => {
      
      this.router.navigate(['/customer-issues']);
    },err => {
    this.message = err;
    });
  }
}
