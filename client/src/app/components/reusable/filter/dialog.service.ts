import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnitSelectComponent } from './unit-select/unit-select.component';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { LangStringTypeFilterComponent } from './lang-string-type-filter/lang-string-type-filter.component';
import { CharacterStringTypeFilterComponent } from './character-string-type-filter/character-string-type-filter.component';
import { BooleanTypeFilterComponent } from './boolean-type-filter/boolean-type-filter.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {
  }

  openDialog(node: any, filters: any): void {
    const nodeType = node.object?.nodeInfo?.nodeType;
    const dialogConfig = { data: { object: node.object, filterComponent: filters } };
    switch (nodeType) {
      case 'single-select':
        this.dialog.open(UnitSelectComponent, dialogConfig);
        break;
      case 'multi-select':
        this.dialog.open(MultipleSelectComponent, { data: node });
        break;
      case 'langString-type':
        this.dialog.open(LangStringTypeFilterComponent, { data: node });
        break;
      case 'characterString-type':
        this.dialog.open(CharacterStringTypeFilterComponent, { data: node });
        break;
      case 'boolean-type':
        this.dialog.open(BooleanTypeFilterComponent, { data: node });
        break;
      default:
        console.warn('Tipo desconhecido:', nodeType);
    }
  }
}
