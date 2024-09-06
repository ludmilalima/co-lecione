import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UnitCheckboxComponent } from '../unit-checkbox/unit-checkbox.component';
import { NodeInfo, BooleanType } from 'src/app/core/models/metadata/util.model';
import { FilterComponent } from '../filter.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-boolean-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    UnitCheckboxComponent,

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './boolean-type-filter.component.html',
  styleUrl: './boolean-type-filter.component.scss'
})
export class BooleanTypeFilterComponent implements OnInit {
  @Input() object: BooleanType;
  @Input() filterComponent: Array<any>;

  @ViewChild(UnitCheckboxComponent) unitCheckboxComponent: UnitCheckboxComponent;

  filter: FilterComponent = new FilterComponent();
  result: BooleanType;

  content: boolean;

  ngOnInit() {
    this.result = this.object;
  }

  onElementChange(value: string[]) {
    this.result.content = value['checked'] as boolean;
    this.handleFilter();
  }

  handleFilter() {
    let item = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key);
    if (item == undefined) {
      this.filterComponent.push(this.result);
    }
    else {
      this.filterComponent[this.filterComponent.indexOf(item)] = this.result;
    }
  }
}
