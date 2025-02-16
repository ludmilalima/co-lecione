import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";

@Component({
  selector: "app-fullscreen-view",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    QuestionComponent,
    CardsComponent,

    MatDialogModule,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: "./fullscreen-view.component.html",
  styleUrl: "./fullscreen-view.component.scss",
})
export class FullscreenViewComponent {
  constructor(
    public dialogRef: MatDialogRef<FullscreenViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  defineItem(objectType: string): string {
    if (objectType != undefined) {
      switch (objectType) {
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
