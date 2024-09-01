import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UnitSelect } from '../../filter.model';

@Component({
  selector: 'app-unit-select',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
  ],
  templateUrl: './unit-select.component.html',
  styleUrl: './unit-select.component.scss'
})
export class UnitSelectComponent {
  @Input() unitSelect: UnitSelect;
}
