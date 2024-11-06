import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { NodeInfo } from "src/app/core/models/metadata/util.model";
import { SimpleTextInputComponent } from "../simple-text-input/simple-text-input.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";

@Component({
  selector: "app-custom-type-filter",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    SimpleTextInputComponent,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: "./custom-type-filter.component.html",
  styleUrl: "./custom-type-filter.component.scss",
})
export class CustomTypeFilterComponent implements OnInit, OnChanges {
  @Input() filterComponent: Array<any>;
  @Input() clearFilters: boolean;

  @ViewChild("keySimpleTextInputComponent", { read: SimpleTextInputComponent })
  keySimpleTextInputComponent: SimpleTextInputComponent;
  @ViewChild("valueSimpleTextInputComponent", {
    read: SimpleTextInputComponent,
  })
  valueSimpleTextInputComponent: SimpleTextInputComponent;

  constructor(private _notificationsService: NotificationsService) {}

  keyObj: CustomType = new CustomType();
  valueObj: CustomType = new CustomType();

  key: string | null = null;
  value: string | null = null;

  displayedColumns: string[] = ["key", "value", "actions"];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.keyObj.nodeInfo.key = "Chave";
    this.valueObj.nodeInfo.key = "Valor";
    this.keyObj.nodeInfo.description = "Insert the key of the pair.";
    this.valueObj.nodeInfo.description = "Insert the value of the pair.";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["clearFilters"] && changes["clearFilters"].currentValue) {
      this.clearFilter();
    }
  }

  onKeyChange(value: string) {
    this.key = value;
  }

  onValueChange(value: string) {
    this.value = value;
  }

  addFilterPair() {
    if (this.key && this.value) {
      let result = new CustomType();
      result.nodeInfo.key = this.key;
      result.value = this.value;

      //this.dataSource.data = [...this.dataSource.data, { key: this.key, value: this.value }];

      let item = this.filterComponent.find(
        (item) => item.nodeInfo.key === result.nodeInfo.key
      );
      if (item == undefined) {
        this.filterComponent.push(result);
      } else {
        this.filterComponent[this.filterComponent.indexOf(item)] = result;
      }

      this.clearInput();
    } else {
      this._notificationsService.error(
        "Erro!",
        "A chave e o valor são obrigatórios.",
        5000
      );
    }
  }

  clearInput() {
    this.keySimpleTextInputComponent.reset();
    this.valueSimpleTextInputComponent.reset();
    this.onKeyChange(null);
    this.onValueChange(null);
    this.keyObj.value = null;
    this.valueObj.value = null;
  }

  // removeFilterPair(index: number) {
  //   let obj = this.dataSource.data[index];

  //   this.dataSource.data = this.dataSource.data.filter((_, i) => i !== index);

  //   let item = this.filterComponent.find(item => item.nodeInfo.key === obj.key);
  //   this.filterComponent.splice(this.filterComponent.indexOf(item), 1);
  // };

  clearFilter() {
    this.dataSource.data = [];
    this.clearInput();
  }
}

class CustomType {
  nodeInfo: NodeInfo;
  value: string;

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      20,
      "A string of characters.",
      "custom-type"
    );
  }
}
