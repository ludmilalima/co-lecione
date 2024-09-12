import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';

@Component({
  selector: 'app-selection-table',
  standalone: true,
  imports: [
    CommonModule,

    CardsComponent,
    QuestionComponent,

    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './selection-table.component.html',
  styleUrl: './selection-table.component.scss'
})
export class SelectionTableComponent {
  @Input() objects: Array<any> = [];
  @Input() selectedObjects: Array<any> = [];

  displayedColumns: string[] = ['add', 'object'];
  dataSource = new MatTableDataSource<any>(this.objects);
  selection = new SelectionModel<any>(true, []);

  addObject(row: any) {
    if (!this.isSelected(row)) {
      row.position = this.selectedObjects.length + 1;
      this.selectedObjects.push(row);
    }
  }

  isSelected(row: any): boolean {
    return this.selectedObjects.includes(row);
  }

}
