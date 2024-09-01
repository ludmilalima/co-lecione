import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-simple-text-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './simple-text-input.component.html',
  styleUrl: './simple-text-input.component.scss'
})
export class SimpleTextInputComponent {
  @Input() simpleTextInput: SimpleTextInput;
  @Output() simpleTextInputChange: SimpleTextInput;
}
