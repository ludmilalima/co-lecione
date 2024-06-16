import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { Notifications, NotificationsType } from './notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications: Notifications[] = [];
  private _subscription: Subscription;

  constructor
    (
      private _notificationService: NotificationsService,
    ) { }

  ngOnInit() {
    this._subscription = this._notificationService.getObservable().subscribe(notification => {
      this._addNotification(notification);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _addNotification(notification: Notifications) {
    if (!notification) {
      console.error('Notification is undefined or null');
      return;
    }

    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      window.setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  close(notification: Notifications) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }

  className(notification: Notifications): string {
    const typeStyleMap = {
      [NotificationsType.success]: 'success',
      [NotificationsType.warning]: 'warning',
      [NotificationsType.error]: 'error'
    };

    return typeStyleMap[notification.type] || 'info';
  }
}