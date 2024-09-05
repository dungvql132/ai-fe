import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class NotificationComponent {
  showNotification = false;
  message = '';
  type: string;

  constructor(private notificationService: NotificationService) {
    this.notificationService.getNotification().subscribe(notification => {
      this.message = notification.message;
      this.type = notification.type;
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    });
  }

  closeNotification() {
    this.showNotification = false;
  }
}
