import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import trans from '../shared/trans'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class ReportComponent implements OnInit {

  abnormalCaseCount: number = 0;
  lateComingEarlyLeaveCount: number = 0;
  pendingRequestCount: number = 0;
  translations:any;

  constructor(private requestService: RequestService, private globalErrorHandlerService: GlobalErrorHandlerService) {}

  ngOnInit(): void {
    const lang = localStorage.getItem("lang");
    this.translations = trans[lang] || trans['en'];
    this.getRequestCounts();
  }

  getRequestCounts(): void {
    this.requestService.getRequestCountsByType()
      .subscribe((data) => {
        data.forEach(request => {
          if (request._id === 'leave') {
            this.lateComingEarlyLeaveCount = request.count;
          } else if (request._id === 'expense') {
            this.pendingRequestCount = request.count;
          } else if (request._id === 'travel') {
            this.abnormalCaseCount = request.count;
          }
        });
      },
      (error) => {
        this.globalErrorHandlerService.handleError(error);
      });
  }
}
