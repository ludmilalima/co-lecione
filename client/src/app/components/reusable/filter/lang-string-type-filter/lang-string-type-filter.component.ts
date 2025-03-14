import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsoLanguageCodeEnum, LangStringType, VocabularyType } from 'src/app/core/models/metadata/util.model';
import { UnitSelectComponent } from '../unit-select/unit-select.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ProcessStringService } from '../process-string.service';

@Component({
  selector: 'app-lang-string-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    UnitSelectComponent,
    SimpleTextInputComponent,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './lang-string-type-filter.component.html',
  styleUrl: './lang-string-type-filter.component.scss',
})
export class LangStringTypeFilterComponent implements OnInit {
  @Input() object: any;
  @Input() filterComponent: Array<any>;

  @ViewChild(UnitSelectComponent) unitSelectComponent: UnitSelectComponent;
  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  constructor(public _processStringService: ProcessStringService) { }

  result: LangStringType;

  content: string;
  language: IsoLanguageCodeEnum;

  contentObj: LangStringType;
  languageObj: VocabularyType;

  displayedColumns: string[] = ['content', 'language', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.contentObj = JSON.parse(JSON.stringify(this.object));
    this.contentObj.nodeInfo.description = 'Insert the content of the string.';

    this.languageObj = JSON.parse(JSON.stringify(this.object));
    this.languageObj.nodeInfo.key = 'Language';

    this.result = JSON.parse(JSON.stringify(this.object));

    this.retrieveData();
  }

  retrieveData() {
    let oldData = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key)?.langString;
    if (oldData != undefined) {
      this.result.langString = [...oldData];
      this.dataSource.data = [...oldData];
    }
    this.updateOptionList();
  }

  onLanguageChange(value: any) {
    this.language = value as IsoLanguageCodeEnum;
  }

  onContentChange(value: string) {
    this.content = value;
  }

  addLangString() {
    this.result.langString.push({ content: this.content, language: this.language });
    this.unitSelectComponent.reset();
    this.simpleTextInputComponent.reset();
    this.handleContentChange();
  }

  removeLangString(index: number) {
    let item = this.dataSource.data[index];
    this.dataSource.data.splice(index, 1);
    if (this.result.langString.includes(item)) {
      this.result.langString.splice(this.result.langString.indexOf(item), 1);
    }
    this.handleContentChange();
  }

  handleContentChange() {
    let content = this.result.langString
      .filter(item => !this.dataSource.data
        .some(dataItem => dataItem.content === item.content && dataItem.language === item.language));
    this.dataSource.data = [...this.dataSource.data, ...content];
    this.updateOptionList();
    this.handleFilter();
  }

  updateOptionList() {
    this.languageObj.nodeInfo.optionsList =
      this.object.nodeInfo.optionsList.filter(item => !this.result.langString.map(x => x.language).includes(item as IsoLanguageCodeEnum));
  }

  handleFilter() {
    let objectsFound = this.filterComponent.filter(item => item.nodeInfo.key === this.object.nodeInfo.key);
    if (objectsFound.length === 0) {
      this.filterComponent.push(this.result);
    }
  }

  handleIndex() {
    this.filterComponent.push(JSON.parse(JSON.stringify(this.result)));
    this.result.langString = [];
    this.updateOptionList();
  }
}
