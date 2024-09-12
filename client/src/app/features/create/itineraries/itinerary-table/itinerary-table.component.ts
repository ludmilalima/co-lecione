import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, DoCheck, Input, KeyValueDiffers, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-itinerary-table',
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
  templateUrl: './itinerary-table.component.html',
  styleUrl: './itinerary-table.component.scss'
})
export class ItineraryTableComponent implements DoCheck {
  @Input() selectedObjects: Array<any> = [];

  @ViewChild('table', { static: true }) table: MatTable<any>;

  displayedColumns: string[] = ['position', 'object'];

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
}
