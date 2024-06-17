import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { Editor, Toolbar } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { NewQuestionComponent } from 'src/app/components/reusable/question/new-question/new-question.component';
import { Objects } from '../objects.model';
import { ObjectsService } from '../objects.service';
import { SharedFormService } from 'src/app/shared/services/shared-form.service';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { Question } from 'src/app/components/reusable/question/question.model';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NewQuestionComponent,
    QuestionComponent
  ]
})

export class CreateObjectComponent {
  @ViewChild('metadataTable', { static: false }) metadataTable: any;
  @ViewChild('addMetadataButton', { static: false }) addMetadataButton: any;

  @Input() objectType: string;

  editor: Editor;
  editorContent: Subscription;

  displayedColumns: string[] = ['chave', 'valor'];

  newObject: Array<{ key: string, value: string }> = [];
  metadata: Array<{ key: string, value: string }> = [];
  isLinear = false;

  // toolbar: Toolbar = [
  //   ['bold', 'italic'],
  //   ['underline', 'strike'],
  //   ['code', 'blockquote'],
  //   ['ordered_list', 'bullet_list'],
  //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //   ['link', 'image'],
  //   ['text_color', 'background_color'],
  //   ['align_left', 'align_center', 'align_right', 'align_justify'],
  // ];

  objForm: FormGroup;
  question: Question;

  metadataForm: FormGroup = new FormGroup({
    chave: new FormControl(''),
    valor: new FormControl('')
  },);

  constructor(
    private _objectsService: ObjectsService,
    private _formService: SharedFormService,
  ) {
    this.editor = new Editor();
    this.metadataTable = new MatTableModule();
    console.log(this.objectType);
  }

  ngOnInit(): void {
    this._formService.currentForm.subscribe(form => {
      this.objForm = form;
    });

    addEventListener('change', () => {
      if (this.metadataForm.valid) {
        this.addMetadataButton.disabled = false;
      } else {
        this.addMetadataButton.disabled = true;
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.editorContent) {
      this.editorContent.unsubscribe();
    }
  }

  addMetadata(): void {
    if (this.metadataForm.valid) {
      this.metadata.push({
        key: this.metadataForm.value.chave,
        value: this.metadataForm.value.valor
      });
      this.metadataForm.reset();
      if (this.metadataTable) {
        this.metadataTable.renderRows();
      }
    }
  }

  submit(): void {
    this.question = {
      'topic': this.objForm.value.topic,
      'note': this.objForm.value.note,
      'figureSrc': this.objForm.value.figureSrc,
      'statement': this.objForm.value.statement,
      'alternatives': this.objForm.value.alternatives,
      'selectedAlternatives': this.objForm.value.selectedAlternatives,
      'discursive': this.objForm.value.discursive,
    };

    for (const key in this.objForm.controls) {
      if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
        if (key === 'content' || key === 'statement') {
          var strContent = JSON.stringify(this.objForm.get(key).value);
          this.newObject.push({ key: key, value: strContent });
        } else {
          var strContent = JSON.stringify(this.objForm.get(key).value);
          this.newObject.push({ key: key, value: strContent });
        }
      }
    }

    if (this.newObject.length > 0 && this.metadata.length > 0) {
      var obj = new Objects(
        this.objectType,
        this.newObject,
        this.metadata
      );
      console.log(obj);
      (this._objectsService.createObject(obj)).subscribe(response => {
        console.log(response);
      });
    }
  }
}
