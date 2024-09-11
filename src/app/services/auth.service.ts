// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: Partial<{ email: string; password: string }>): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/login`, credentials);
  }

  register(credentials: Partial<{ email: string; password: string }>): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/register`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
