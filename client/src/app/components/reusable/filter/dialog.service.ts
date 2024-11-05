import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UnitSelectComponent } from "./unit-select/unit-select.component";
import { MultipleSelectComponent } from "./multiple-select/multiple-select.component";
import { CharacterStringTypeFilterComponent } from "./character-string-type-filter/character-string-type-filter.component";
import { BooleanTypeFilterComponent } from "./boolean-type-filter/boolean-type-filter.component";
import { GenericContainerComponent } from "./generic-container/generic-container.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(node: any, filters: Array<any>): void {
    const nodeType = node.object?.nodeInfo?.nodeType;
    const dialogConfig = {
      data: { object: node.object, filterComponent: filters },
      width: '80%'
    };
    switch (nodeType) {
      case "single-select":
        this.dialog.open(UnitSelectComponent, dialogConfig);
        break;
      case "multi-select":
        this.dialog.open(MultipleSelectComponent, dialogConfig);
        break;
      case "langString-type":
        this.dialog.open(GenericContainerComponent, dialogConfig);
        break;
      case "characterString-type":
        this.dialog.open(CharacterStringTypeFilterComponent, dialogConfig);
        break;
      case "boolean-type":
        this.dialog.open(BooleanTypeFilterComponent, dialogConfig);
        break;
      default:
        console.warn("Tipo desconhecido:", nodeType);
    }
  }
}
