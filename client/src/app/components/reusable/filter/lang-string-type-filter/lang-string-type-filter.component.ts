import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LangStringType } from 'src/app/core/models/metadata/util.model';

@Component({
  selector: 'app-lang-string-type-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './lang-string-type-filter.component.html',
  styleUrl: './lang-string-type-filter.component.scss'
})
export class LangStringTypeFilterComponent {
  @Input() langStringType: LangStringType;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      langString: this.fb.array([], [Validators.minLength(this.langStringType.nodeInfo.minOccurs), Validators.maxLength(this.langStringType.nodeInfo.maxOccurs)])
    });
  }

  get langString(): FormArray {
    return this.form.get('langString') as FormArray;
  }

  addLangString() {
    if (this.langString.length < this.langStringType.nodeInfo.maxOccurs) {
      this.langString.push(this.fb.group({
        content: ['', Validators.required],
        language: ['', Validators.required]
      }));
    }
  }

  removeLangString(index: number) {
    if (this.langString.length > this.langStringType.nodeInfo.minOccurs) {
      this.langString.removeAt(index);
    }
  }
}
