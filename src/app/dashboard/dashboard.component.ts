// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  filterType: string = '';
  filterStatus: string = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getUserRequests().subscribe(
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
}
