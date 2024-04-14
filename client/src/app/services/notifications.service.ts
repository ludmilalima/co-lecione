import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notifications, NotificationsType } from '../models/notifications';


@Injectable()
export class NotificationsService {
  private _subject = new Subject<Notifications>();
  private _idx = 0;

  constructor() { }

  getObservable(): Observable<Notifications> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this._emit(NotificationsType.info, title, message, timeout);
  }

  success(title: string, message: string, timeout = 3000) {
    this._emit(NotificationsType.success, title, message, timeout);
  }

  warning(title: string, message: string, timeout = 3000) {
    this._emit(NotificationsType.warning, title, message, timeout);
  }

  error(title: string, message: string, timeout = 0) {
    this._emit(NotificationsType.error, title, message, timeout);
  }

  private _emit(type: NotificationsType, title: string, message: string, timeout: number) {
    this._subject.next(new Notifications(this._idx++, type, title, message, timeout));
  }
}