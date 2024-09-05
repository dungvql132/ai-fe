import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import { NotificationService } from '../services/notification.service';

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
    email: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      console.log('Please correct the highlighted errors and try again.');
    }
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log("res: ",res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('name', res.userName);
          const userRole = res.role;
          const userName = res.userName;
          // if (userRole === 'employee') {
          //   this.router.navigate(['/employee-dashboard']);
          // } else if (userRole === 'manager') {
          //   this.router.navigate(['/manager-dashboard']);
          // } else if (userRole === 'administrator') {
          //   this.router.navigate(['/admin-dashboard']);
          // }
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.globalErrorHandlerService.handleError(err);
        }
      );
    }
  }
}