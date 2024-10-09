import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ObjectsSelectionComponent } from '../objects-selection/objects-selection.component';
import { MetadataFormComponent } from '../../../../components/reusable/metadata-form/metadata-form.component';
import { ProcessMetadataService } from 'src/app/components/reusable/filter/process-metadata.service';
import { Itineraries } from '../itineraries.model';
import { ItinerariesService } from '../itineraries.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-create-itinerary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    ObjectsSelectionComponent,
    MetadataFormComponent,


    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.scss']
})
export class CreateItineraryComponent {
  @ViewChild('objectsSelection') objectsSelection: ObjectsSelectionComponent;
  @ViewChild('metadataForm') metadataForm: MetadataFormComponent;

  newItinerary: Itineraries = new Itineraries([], []);

  // stepper variables
  isLinear = false;
  objForm: FormGroup;

  // object selection variables
  selectedObjects: Array<any> = [];
  metadata: Array<any> = [];

  constructor(
    private _processMetadataService: ProcessMetadataService,
    private _itinerariesService: ItinerariesService,
    private _notificationsService: NotificationsService
  ) { }

  submit(): void {
    let objMetadata: Array<{ key: string, value: string }> = [];
    this.newItinerary.content = this.selectedObjects.map((object, _) => {
      for (const [key, value] of Object.entries(object.metadata)) {
        objMetadata.push({ key: key, value: value as string });
      }
      return { position: object.position, objectId: object.id };
    });

    this.newItinerary.metadata = [...this._processMetadataService.buildFiltersList(this.metadata)];

    const observer = {
      next: (response: any) => {
        this._notificationsService.success('Sucesso!', 'Itinerário criado com sucesso.');
      },
      error: (error: any) => {
        this._notificationsService.error('Erro!', 'Erro ao criar itinerário.');
      },
      complete: () => {
        this.selectedObjects = [];
        this.metadata = [];
        this.objectsSelection.clearFilters();
        this.metadataForm.clearFilters();
      }
    };

    if (this.checkMandatoryItinerary() && this.checkMandatoryMetadata()) {
      this._itinerariesService.createItinerary(this.newItinerary).subscribe(observer);
    }
  }

  checkMandatoryMetadata(): boolean {
    let title = this.newItinerary.metadata.find((metadata) => metadata.key === 'general.title');
    let description = this.newItinerary.metadata.find((metadata) => metadata.key === 'general.description');

    if (!title || !description) {
      this._notificationsService.error('Erro!', 'Os metadados padronizados \'Geral > Título e Descrição\' são obrigatórios.');
    }

    return !!title && !!description;
  }

  checkMandatoryItinerary(): boolean {
    if (this.newItinerary.content.length < 2) {
      this._notificationsService.error('Erro!', 'Ao menos dois objetos devem compor um itinerário.');
      return false;
    }
    return true;
  }

  isValid(): boolean {
    return (this.metadata.length > 0) && (this.selectedObjects.length > 0);
  }
}
