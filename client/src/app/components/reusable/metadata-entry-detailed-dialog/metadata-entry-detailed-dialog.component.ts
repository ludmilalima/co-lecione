import { CommonModule } from "@angular/common";
import { Component, Inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MetadataEntrySchema } from "src/app/core/models/metadata/util.model";

@Component({
  selector: "app-metadata-entry-detailed-dialog",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule],
  templateUrl: "./metadata-entry-detailed-dialog.component.html",
  styleUrl: "./metadata-entry-detailed-dialog.component.scss",
})
export class MetadataEntryDetailedDialogComponent {
  @Input() metadataEntrySchema: MetadataEntrySchema;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.metadataEntrySchema = data.metadataEntrySchema;
    console.log(data);
  }
}
