import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl = `${environment.baseUrl}`;
  private users$: Subject<User[]> = new Subject();
  private token: string | null = null;

  constructor(
    private httpClient: HttpClient,
  ) { }

  private handleError(error: any): Observable<never> {
    console.error('ObjectsService error: ', error);
    return throwError(() => error.error);
  }

  
  createCard(cardData: any): Observable<any> {
    const url = `${this.apiUrl}/cards/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.httpClient.post(url, cardData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCards(): Observable<any> {
    const url = `${this.apiUrl}/cards/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.httpClient.get(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
