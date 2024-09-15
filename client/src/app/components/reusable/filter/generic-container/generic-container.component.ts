import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProcessStringService } from '../process-string.service';
import { LangStringTypeFilterComponent } from '../lang-string-type-filter/lang-string-type-filter.component';
import { CharacterStringTypeFilterComponent } from '../character-string-type-filter/character-string-type-filter.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generic-container',
  standalone: true,
  imports: [
    CommonModule,

    LangStringTypeFilterComponent,
    CharacterStringTypeFilterComponent,

    MatButtonModule,
  ],
  templateUrl: './generic-container.component.html',
  styleUrl: './generic-container.component.scss'
})
export class GenericContainerComponent implements OnInit {
  @Input() object: any;
  @Input() filterComponent: Array<any>;

  @ViewChild('langStringFilter') langStringFilter: LangStringTypeFilterComponent;
  @ViewChild('characterStringFilter') characterStringFilter: CharacterStringTypeFilterComponent;

  localObject: any;
  localFilterComponent: Array<any>;

  description: string;

  constructor(public _processStringService: ProcessStringService) {
  }

  index: number = 1;

  ngOnInit() {
    this.localObject = JSON.parse(JSON.stringify(this.object));
    this.localFilterComponent = JSON.parse(JSON.stringify(this.filterComponent));

    switch (this.object.nodeInfo.nodeType) {
      case "langString-type":
        this.description = "N entradas que podem ser traduzidas em até 10 idiomas diferentes";
        break;
      case "characterString-type":
        this.description = "Insert the content of the string.";
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
        case "characterString-type":
          // this.characterStringTypeFilterComponent.handleIndex();
          break;
        default:
          console.log(this.object.nodeInfo.type);
      }
    }
  }
}
