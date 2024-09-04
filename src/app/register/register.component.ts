import { Component, OnInit, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
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
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log('Please correct the highlighted errors and try again.');
    }
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (res) => {
          console.log("res: ", res);
          localStorage.setItem('token', res.token);
          const userRole = res.role;
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.globalErrorHandlerService.handleError(err);
        }
      );
    }
  }
}
