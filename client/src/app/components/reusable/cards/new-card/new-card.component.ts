import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { CardsComponent } from '../cards.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Objects } from 'src/app/pages/create/objects/objects.model';
import { ObjectsService } from 'src/app/pages/create/objects/objects.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CardsComponent,
    NgxEditorModule,
  ]
})
export class NewCardComponent implements AfterViewInit, OnDestroy {
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

  objForm = new FormGroup({
    avatarSrc: new FormControl(null),
    headerImageSrc: new FormControl(null),
    title: new FormControl(null),
    subtitle: new FormControl(null),
    content: new FormControl(
      { value: null, disabled: false },
      Validators.required(),
    ),
    actionTitle: new FormControl(null),
    actionLink: new FormControl(null),
  });

  metadataForm: FormGroup = new FormGroup({
    chave: new FormControl(''),
    valor: new FormControl('')
  },);

  constructor(private _objectsService: ObjectsService) {
    this.editor = new Editor();
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
      this.metadataTable.renderRows();
    }
  }

  async submit(): Promise<void> {
    for (const key in this.objForm.controls) {
      if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
        // Adiciona ao array 'card' um objeto com a chave e o valor do controle atual
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
