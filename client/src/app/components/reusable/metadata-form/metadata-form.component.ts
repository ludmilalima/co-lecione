import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { FilterComponent } from 'src/app/components/reusable/filter/filter.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';

@Component({
  selector: 'app-metadata-form',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,
    FilterComponent,

    MatTabsModule,
    MatButtonModule,
  ],
  templateUrl: './metadata-form.component.html',
  styleUrl: './metadata-form.component.scss'
})
export class MetadataFormComponent {
  @Input() metadata: Array<any>;
  @Input() buttonAction: { label: string, action: Function };

  @ViewChild('filter', { read: FilterComponent }) filter: FilterComponent;

  clearFilters() {
    this.filter.clearFilters();
  }
}
