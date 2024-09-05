import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NodeInfo } from 'src/app/core/models/metadata/util.model';
import { FilterComponent } from '../filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './unit-checkbox.component.html',
  styleUrls: ['./unit-checkbox.component.scss']
})
export class UnitCheckboxComponent {
  @Input() nodeInfo: NodeInfo;
  @Output() valueChange = new EventEmitter<string[]>();

  filter: FilterComponent = new FilterComponent();
  selectedValues: string[] = [];

  onCheckboxChange(event: any, item: string) {
    if (event.checked) {
      this.selectedValues.push(item);
    } else {
      const index = this.selectedValues.indexOf(item);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }
    this.valueChange.emit(this.selectedValues);
  }

  isSelected(item: string): boolean {
    return this.selectedValues.includes(item);
  }

  reset() {
    this.selectedValues = [];
  }
}