import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessStringService } from '../process-string.service';
import { LangStringTypeFilterComponent } from '../lang-string-type-filter/lang-string-type-filter.component';
import { CharacterStringTypeFilterComponent } from '../character-string-type-filter/character-string-type-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-generic-container',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    LangStringTypeFilterComponent,
    CharacterStringTypeFilterComponent,

    MatButtonModule,
    MatBadgeModule,
  ],
  templateUrl: './generic-container.component.html',
  styleUrl: './generic-container.component.scss'
})
export class GenericContainerComponent implements OnInit {
  @Input() object: any;
  @Input() filterComponent: Array<any>;

  @ViewChild('langStringFilter') langStringFilter: LangStringTypeFilterComponent;

  description: string;

  constructor(public _processStringService: ProcessStringService) {
  }

  index: number = 1;

  ngOnInit() {
    switch (this.object.nodeInfo.nodeType) {
      case "langString-type":
        this.description = "N possíveis entradas que podem ser traduzidas em até 10 idiomas diferentes";
        break;
      default:
        console.log(this.object.nodeInfo.type);
    }
  }

  handleIndex() {
    if (this.index < this.object.nodeInfo.maxOccurs) {
      this.index++;
      switch (this.object.nodeInfo.nodeType) {
        case "langString-type":
          this.langStringFilter.handleIndex();
          break;
        default:
          console.log(this.object.nodeInfo.type);
      }
    }
  }
}
