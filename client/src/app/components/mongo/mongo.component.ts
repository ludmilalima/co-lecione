import { Component } from '@angular/core';
import { TableComponent } from '../reusable/table/table.component';

@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})

interface Employee {
  name: string;
  age: number;
  position: string;
}

export class MongoComponent {
  table = new TableComponent();

  employees: Employee[] = [
    { name: 'João', age: 30, position: 'Desenvolvedor' },
    { name: 'Maria', age: 35, position: 'Gerente' },
    { name: 'Pedro', age: 28, position: 'Analista' }
  ];

  tableColumns: string[] = ['name', 'age', 'position'];
}
