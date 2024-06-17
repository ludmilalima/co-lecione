import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objects } from './objects.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  baseUrl = environment.baseUrl;

  constructor() { }

  private handleError(error: any): Observable<never> {
    console.error('UserService error: ', error);
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
    return from(fetch(this.baseUrl + '/objects/list-all', {
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
}
