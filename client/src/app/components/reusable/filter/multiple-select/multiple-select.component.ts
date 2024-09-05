import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NodeInfo } from 'src/app/core/models/metadata/util.model';
import { FilterComponent } from '../filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent {
  @Input() nodeInfo: NodeInfo;
  @Output() valueChange = new EventEmitter<string[]>();

  filter: FilterComponent = new FilterComponent();
  selectedValues: string[] = [];

  onSelectionChange(event: any) {
    this.selectedValues = event as string[];
    this.valueChange.emit(this.selectedValues);
  }

  reset() {
    this.selectedValues = [];
  }
}