// src/app/request-submission/request-submission.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-submission',
  templateUrl: './request-submission.component.html',
  styleUrls: ['./request-submission.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
})
export class RequestSubmissionComponent implements OnInit {
  requestForm: FormGroup;
  successMessage: string;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      details: ['', Validators.required],
      amount: [null],
      date: ['', Validators.required]
    });

    this.requestForm.get('type').valueChanges.subscribe((value) => {
      if (value === 'expense') {
        this.requestForm.get('amount').setValidators([Validators.required, Validators.min(0)]);
      } else {
        this.requestForm.get('amount').clearValidators();
      }
      this.requestForm.get('amount').updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.requestService.submitRequest(this.requestForm.value).subscribe(
        (res) => {
          this.successMessage = 'Request submitted successfully!';
          this.errorMessage = '';
          this.requestForm.reset();
        },
        (err) => {
          this.errorMessage = 'Failed to submit request. Please try again.';
          this.successMessage = '';
        }
      );
    }
  }
}
