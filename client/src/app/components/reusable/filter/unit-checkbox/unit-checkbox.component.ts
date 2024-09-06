import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BooleanType, NodeInfo } from 'src/app/core/models/metadata/util.model';
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
  @Input() object: any;
  @Output() valueChange = new EventEmitter<string[]>();

  filter: FilterComponent = new FilterComponent();

  onCheckboxChange(event: any) {
    this.valueChange.emit(event);
  }
}