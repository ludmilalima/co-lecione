import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionControllerService } from './session-controller.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.baseUrl}/users`;
  private users$: Subject<User[]> = new Subject();
  private token: string | null = null;

  constructor
    (
      private httpClient: HttpClient,
      private _notificationsService: NotificationsService,
      private _sessionControllerService: SessionControllerService,
    ) { }

  private handleError(error: any): Observable<never> {
    console.error('UserService error: ', error);
    this._notificationsService.error('Erro!', error.message || 'Um erro ocorreu, tente novamente mais tarde.', 5000);
    return throwError(() => error.error);
  }

  private setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    this.loadToken();
    return this.token;
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.setToken(token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    this.setToken(token);
  }

  private setUser(user: User) {
    localStorage.setItem('name', user?.name);
    localStorage.setItem('email', user?.email);
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

  createUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<any>(`${this.apiUrl}/register`, user, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  login(email: string, password: string): Observable<any> {
    if (email == 'admin@email.com' || email == 'operator@email.com') {
      return this._sessionControllerService.cookieLogin(email, password).pipe(
        tap({
          next: (res: any) => {
            this.saveToken('CookieOnly');
          },
          error: (error: any) => {
            this.handleError(error.error);
          }
        })
      );
    } else {
      return this.httpClient.post(`${this.apiUrl}/login`, { email, password }, { responseType: 'text' }).pipe(
        tap({
          next: (token: any) => {
            this.saveToken(token);
          },
          error: (error: any) => {
            this.handleError(error.error);
          }
        })
      );
    }
  }

  getUserInfo(): Observable<User> {
    this.loadToken();
    const token = this.getToken();

    if (!token) {
      // Handle the case when the token is not available
      // You can redirect the user to the login page or take appropriate action
      // For now, let's throw an error
      this._notificationsService.info('Atenção', 'Não há usuário logado.', 5000);
      return throwError(() => new Error('No user logged in'));
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

  logout(): Observable<any> {
    const token = this.getToken();

    if (token === 'CookieOnly') {
      return this._sessionControllerService.cookieLogout().pipe(
        tap({
          next: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            this.setToken(null);
          },
          error: (error: any) => {
            this.handleError(error.error);
          }
        })
      );
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      this.setToken(null);
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }
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