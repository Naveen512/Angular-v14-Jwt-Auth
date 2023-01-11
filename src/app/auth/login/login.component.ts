import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LoginModel } from '../login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm: LoginModel = {
    Email: '',
    Password: '',
  };

  ngOnInit(): void {}

  userLogin() {
    this.authService.userLogin(this.loginForm).subscribe((data) => {
      if (data) {
        this.router.navigate(['/']);
      }
    });
  }
}
