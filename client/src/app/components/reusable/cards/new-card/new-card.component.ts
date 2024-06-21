import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { CardsComponent } from '../cards.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ObjectsService } from 'src/app/features/create/objects/objects.service';
import { Objects } from 'src/app/features/create/objects/objects.model';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedFormService } from 'src/app/shared/services/shared-form.service';

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
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class NewCardComponent implements AfterViewInit, OnDestroy {
  form: FormGroup = new FormGroup({});

  editor: Editor;
  editorContent: Subscription;
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

  constructor(private fb: FormBuilder, private _formService: SharedFormService, private _objectsService: ObjectsService) {
    this.form = this.fb.group({
      avatarSrc: [''],
      headerImageSrc: [''],
      title: [''],
      subtitle: [''],
      content: new FormControl({ value: null, disabled: false }, Validators.required()),
      actionTitle: [''],
      actionLink: [''],
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();

    this._formService.updateForm(this.form);
    this.form.valueChanges.subscribe(() => {
      this._formService.updateForm(this.form);
      this._formService.checkFormFilled(this.form);
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
}
