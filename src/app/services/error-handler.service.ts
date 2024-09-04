import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private http: HttpClient,private injector: Injector) { }

  handleError(error: any): void {
    // Tạo đối tượng thông báo lỗi
    const notificationService = this.injector.get(NotificationService);
    const errorMessage = {
      message: error.message ? error.message : 'Unknown error',
      stack: error.stack ? error.stack : 'No stack trace available'
    };

    // Ghi lỗi vào máy chủ
    this.http.post('/api/logs', errorMessage)
      .subscribe({
        next: () => console.log('Error logged to server'),
        error: err => console.log('Failed to log error to server', err)
      });
    notificationService.showNotification(errorMessage.message);
    // Tùy chọn: ghi lỗi ra console
    console.error('An error occurred:', errorMessage);
  }
}
