import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
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
import { ObjectsService } from 'src/app/shared/services/objects.service';
import { Objects } from '../objects/objects.model';

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
  ]
})

export class CreateObjectComponent {
  @ViewChild('metadataTable', { static: false }) metadataTable: any;
  @ViewChild('addMetadataButton', { static: false }) addMetadataButton: any;

  editor: Editor;
  editorContent: Subscription;

  displayedColumns: string[] = ['chave', 'valor'];

  card: Array<{ key: string, value: string }> = [];
  metadata: Array<{ key: string, value: string }> = [];
  isLinear = false;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  objForm: FormGroup = new FormGroup({});

  metadataForm: FormGroup = new FormGroup({
    chave: new FormControl(''),
    valor: new FormControl('')
  },);

  constructor(private _objectsService: ObjectsService) {
    this.editor = new Editor();
    this.metadataTable = new MatTableModule();
  }

  ngOnInit(): void {
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

  onFormSubmit(form: FormGroup) {
    this.objForm = form.value;
    console.log(this.objForm);
  }

  async submit(): Promise<void> {
    for (const key in this.objForm.controls) {
      if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
        if (key === 'content') {
          var strContent = JSON.stringify(this.objForm.get(key).value);
          this.card.push({ key: key, value: strContent });
        } else {
          this.card.push({ key: key, value: this.objForm.get(key).value });
        }
      }
    }

    if (this.card.length > 0 && this.metadata.length > 0) {
      var obj = new Objects(
        'card',
        this.card,
        this.metadata
      );
      (await this._objectsService.createObject(obj)).subscribe(response => {
      });
    }
  }
}
