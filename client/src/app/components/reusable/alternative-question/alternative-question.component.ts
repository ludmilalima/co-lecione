import { AfterViewInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { HTML } from 'ngx-editor/lib/trustedTypesUtil';

@Component({
  selector: 'alternative-question',
  templateUrl: './alternative-question.component.html',
  styleUrls: ['./alternative-question.component.scss']
})
export class AlternativeQuestionComponent implements AfterViewInit {
  @Input() topic?: string;
  @Input() note?: string;
  @Input() figureSrc?: string;
  @Input() statement?: string;
  @Input() alternatives?: string[];
  @Input() discursive?: boolean;

  editorQuestion: Editor;
  editorAnswer: Editor;

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
      { value: '', disabled: true, },
      Validators.required()
    ),
  });

  formAnswer = new FormGroup({
    editorA: new FormControl(
      { value: '', disabled: false },
      Validators.required()
    ),
  });

  constructor() {
  };

  ngOnInit(): void {
    this.editorQuestion = new Editor();
    this.editorAnswer = new Editor();
  };

  ngAfterViewInit(): void {
    this.editorQuestion.setContent(this.statement);
  }

  ngOnDestroy(): void {
    this.editorQuestion.destroy();
    this.editorAnswer.destroy();
  }

}
