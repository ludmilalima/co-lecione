import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedFormService } from 'src/app/shared/services/shared-form.service';
import { Editor, NgxEditorComponent, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
})
export class NewQuestionComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});

  editor: Editor;
  editorQ: Subscription;
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

  constructor(private fb: FormBuilder, private _formService: SharedFormService) {
    this.form = this.fb.group({
      topic: [''],
      note: [''],
      figureSrc: [''],
      statement: new FormControl({ value: null, disabled: false }, Validators.required()),
      alternatives: this.fb.array([]),
      discursive: false
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

  ngOnDestroy(): void {
    if (this.editorQ) {
      this.editorQ.unsubscribe();
    }
    this.editor.destroy();
  }

  get alternatives() {
    return this.form.get('alternatives') as FormArray;
  }

  addAlternative(alternative: string) {
    if (alternative) {
      this.alternatives.push(this.fb.control(alternative));
    }
  }
}
