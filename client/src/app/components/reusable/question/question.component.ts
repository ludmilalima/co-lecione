import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxEditorModule,

    MatCardModule,
    MatButtonModule,
    MatRadioModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Editor],
})
export class QuestionComponent implements OnInit, OnChanges, OnDestroy {
  @Input() topic?: string;
  @Input() note?: string;
  @Input() figureSrc?: string;
  @Input() statement?: Object;
  @Input() alternatives?: string[];
  @Input() discursive?: boolean;

  toolbarAnswer: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  formQuestion = new FormGroup({
    editorQ: new FormControl(
      { value: null, disabled: true, },
      Validators.required()
    ),
  });

  formAnswer = new FormGroup({
    editorA: new FormControl(
      { value: null, disabled: false },
      Validators.required()
    ),
  });

  constructor(
    public _editorQuestion: Editor,
    public _editorAnswer: Editor
  ) {
    this._editorQuestion = new Editor();
    this._editorAnswer = new Editor();
  };

  ngOnInit(): void {
    this.formQuestion.get('editorQ').setValue(this.statement);
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statement']) {
      this.formQuestion.get('editorQ').setValue(changes['statement'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this._editorQuestion.destroy();
    this._editorAnswer.destroy();
  }
}