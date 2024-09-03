// src/app/manager-dashboard/manager-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ManagerDashboardComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterType: string = '';
  filterStatus: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getPendingRequests().subscribe(
      (res) => {
        this.requests = res;
        this.filteredRequests = res;
      },
      (err) => {
        console.error(err);
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
        console.error(err);
      }
    );
  }

  rejectRequest(requestId: string): void {
    this.requestService.rejectRequest(requestId).subscribe(
      (res) => {
        this.updateRequestStatus(requestId, 'rejected');
      },
      (err) => {
        console.error(err);
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
