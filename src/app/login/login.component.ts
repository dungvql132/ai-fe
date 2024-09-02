import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    password: new FormControl(''),
    username: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    console.log("hahaha", this.loginForm.valid)
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          const userRole = res.user.role;
          if (userRole === 'employee') {
            this.router.navigate(['/employee-dashboard']);
          } else if (userRole === 'manager') {
            this.router.navigate(['/manager-dashboard']);
          } else if (userRole === 'administrator') {
            this.router.navigate(['/admin-dashboard']);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}