import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<any>();

  constructor() { }

  showNotification(message: string, type: string) {
    this.notificationSubject.next({ message, type });
  }

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
