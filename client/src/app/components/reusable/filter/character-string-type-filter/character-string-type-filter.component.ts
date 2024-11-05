import { Component, Inject, Input, ViewChild } from '@angular/core';
import { CharacterStringType, NodeInfo } from 'src/app/core/models/metadata/util.model';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProcessStringService } from '../process-string.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

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
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './character-string-type-filter.component.html',
  styleUrl: './character-string-type-filter.component.scss'
})
export class CharacterStringTypeFilterComponent {
  @Input() object: CharacterStringType;
  @Input() filterComponent: Array<any>;

  @ViewChild(SimpleTextInputComponent) simpleTextInputComponent: SimpleTextInputComponent;

  constructor(
    public _processStringService: ProcessStringService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  result: CharacterStringType;

  content: string;

  displayedColumns: string[] = ['content', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit() {
    this.object = this.data.object;
    this.filterComponent = this.data.filterComponent;

    this.result = JSON.parse(JSON.stringify(this.object));
    this.retrieveData();
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

  retrieveData() {
    let oldData = this.filterComponent.find(item => item.nodeInfo.key === this.object.nodeInfo.key)?.content;
    if (oldData != undefined) {
      this.result.content = [...oldData];
      this.dataSource.data = [...oldData];
    }
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
