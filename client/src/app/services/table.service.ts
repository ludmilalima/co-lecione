import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableContent } from '../models/table';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = `${environment.baseUrl}/tableContents`;
  private tables$: Subject<TableContent[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.error);
    return new Observable<never>((observer) => {
      observer.error(error.error);
      observer.complete();
    });
  }

  getTables(): Subject<TableContent[]> {
    this.httpClient.get<TableContent[]>(this.apiUrl)
    .pipe(
      tap(tables => this.tables$.next(tables)),
      catchError(this.handleError),
    )
    .subscribe();
    
    return this.tables$;
  }
}
