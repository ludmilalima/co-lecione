import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { Tile } from './Tile';
import { Row } from './Row';

@Component({
  selector: 'cornell',
  templateUrl: './cornell.component.html',
  styleUrls: ['./cornell.component.scss'],
})
export class CornellComponent{

  public tiles: Tile[]= [];

  @Input() title: string;
  @Input() summary: string;
  @Input() set rowData(data: Row[]){
    this.setRowData(data);
  }

  // tiles: Tile[] = [
  //   {text: 'Tema', cols: 4, rows: 1, color: 'lightpink'},
  //   {text: 'Conceito-chave', cols: 1, rows: 1, color: 'lightblue'},
  //   {text: 'Notes', cols: 3, rows: 1, color: 'lightgreen'},
  //   {text: 'Síntese', cols: 4, rows: 2, color: '#DDBDF1'},
  // ];

  setRowData(data: Row[]){
    this.tiles.push({text: this.title, cols: 4, rows: 1, color: 'lightpink'});
    data.sort((a, b) => a.position - b.position).forEach(element => {
      this.tiles.push(
        {text: element.cue, cols: 1, rows: 1, color: 'lightblue'},
        {text: element.note, cols: 3, rows: 1, color: 'lightblue'}
      );
    });
    this.tiles.push({text: this.summary, cols: 4, rows: 2, color: '#DDBDF1'},)
  }
}
