// src/app/services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:5000/api/requests';

  constructor(private http: HttpClient) {}

  submitRequest(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestData);
  }

  getUserRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`);
  }

  getPendingRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  approveRequest(requestId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/approve/${requestId}`, {});
  }

  rejectRequest(requestId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/reject/${requestId}`, {});
  }
}