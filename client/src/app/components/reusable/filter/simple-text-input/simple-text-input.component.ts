import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProcessStringService } from '../process-string.service';

@Component({
  selector: 'app-simple-text-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './simple-text-input.component.html',
  styleUrl: './simple-text-input.component.scss'
})
export class SimpleTextInputComponent {
  @Input() object: any;
  @Output() valueChange = new EventEmitter<string>();

  constructor(public _processStringService: ProcessStringService) { }

  inputValue: string = '';

  onInputChange(event: any) {
    this.inputValue = event as string;
    this.valueChange.emit(this.inputValue);
  }

  isItRequired(minOccurs: number): boolean {
    return minOccurs > 0;
  }

  reset() {
    this.inputValue = '';
  }
}