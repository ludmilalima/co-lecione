import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VocabularyType } from 'src/app/core/models/metadata/util.model';
import { CommonModule } from '@angular/common';
import { ProcessStringService } from '../process-string.service';

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
export class MultipleSelectComponent implements OnInit {
  @Input() object: any;
  @Input() filterComponent: Array<any>;
  @Output() valueChange = new EventEmitter<string[]>();

  constructor(public _processStringService: ProcessStringService) { }

  result: VocabularyType;

  ngOnInit() {
    this.result = JSON.parse(JSON.stringify(this.object));
    this.retrieveData();
  }

  onSelectionChange(event: any) {
    this.valueChange.emit(this.result.value);

    this.result.value = event as string[];
    if (this.result.nodeInfo.nodeType == 'multi-select') {
      this.handleFilter();
    }
  }

  reset() {
    this.result.value = [];
  }

  retrieveData() {
    let oldData = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key)?.value;
    if (oldData != undefined) {
      this.result.value = [...oldData];
    }
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