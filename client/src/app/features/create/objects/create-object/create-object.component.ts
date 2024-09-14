import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, KeyValueDiffers, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { NewQuestionComponent } from 'src/app/components/reusable/question/new-question/new-question.component';
import { Objects } from '../objects.model';
import { ObjectsService } from '../objects.service';
import { SharedFormService } from 'src/app/shared/services/shared-form.service';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { Question } from 'src/app/components/reusable/question/question.model';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { NewCardComponent } from 'src/app/components/reusable/cards/new-card/new-card.component';
import { MetadataFormComponent } from '../../../../components/reusable/metadata-form/metadata-form.component';
import { ProcessMetadataService } from 'src/app/components/reusable/filter/process-metadata.service';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    NewQuestionComponent,
    NewCardComponent,
    QuestionComponent,
    CardsComponent,
    MetadataFormComponent,

    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ]
})

export class CreateObjectComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('metadataTable', { static: false }) metadataTable: any;
  @ViewChild('addMetadataButton', { static: false }) addMetadataButton: any;

  @Input() objectType: string;
  @Output() objectTypeChange: EventEmitter<string> = new EventEmitter<string>();

  filters: Array<any> = [];
  private filtersDiffer: any;

  editor: Editor;
  editorContent: Subscription;

  touchedForm: boolean = false;

  displayedColumns: string[] = ['chave', 'valor'];

  newObject: Array<{ key: string, value: string }> = [];
  metadata: Array<{ key: string, value: string }> = [];
  isLinear = false;

  objForm: FormGroup;
  question: Question;

  constructor(
    private _objectsService: ObjectsService,
    private _formService: SharedFormService,
    private _processMetadataService: ProcessMetadataService,
    private differs: KeyValueDiffers
  ) {
    this.editor = new Editor();
    this.metadataTable = new MatTableModule();
    this.filtersDiffer = this.differs.find(this.filters).create();
  }

  ngOnInit(): void {
    this._formService.currentForm.subscribe(form => {
      this.objForm = form;
    });

    this._formService.formChanged.subscribe(isFilled => {
      if (isFilled) {
        if (!this.touchedForm) {
          this.touchedForm = true;
        }
      }
    });
  }

  ngDoCheck(): void {
    let filtersCopy = JSON.parse(JSON.stringify(this.filters));
    const filterChanges = this.filtersDiffer.diff(filtersCopy);
    if (filterChanges) {
      this.updateMetadata();
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.editorContent) {
      this.editorContent.unsubscribe();
    }
  }

  updateMetadata(): void {
    this.metadata = this._processMetadataService.buildFiltersList(this.filters);
  }

  submit(): void {
    for (const key in this.objForm.controls) {
      if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
        if (typeof this.objForm.get(key).value != 'string') {
          var strContent = JSON.stringify(this.objForm.get(key).value);
          this.newObject.push({ key: key, value: strContent });
        } else {
          this.newObject.push({ key: key, value: this.objForm.get(key).value });
        }
      }
    }

    if (this.newObject.length > 0 && this.metadata.length > 0) {
      var obj = new Objects(
        this.objectType,
        this.newObject,
        this.metadata
      );
      (this._objectsService.createObject(obj)).subscribe(response => {
      });
      this.objForm.reset();
      this.metadata = [];
      this.touchedForm = false;
    }
    this.newObject = [];
    this.objectTypeChange.emit(null);
  }
}
