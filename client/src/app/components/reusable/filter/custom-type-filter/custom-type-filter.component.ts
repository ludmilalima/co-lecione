import { Component, EventEmitter, Input, SimpleChanges, ViewChild } from '@angular/core';
import { NodeInfo } from 'src/app/core/models/metadata/util.model';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    SimpleTextInputComponent,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './custom-type-filter.component.html',
  styleUrl: './custom-type-filter.component.scss'
})
export class CustomTypeFilterComponent {
  @Input() filterComponent: Array<any>;
  @Input() clearFilters: boolean;

  @ViewChild('keySimpleTextInputComponent', { read: SimpleTextInputComponent }) keySimpleTextInputComponent: SimpleTextInputComponent;
  @ViewChild('valueSimpleTextInputComponent', { read: SimpleTextInputComponent }) valueSimpleTextInputComponent: SimpleTextInputComponent;

  keyObj: CustomType = new CustomType();
  valueObj: CustomType = new CustomType();

  key: string;
  value: string;

  displayedColumns: string[] = ['key', 'value', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.keyObj.nodeInfo.key = 'key';
    this.valueObj.nodeInfo.key = 'value';
    this.keyObj.nodeInfo.description = 'Insert the key of the pair.';
    this.valueObj.nodeInfo.description = 'Insert the value of the pair.';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearFilters'] && changes['clearFilters'].currentValue) {
      this.clearFilter();
    }
  }

  onKeyChange(value: string) {
    this.key = value;
  };

  onValueChange(value: string) {
    this.value = value;
  };

  addFilterPair() {
    let result = new CustomType();
    result.nodeInfo.key = this.key;
    result.value = this.value;

    this.dataSource.data = [...this.dataSource.data, { key: this.key, value: this.value }];

    let item = this.filterComponent.find(item => item.nodeInfo.key === result.nodeInfo.key);
    if (item == undefined) {
      this.filterComponent.push(result);
    }
    else {
      this.filterComponent[this.filterComponent.indexOf(item)] = result;
    }

    this.keySimpleTextInputComponent.reset();
    this.valueSimpleTextInputComponent.reset();
  };

  removeFilterPair(index: number) {
    let obj = this.dataSource.data[index];

    this.dataSource.data = this.dataSource.data.filter((_, i) => i !== index);

    let item = this.filterComponent.find(item => item.nodeInfo.key === obj.key);
    this.filterComponent.splice(this.filterComponent.indexOf(item), 1);
  };

  clearFilter() {
    this.dataSource.data = [];
  }

}

class CustomType {
  nodeInfo: NodeInfo;
  value: string;

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      20,
      'A string of characters.',
      'custom-type'
    );
  }
}