import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsoLanguageCodeEnum, LangStringType, NodeInfo, VocabularyType } from 'src/app/core/models/metadata/util.model';
import { UnitSelectComponent } from '../unit-select/unit-select.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { MatButtonModule } from '@angular/material/button';
import { FilterComponent } from '../filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

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

  filter: FilterComponent = new FilterComponent();
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

    this.result = JSON.parse(JSON.stringify(this.object));;

    this.retrieveData();
  }

  retrieveData() {
    let oldData = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key)?.langString;
    if (oldData != undefined) {
      this.result.langString = [...oldData];
      this.dataSource.data = [...oldData];
    }
  }
  onLanguageChange(value: any) {
    console.log(value);
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
    console.log(this.result.langString);
  }

  removeLangString(index: number) {
    this.result.langString.splice(index, 1);
    this.handleContentChange();
  }

  handleContentChange() {
    this.dataSource.data = [...this.result.langString];
    this.updateOptionList();
    this.handleFilter();

    console.log(this.dataSource.data);
  }

  updateOptionList() {
    this.object.nodeInfo.optionsList =
      this.object.nodeInfo.optionsList.filter(item => !this.result.langString.map(x => x.language).includes(item as IsoLanguageCodeEnum));
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
