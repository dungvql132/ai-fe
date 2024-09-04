import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<any>();

  constructor() {}

  showNotification(message: string) {
    this.notificationSubject.next({ message });
  }

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
