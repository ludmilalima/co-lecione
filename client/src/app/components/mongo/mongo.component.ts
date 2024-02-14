import { Component } from "@angular/core";
import { TableComponent } from "../reusable/table/table.component";
import { TableColumn } from "../reusable/table/TableColumn";
import { Sort } from "@angular/material/sort";
import { Row } from "../reusable/cornell/Row";
import { TableContent } from "src/app/models/table";
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

  table = new TableComponent();
  employees: any = undefined;

  ngOnInit() {
    this.employees = this.getEmployees(2);
  }

  cornellData: Row[] = [
    { position: 3, cue: "CCCC", note: "BBBBB" },
    { position: 2, cue: "BBBB", note: "BBBBB" },
    { position: 1, cue: "AAAA", note: "BBBBB" },
  ];

  tableColumns: TableColumn[] = [
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
    console.log(sortParameters);
    if (sortParameters.direction === "asc") {
      this.employees = this.employees.sort((a: any, b: any) =>
        a[keyName].localeCompare(b[keyName])
      );
    } else if (sortParameters.direction === "desc") {
      this.employees = this.employees.sort((a: any, b: any) =>
        b[keyName].localeCompare(a[keyName])
      );
    } else {
      this.getEmployees(2);
    }
  }

  removeOrder(employee: any) {
    this.employees = this.employees.filter(item => item.name !== employee.name);
  }

  getEmployees(index: number) {
    let content = this.getTables(index);
    console.log(content);
    return this.getTables(index);
    return [
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
      { name: "João", age: 30, position: "Desenvolvedor" },
      { name: "Maria", age: 35, position: "Gerente" },
      { name: "Pedro", age: 28, position: "Analista" },
    ];
  }

  getTables(index: number): any {
    this.tableService.getTables().subscribe(
      response => {
        console.log(response.find(item => item.contentId == index).content);
        return response.find(item => item.contentId == index).content;
        
        // console.log(this.employees);
        // this.table.tableData = [this.employees];
        // console.log(this.table.tableData);
      }
    );
  }
}
