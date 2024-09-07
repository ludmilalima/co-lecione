import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ProcessStringService } from '../process-string.service';

@Component({
  selector: 'app-unit-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './unit-checkbox.component.html',
  styleUrls: ['./unit-checkbox.component.scss']
})
export class UnitCheckboxComponent implements OnInit {
  @Input() object: any;
  @Output() valueChange = new EventEmitter<string[]>();

  content: boolean = false;

  constructor(public _processStringService: ProcessStringService) { }

  ngOnInit() {
    this.content = this.object.content as boolean;
  }

  onCheckboxChange(event: any) {
    this.valueChange.emit(event);
  }
}