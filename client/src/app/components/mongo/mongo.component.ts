import { Component } from "@angular/core";
import { TableComponent } from "../reusable/table/table.component";
import { TableColumn } from "../reusable/table/TableColumn";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-mongo",
  templateUrl: "./mongo.component.html",
  styleUrls: ["./mongo.component.css"],
})
export class MongoComponent {
  table = new TableComponent();

  employees: Employee[] = [
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
    if (sortParameters.direction === "asc") {
      this.employees = this.employees.sort((a: Employee, b: Employee) =>
        a[keyName].localeCompare(b[keyName])
      );
    } else if (sortParameters.direction === "desc") {
      this.employees = this.employees.sort((a: Employee, b: Employee) =>
        b[keyName].localeCompare(a[keyName])
      );
    } else {
      this.employees = this.getEmployees();
    }
  }

  removeOrder(employee: Employee) {
    this.employees = this.employees.filter(item => item.name !== employee.name);
  }

  getEmployees() : any[] {
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
}

interface Employee {
  name: string;
  age: number;
  position: string;
}
