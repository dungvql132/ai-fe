// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import trans from '../shared/trans'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterType: string = '';
  filterStatus: string = '';
  translations: any;

  constructor(private requestService: RequestService, private globalErrorHandlerService: GlobalErrorHandlerService,) { }

  ngOnInit(): void {
    const lang = localStorage.getItem("lang");
    this.translations = trans[lang] || trans['en'];
    this.requestService.getRequests().subscribe(
      (res) => {
        console.log("getRequests: ", res);
        this.requests = res;
        this.filteredRequests = res;
      },
      (err) => {
        this.globalErrorHandlerService.handleError(err);
      }
    );
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter((request) => {
      return (
        (this.filterType ? request.type === this.filterType : true) &&
        (this.filterStatus ? request.status === this.filterStatus : true)
      );
    });
  }

  approveRequest(requestId: string): void {
    this.requestService.approveRequest(requestId).subscribe(
      (res) => {
        this.updateRequestStatus(requestId, 'approved');
      },
      (err) => {
        this.globalErrorHandlerService.handleError(err);
      }
    );
  }

  rejectRequest(requestId: string): void {
    this.requestService.rejectRequest(requestId).subscribe(
      (res) => {
        this.updateRequestStatus(requestId, 'rejected');
      },
      (err) => {
        this.globalErrorHandlerService.handleError(err);
      }
    );
  }

  updateRequestStatus(requestId: string, status: string): void {
    const request = this.requests.find((req) => req.id === requestId);
    if (request) {
      request.status = status;
      this.applyFilters();
    }
  }
}
