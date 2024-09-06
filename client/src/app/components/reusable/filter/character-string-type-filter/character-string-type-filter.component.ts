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
  @Input() object: CharacterStringType;
  @Input() filterComponent: Array<any>;

  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  filter: FilterComponent = new FilterComponent();
  result: CharacterStringType;

  content: string;

  displayedColumns: string[] = ['content', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.result = this.object;
  }

  onContentChange(value: string) {
    this.content = value;
  }

  addCharacterString() {
    this.result.content.push(this.content);
    this.simpleTextInputComponent.reset();
    this.handleContentChange();
  }

  removeCharacterString(index: number) {
    this.result.content.splice(index, 1);
    this.handleContentChange();
  }

  handleContentChange() {
    this.dataSource.data = [...this.result.content];
    this.handleFilter();
  }

  handleFilter() {
    let item = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key);
    if (item == undefined) {
      this.filterComponent.push(this.result);
    }
    else {
      this.filterComponent[this.filterComponent.indexOf(item)] = this.result;
    }
  }
}
