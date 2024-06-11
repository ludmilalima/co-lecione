import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
})
export class NewQuestionComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      topic: [''],
      note: [''],
      figureSrc: [''],
      statement: [''],
      alternatives: this.fb.array([]),
      discursive: [false]
    });
  }

  get alternatives() {
    return this.questionForm.get('alternatives') as FormArray;
  }

  addAlternative(alternative: string) {
    if (alternative) {
      this.alternatives.push(this.fb.control(alternative));
    }
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }
}
