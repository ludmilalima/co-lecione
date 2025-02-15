import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { Itineraries } from "../../create/itineraries/itineraries.model";
import { Objects } from "../../create/objects/objects.model";

@Component({
  selector: "app-consume-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,

    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: "./consume-dialog.component.html",
  styleUrl: "./consume-dialog.component.scss",
})
export class ConsumeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConsumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  getObjectContent(id: string): any {
    let objContent: Objects;
    objContent = this.data.objects.find((obj) => obj._id === id);

    if (objContent != undefined) {
      return objContent.content;
    }
  }

  getObjectType(id: string): string {
    console.log(id);
    let item = this.data.objects.find((obj) => obj._id === id);
    if (item != undefined) {
      return item.type;
    }
    return "undefined";
  }

  defineItem(id: string): string {
    let item = this.data.objects.find((obj) => obj._id === id);
    if (item != undefined) {
      switch (item.type) {
        case "card":
          return "description";
        case "question":
          return "quiz";
        case "itinerary":
          return "route";
      }
    }
    return "warning";
  }
}
