import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IsoLanguageCodeEnum, LangStringType, NodeInfo } from 'src/app/core/models/metadata/util.model';
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
  @Input() nodeInfo: NodeInfo;

  @ViewChild(UnitSelectComponent) unitSelectComponent: UnitSelectComponent;
  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  filter: FilterComponent = new FilterComponent();
  result: LangStringType;

  content: string;
  language: IsoLanguageCodeEnum;

  contentNode: NodeInfo = new NodeInfo();
  languageNode: NodeInfo = new NodeInfo();

  displayedColumns: string[] = ['content', 'language', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.contentNode = { ...this.nodeInfo };
    this.contentNode.description = 'Insert the content of the string.';

    this.languageNode = { ...this.nodeInfo };
    this.languageNode.key = 'Language';
    this.result = new LangStringType(this.nodeInfo.minOccurs, this.nodeInfo.maxOccurs);
    this.dataSource.data = this.result.langString;
  }

  addLangString() {
    this.result.langString.push({ content: this.content, language: this.language });
    this.dataSource.data = [...this.result.langString];
    this.unitSelectComponent.reset();
    this.simpleTextInputComponent.reset();
    this.nodeInfo.optionsList.splice(this.nodeInfo.optionsList.indexOf(this.language), 1);
  }

  removeLangString(index: number) {
    this.result.langString.splice(index, 1);
    this.dataSource.data = [...this.result.langString];
  }

  onLanguageChange(value: string) {
    this.language = value as IsoLanguageCodeEnum;
  }

  onContentChange(value: string) {
    this.content = value;
  }
}
