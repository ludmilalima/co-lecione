import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.baseUrl}/users`;
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return new Observable<never>((observer) => {
      observer.error('Something went wrong');
      observer.complete();
    });
  }
  

  private refreshUsers() {
    this.httpClient.get<User[]>(this.apiUrl)
      .pipe(
        tap(users => this.users$.next(users)),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}`, user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
}
