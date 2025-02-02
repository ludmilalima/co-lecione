import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: "app-welcome",
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: "./welcome.component.html",
  styleUrl: "./welcome.component.scss",
})
export class WelcomeComponent {
  tiles: Tile[] = [
    { cols: 1, rows: 1, color: "lightpink" },
    { cols: 3, rows: 1, color: "#DDBDF1" },
    { cols: 4, rows: 4, color: "lightblue" },
  ];
}
