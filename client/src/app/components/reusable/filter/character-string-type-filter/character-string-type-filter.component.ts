import { Component, Input, ViewChild } from '@angular/core';
import { CharacterStringType, NodeInfo } from 'src/app/core/models/metadata/util.model';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from '../filter.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-character-string-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    SimpleTextInputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './character-string-type-filter.component.html',
  styleUrl: './character-string-type-filter.component.scss'
})
export class CharacterStringTypeFilterComponent {
  @Input() nodeInfo: NodeInfo;

  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  filter: FilterComponent = new FilterComponent();
  result: CharacterStringType;

  content: string;

  displayedColumns: string[] = ['content', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.result = new CharacterStringType(this.nodeInfo.minOccurs, this.nodeInfo.maxOccurs);
    this.dataSource.data = this.result.content;
  }

  addCharacterString() {
    this.result.content.push(this.content);
    this.dataSource.data = [...this.result.content];
    this.simpleTextInputComponent.reset();
  }

  removeCharacterString(index: number) {
    this.result.content.splice(index, 1);
    this.dataSource.data = [...this.result.content];
  }

  onContentChange(value: string) {
    this.content = value;
  }
}
