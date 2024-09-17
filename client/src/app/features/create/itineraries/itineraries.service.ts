import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { environment } from 'src/environments/environment';
import { Itineraries } from './itineraries.model';

@Injectable({
  providedIn: 'root'
})
export class ItinerariesService {

  baseUrl = environment.baseUrl;

  constructor(private _notificationsService: NotificationsService) { }

  private handleError(error: any): Observable<never> {
    this._notificationsService.error('ItinerariesService error:', error['message']);
    console.error('ItinerariesService error: ', error);
    return throwError(() => error.error);
  }

  createItinerary(itinerary: Itineraries): Observable<any> {
    return from(fetch(this.baseUrl + '/itineraries/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itinerary)
    }).then(response => {
      if (!response.ok) {
        this.handleError(response);
        throw new Error('Failed to create itinerary');
      }
      return response.json();
    }).catch(error => {
      this.handleError(error);
      throw error;
    }));
  }

  getItineraryById(id: string): Observable<any> {
    return from(
      fetch(`${this.baseUrl}/itineraries/search-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to get itinerary');
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

  getAllItineraries(): Observable<any> {
    return from(fetch(this.baseUrl + '/itineraries/read-all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        this.handleError(response);
        throw new Error('Failed to get itineraries');
      }
      return response.json();
    }).catch(error => {
      this.handleError(error);
      throw error;
    }));
  }

  filterAny(filters: any): Observable<any> {
    return from(
      fetch(`${this.baseUrl}/itineraries/search-any`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || 'Failed to get itineraries');
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
