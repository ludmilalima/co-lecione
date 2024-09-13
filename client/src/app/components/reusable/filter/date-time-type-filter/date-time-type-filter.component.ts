import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { LangStringTypeFilterComponent } from '../lang-string-type-filter/lang-string-type-filter.component';
import { DateTimeType, LangStringType, NodeInfo } from 'src/app/core/models/metadata/util.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'app-date-time-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    SimpleTextInputComponent,
    LangStringTypeFilterComponent,
  ],
  templateUrl: './date-time-type-filter.component.html',
  styleUrl: './date-time-type-filter.component.scss'
})
export class DateTimeTypeFilterComponent implements OnInit {
  @Input() object: any;
  @Input() nodeInfo: NodeInfo;

  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  result: DateTimeType;

  ngOnInit() {
    this.result = JSON.parse(JSON.stringify(this.object));
  }

  onInputChange(value: string) {
    //this.result.dateTime = value;
  }

  onLanguageChange(value: LangStringType) {
    //this.result.description = value;
  }
}
