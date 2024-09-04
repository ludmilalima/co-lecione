import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LangStringTypeFilterComponent } from 'src/app/components/reusable/filter/lang-string-type-filter/lang-string-type-filter.component';
import { IsoLanguageCodeEnum, NodeInfo } from 'src/app/core/models/metadata/util.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    LangStringTypeFilterComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  nodeInfo: NodeInfo = new NodeInfo();

  constructor() {
    this.nodeInfo.key = 'title';
    this.nodeInfo.minOccurs = 1;
    this.nodeInfo.maxOccurs = 5;
    this.nodeInfo.description = 'A title of a book.';
    this.nodeInfo.nodeType = 'langString-type';
    this.nodeInfo.optionsList = Object.values(IsoLanguageCodeEnum);
  }
}
