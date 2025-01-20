import { CommonModule } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-metadata-table",
  standalone: true,
  imports: [
    CommonModule,

    MatTableModule,
    MatDialogModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: "./metadata-table.component.html",
  styleUrl: "./metadata-table.component.scss",
})
export class MetadataTableComponent implements OnInit {
  metadata: Array<{ key: string; value: any }> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["chave", "valor"];

  ngOnInit(): void {
    this.metadata = this.data.metadata;
    this.dataSource = new MatTableDataSource(this.metadata);
    console.log(this.metadata);
  }
}
