import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VocabularyType } from 'src/app/core/models/metadata/util.model';
import { ProcessStringService } from '../process-string.service';

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

  constructor(public _processStringService: ProcessStringService) { }

  result: VocabularyType;

  ngOnInit() {
    this.result = JSON.parse(JSON.stringify(this.object))

    if (this.object.nodeInfo.nodeType == 'single-select') {
      this.retrieveData();
    }
  }

  onSelectionChange(event: any) {
    this.result.value = event;
    this.valueChange.emit(this.result.value);

    if (this.result.nodeInfo.nodeType == 'single-select') {
      this.handleFilter();
    }
  }

  reset() {
    this.result.value = '';
  }

  retrieveData() {
    let oldData = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key)?.value;

    if (oldData != undefined) {
      this.result.value = oldData;
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