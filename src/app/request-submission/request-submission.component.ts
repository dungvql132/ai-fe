import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RequestService } from '../services/request.service';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import { NotificationService } from '../services/notification.service';
import trans from '../shared/trans'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-request-submission',
  templateUrl: './request-submission.component.html',
  styleUrls: ['./request-submission.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RequestSubmissionComponent implements OnInit {
  requestForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  translations: any;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private globalErrorHandlerService: GlobalErrorHandlerService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      attachment: [null],
      department: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const lang = localStorage.getItem("lang");
    this.translations = trans[lang] || trans['en'];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.requestForm.patchValue({
        attachment: file,
      });
    }
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      console.log('Please correct the highlighted errors and try again.');
    }
    if (this.requestForm.valid) {
      const formData = new FormData();
      formData.append('type', this.requestForm.get('type')?.value);
      formData.append('startDate', this.requestForm.get('startDate')?.value);
      formData.append('endDate', this.requestForm.get('endDate')?.value);
      formData.append('reason', this.requestForm.get('reason')?.value);
      formData.append('attachment', this.requestForm.get('attachment')?.value);
      formData.append('department', this.requestForm.get('department')?.value);

      this.requestService.submitRequest(formData).subscribe(
        (response) => {
          this.successMessage = 'Request submitted successfully!';
          this.errorMessage = null;
          this.globalErrorHandlerService.successError(this.successMessage);
          this.router.navigate(["/dashboard"]);
        },
        (error) => {
          this.errorMessage = 'Failed to submit request.';
          this.successMessage = null;
          this.globalErrorHandlerService.handleError(error);
        }
      );
    }
  }
}