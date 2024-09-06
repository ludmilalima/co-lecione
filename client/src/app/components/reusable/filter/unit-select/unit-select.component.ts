import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsoLanguageCodeEnum, NodeInfo, VocabularyType } from 'src/app/core/models/metadata/util.model';
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


export class UnitSelectComponent implements OnInit {
  @Input() object: any;
  @Input() filterComponent: Array<any>;
  @Output() valueChange = new EventEmitter<string>();

  filter: FilterComponent = new FilterComponent();
  result: VocabularyType;
  selectedValue: any;


  ngOnInit() {
    this.result = this.object;
  }

  onSelectionChange(event: any) {
    this.selectedValue = event as string;
    this.valueChange.emit(this.selectedValue);
  }

  reset() {
    this.selectedValue = '';
  }
}