import { Component } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Row } from "../reusable/cornell/Row";
import { TableService } from "src/app/services/table.service";

@Component({
  selector: "app-mongo",
  templateUrl: "./mongo.component.html",
  styleUrls: ["./mongo.component.scss"],
})
export class MongoComponent {

  constructor(
    private tableService: TableService,
  ) { }

  //table = new TableComponent();
  employees: any = undefined;

  ngOnInit() {
    this.getEmployees(2);
  }

  cornellData: Row[] = [
    { position: 3, cue: "CCCC", note: "BBBBB" },
    { position: 2, cue: "BBBB", note: "BBBBB" },
    { position: 1, cue: "AAAA", note: "BBBBB" },
  ];

  tableColumns: any[] = [
    {
      name: "name",
      dataKey: "name",
      isSortable: true,
    },
    {
      name: "age",
      dataKey: "age",
      isSortable: true,
    },
    {
      name: "position",
      dataKey: "position",
      isSortable: true,
    },
  ];

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === "asc") {
      this.employees = this.employees.sort((a: any, b: any) => {
        if (typeof a[keyName] === 'number' && typeof b[keyName] === 'number') {
          return a[keyName] - b[keyName];
        } else {
          return a[keyName].localeCompare(b[keyName]);
        }
      });
    } else if (sortParameters.direction === "desc") {
      this.employees = this.employees.sort((a: any, b: any) => {
        if (typeof a[keyName] === 'number' && typeof b[keyName] === 'number') {
          return b[keyName] - a[keyName];
        } else {
          return b[keyName].localeCompare(a[keyName]);
        }
      });
    } else {
      this.getEmployees(2);
    }
  }


  removeOrder(employee: any) {
    this.employees = this.employees.filter(item => item.name !== employee.name);
  }

  async getEmployees(index: number) {
    await this.getTables(index)
      .then(table => {
        const lista: string[] = table
          .replace(/\\/g, '')
          .split('\n')
          .map(item => item.trim());

        let objList: any[] = [];

        lista.forEach(item => {
          // Verifica se o último caractere é uma vírgula
          if (item.charAt(item.length - 1) === ',') {
            // Remove a última vírgula usando slice
            item = item.slice(0, -1);
          }
          let obj = JSON.parse(item);
          objList.push(obj);
        });

        this.employees = objList;
      }).catch(error => {
        console.log(`Erro: ${error}\n\nChecar a formatação do conteúdo da tabela com id=${index}.`);
      });
  }

  async getTables(index: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.tableService.getTablesById(index).subscribe(
        response => {
          const table = response.find(item => item.contentId == index);
          if (table) {
            resolve(table.content);
          } else {
            reject(new Error('Índice não encontrado'));
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

}
