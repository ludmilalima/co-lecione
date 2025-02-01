import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
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
    { text: "One", cols: 1, rows: 1, color: "lightpink" },
    { text: "Two", cols: 2, rows: 1, color: "#DDBDF1" },
    { text: "Three", cols: 1, rows: 5, color: "lightgreen" },
    { text: "Four", cols: 3, rows: 4, color: "lightblue" },
  ];
}
