import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, KeyValueDiffers, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sortable-table',
  standalone: true,
  imports: [
    CommonModule,

    CardsComponent,
    QuestionComponent,

    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './sortable-table.component.html',
  styleUrl: './sortable-table.component.scss'
})
export class SortableTableComponent {
  @Input() selectedObjects: Array<any> = [];

  @ViewChild('table', { static: true }) table: MatTable<any>;

  displayedColumns: string[] = ['reorder', 'position', 'remove'];

  dataSource = new MatTableDataSource<any>(this.selectedObjects);
  private selectedObjectsDiffer: any;

  constructor(
    private differs: KeyValueDiffers
  ) {
    this.selectedObjectsDiffer = this.differs.find(this.selectedObjects).create();
  }

  ngDoCheck(): void {
    const selectedObjectsCopy = JSON.parse(JSON.stringify(this.selectedObjects));
    const selectedObjectsChanges = this.selectedObjectsDiffer.diff(selectedObjectsCopy);
    if (selectedObjectsChanges) {
      this.dataSource.data = this.selectedObjects;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    console.log(event.item.data);
    const previousIndex = this.dataSource.data.findIndex(d => d === event.item.data);
    console.log(previousIndex);
    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  addObject(row: any) {
    if (!this.isSelected(row)) {
      this.selectedObjects.push(row);
    }
  }

  removeObject(row: any) {
    const index = this.selectedObjects.indexOf(row);
    if (index >= 0) {
      this.fixPosition(index);
      this.selectedObjects.splice(index, 1);
    }
  }

  fixPosition(index: number) {
    let minPosition = this.selectedObjects[index].position;
    this.selectedObjects.map((object, i) => {
      if (object.position > minPosition) {
        object.position--;
      }
    });
  }

  isSelected(row: any): boolean {
    return this.selectedObjects.includes(row);
  }
}
