import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, finalize, shareReplay, tap, throwError } from 'rxjs';
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

  // Método para buscar todas as tabelas
  getTables(): Observable<TableContent[]> {
    const tables$ = new Subject<TableContent[]>();

    this.httpClient.get<TableContent[]>(this.apiUrl)
      .pipe(
        tap(tables => tables$.next(tables)),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        }),
        finalize(() => {
          // Desinscrever do observable após a primeira requisição
          tables$.complete();
        }),
        shareReplay(1) // Compartilhar os resultados da requisição entre múltiplas subscrições
      )
      .subscribe();

    return tables$;
  }

  // Método para buscar tabelas filtradas por ID
  getTablesById(tableId: number): Observable<TableContent[]> {
    const filteredTables$ = new Subject<TableContent[]>();

    this.httpClient.get<TableContent[]>(`${this.apiUrl}?id=${tableId}`)
      .pipe(
        tap(tables => filteredTables$.next(tables)),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        }),
        finalize(() => {
          // Desinscrever do observable após a primeira requisição
          filteredTables$.complete();
        }),
        shareReplay(1) // Compartilhar os resultados da requisição entre múltiplas subscrições
      )
      .subscribe();

    return filteredTables$;
  }

}
