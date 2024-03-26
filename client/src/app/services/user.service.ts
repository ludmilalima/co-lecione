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
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.error);
    return new Observable<never>((observer) => {
      observer.error(error.error);
      observer.complete();
    });
  }

  private setToken(token: string | null) {
    this.token = token;
  }

  private getToken(): string | null {
    return this.token;
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    this.setToken(token);
  }

  private setUser(user: User) {
    localStorage.setItem('name',user?.name);
    localStorage.setItem('email',user?.email);
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
    return this.httpClient.get<User>(`${this.apiUrl}/id/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  checkEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/check-email/${email}`);
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/register`, user, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post(`${this.apiUrl}/login`, { email, password }, { responseType: 'text' }).pipe(
      tap({
        next: (token: any) => {
          this.saveToken(token);
          this.setToken(token);
        },
        error: (error: any) => {
          this.handleError(error.error);
        }
      })
    );
  }
  
  getUserInfo(): Observable<User> {
    const token = this.getToken();

    if (!token) {
      // Handle the case when the token is not available
      // You can redirect the user to the login page or take appropriate action
      // For now, let's throw an error
      throw new Error('Token not found.');
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };
    
   return this.httpClient.get<User>(`${this.apiUrl}/currentUser`, { headers }).pipe(
      tap({
        next: (user: any) => {
          this.setUser(user);
        },
        error: (error: any) => {
          this.handleError(error.error);
        }
      })
    );
  }

  logout() {
    // Remova o token armazenado no cliente (por exemplo, localStorage)
    localStorage.removeItem('token');
    this.setToken(null);
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
