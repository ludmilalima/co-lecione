import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsoLanguageCodeEnum, NodeInfo } from 'src/app/core/models/metadata/util.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'app-unit-select',
  standalone: true,
  imports: [
    FormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './unit-select.component.html',
  styleUrl: './unit-select.component.scss'
})


export class UnitSelectComponent {
  @Input() nodeInfo: NodeInfo;
  @Output() valueChange = new EventEmitter<string>();

  filter: FilterComponent = new FilterComponent();
  selectedValue: string;

  onSelectionChange(event: any) {
    this.selectedValue = event as string;
    this.valueChange.emit(this.selectedValue);
  }

  reset() {
    this.selectedValue = '';
  }
}