import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { PlanFormComponent } from '../plan-form/plan-form.component';

@Component({
  selector: 'app-create-itinerary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PlanFormComponent
  ],
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.scss']
})
export class CreateItineraryComponent {
  @ViewChild('metadataTable', { static: false }) metadataTable: any;
  @ViewChild('addMetadataButton', { static: false }) addMetadataButton: any;

  isLinear = false;
  metadata: Array<{ key: string, value: string }> = [];

  objForm: FormGroup;

  displayedColumns: string[] = ['chave', 'valor'];

  newItinerary: Array<{ key: string, value: string }> = [];

  metadataForm: FormGroup = new FormGroup({
    chave: new FormControl(''),
    valor: new FormControl('')
  },);

  addMetadata(): void {
    if (this.metadataForm.valid) {
      this.metadata.push({
        key: this.metadataForm.value.chave,
        value: this.metadataForm.value.valor
      });
      this.metadataForm.reset();
      if (this.metadataTable) {
        this.metadataTable.renderRows();
      }
    }
  }

  submit(): void {
    for (const key in this.objForm.controls) {
      if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
        if (typeof this.objForm.get(key).value != 'string') {
          var strContent = JSON.stringify(this.objForm.get(key).value);
          this.newItinerary.push({ key: key, value: strContent });
        } else {
          this.newItinerary.push({ key: key, value: this.objForm.get(key).value });
        }
      }
    }
  }

}
