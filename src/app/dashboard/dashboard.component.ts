import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandlerService } from '../services/error-handler.service';
import trans from '../shared/trans';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class DashboardComponent implements OnInit {
  requests: any[] = [];
  allRequests: any[] = [];
  filteredRequests: any[] = [];
  filterType: string = '';
  filterStatus: string = '';
  translations: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private requestService: RequestService, 
    private globalErrorHandlerService: GlobalErrorHandlerService
  ) { }

  ngOnInit(): void {
    const lang = localStorage.getItem("lang");
    this.translations = trans[lang] || trans['en'];
    this.requestService.getRequests().subscribe(
      (res) => {
        console.log("getRequests: ", res);
        this.requests = res;
        this.allRequests = res;
        this.setPage(1); // Initialize the first page
      },
      (err) => {
        this.globalErrorHandlerService.handleError(err);
      }
    );
  }

  applyFilters(): void {
    console.log("-----------------1");
    console.log(this.allRequests);
    console.log(this.filterType);
    console.log(this.filterStatus);
    console.log("-----------------");
    
    const filtered = this.allRequests.filter((request) => {
      return (
        (this.filterType ? request.type === this.filterType : true) &&
        (this.filterStatus ? request.status === this.filterStatus : true)
      );
    });
    this.requests = filtered;
    this.filteredRequests = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage, 
      this.currentPage * this.itemsPerPage
    );
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.applyFilters();
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

  get totalPages(): number {
    return Math.ceil(this.requests.length / this.itemsPerPage);
  }
}
