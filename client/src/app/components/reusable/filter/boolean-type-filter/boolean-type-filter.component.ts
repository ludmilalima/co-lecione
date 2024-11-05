import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { UnitCheckboxComponent } from "../unit-checkbox/unit-checkbox.component";
import { NodeInfo, BooleanType } from "src/app/core/models/metadata/util.model";
import { FilterComponent } from "../filter.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-boolean-type-filter",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    UnitCheckboxComponent,

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: "./boolean-type-filter.component.html",
  styleUrl: "./boolean-type-filter.component.scss",
})
export class BooleanTypeFilterComponent implements OnInit {
  @Input() object: BooleanType;
  @Input() filterComponent: Array<any>;

  result: BooleanType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.object = this.data.object;
    this.filterComponent = this.data.filterComponent;
    this.result = JSON.parse(JSON.stringify(this.object));
    this.retrieveData();
  }

  onElementChange(value: string[]) {
    this.result.content = value["checked"] as boolean;
    this.handleFilter();
  }

  retrieveData() {
    let oldData = this.filterComponent.find(
      (item) => item.nodeInfo.key === this.object.nodeInfo.key
    )?.content as boolean;
    if (oldData != undefined) {
      this.object.content = oldData;
      this.result.content = oldData;
    }
  }

  handleFilter() {
    let item = this.filterComponent.find(
      (item) => item.nodeInfo.key === this.object.nodeInfo.key
    );
    if (item == undefined) {
      this.filterComponent.push(this.result);
    } else {
      this.filterComponent[this.filterComponent.indexOf(item)] = this.result;
    }
  }
}
