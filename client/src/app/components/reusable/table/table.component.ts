import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableColumn } from './TableColumn.interface';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DataPropertyGetterPipe } from 'src/app/pipes/data-property-getter.pipe';

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataPropertyGetterPipe,
  ],
})

export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

k

  // async getEmployees(index: number) {
  //   await this.getTables(index)
  //     .then(table => {
  //       const lista: string[] = table
  //         .replace(/\\/g, '')
  //         .split('\n')
  //         .map(item => item.trim());

  //       let objList: any[] = [];

  //       lista.forEach(item => {
  //         // Verifica se o último caractere é uma vírgula
  //         if (item.charAt(item.length - 1) === ',') {
  //           // Remove a última vírgula usando slice
  //           item = item.slice(0, -1);
  //         }
  //         let obj = JSON.parse(item);
  //         objList.push(obj);
  //       });

  //       this.employees = objList;
  //     }).catch(error => {
  //       console.error('Erro na recuperação de dados da tabela\n', error);
  //       this._notificationService.error(`Erro na recuperação de dados da tabela`, `Checar o documento da tabela id=${index} (verifique mais detalhes do erro no console).`);
  //     });
  // }

  // async getTables(index: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.tableService.getTablesById(index).subscribe(
  //       response => {
  //         const table = response.find(item => item.contentId == index);
  //         if (table) {
  //           resolve(table.content);
  //         } else {
  //           reject(new Error('Índice não encontrado'));
  //         }
  //       },
  //       error => {
  //         reject(error);
  //       }
  //     );
  //   });
  // }
}