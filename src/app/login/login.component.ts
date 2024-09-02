import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
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