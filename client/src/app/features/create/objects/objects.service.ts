import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objects } from './objects.model';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  baseUrl = environment.baseUrl;

  constructor(private _notificationsService: NotificationsService) { }

  private handleError(error: any): Observable<never> {
    this._notificationsService.error('ObjectService error:', error['message']);
    console.error('ObjectService error: ', error);
    return throwError(() => error.error);
  }

  createObject(object: Objects): Observable<any> {
    return from(fetch(this.baseUrl + '/objects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    }).then(response => {
      if (!response.ok) {
        this.handleError(response);
        throw new Error('Failed to create object');
      }
      return response.json();
    }).catch(error => {
      this.handleError(error);
      throw error;
    }));
  }


  getAllObjects(): Observable<any> {
    return from(fetch(this.baseUrl + '/objects/read-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        this.handleError(response);
        throw new Error('Failed to get objects');
      }
      return response.json();
    }).catch(error => {
      this.handleError(error);
      throw error;
    }));
  }

  filterAny(filters: any): Observable<any> {
    return from(
      fetch(`${this.baseUrl}/objects/search-any`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to get objects');
            });
          }
          return response.json();
        })
        .catch(error => {
          this.handleError(error);
          throw error;
        })
    );
  }
}
