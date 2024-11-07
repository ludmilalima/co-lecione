import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { ObjectsSelectionComponent } from "../objects-selection/objects-selection.component";
import { MetadataFormComponent } from "../../../../components/reusable/metadata-form/metadata-form.component";
import { ProcessMetadataService } from "src/app/components/reusable/filter/process-metadata.service";
import { Itineraries } from "../itineraries.model";
import { ItinerariesService } from "../itineraries.service";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { Obaa } from "src/app/core/models/metadata/obaa.model";
import { DialogService } from "src/app/components/reusable/filter/dialog.service";
import { MatChipsModule } from "@angular/material/chips";

@Component({
  selector: "app-create-itinerary",
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
  templateUrl: "./create-itinerary.component.html",
  styleUrls: ["./create-itinerary.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateItineraryComponent {
  @ViewChild("objectsSelection") objectsSelection: ObjectsSelectionComponent;
  @ViewChild("metadataForm") metadataForm: MetadataFormComponent;

  newItinerary: Itineraries = new Itineraries([], []);

  // stepper variables
  isLinear = false;
  objForm: FormGroup;

  // object selection variables
  selectedObjects: Array<any> = [];
  metadata: Array<any> = [];

  obaaModel = new Obaa();
  titleNode: any;
  descriptionNode: any;

  constructor(
    private _processMetadataService: ProcessMetadataService,
    private _itinerariesService: ItinerariesService,
    private _notificationsService: NotificationsService,
    private _dialogService: DialogService
  ) {
    this.titleNode = { object: this.obaaModel.general.title };
    this.descriptionNode = { object: this.obaaModel.general.description };
    this.titleNode.object.nodeInfo.key = "root.general.title";
    this.descriptionNode.object.nodeInfo.key = "root.general.description";
  }

  submit(): void {
    let objMetadata: Array<{ key: string; value: string }> = [];
    this.newItinerary.content = this.selectedObjects.map((object, _) => {
      for (const [key, value] of Object.entries(object.metadata)) {
        objMetadata.push({ key: key, value: value as string });
      }
      return { position: object.position, objectId: object.id };
    });

    this.newItinerary.metadata = [
      ...this._processMetadataService.buildFiltersList(this.metadata),
    ];

    const observer = {
      next: (response: any) => {
        this._notificationsService.success(
          "Sucesso!",
          "Itinerário criado com sucesso.",
          5000
        );
      },
      error: (error: any) => {
        this._notificationsService.error(
          "Erro!",
          "Erro ao criar itinerário.",
          5000
        );
      },
      complete: () => {
        this.selectedObjects = [];
        this.metadata = [];
        this.objectsSelection.clearFilters();
        this.metadataForm.clearFilters();
      },
    };

    if (this.checkMandatoryItinerary() && this.checkMandatoryMetadata()) {
      this._itinerariesService
        .createItinerary(this.newItinerary)
        .subscribe(observer);
    }
  }

  checkMandatoryMetadata(): boolean {
    let title = this.newItinerary.metadata.find(
      (metadata) => metadata.key === "general.title"
    );
    let description = this.newItinerary.metadata.find(
      (metadata) => metadata.key === "general.description"
    );

    if (!title || !description) {
      this._notificationsService.error(
        "Erro!",
        "Os metadados padronizados 'Geral > Título e Descrição' são obrigatórios.",
        5000
      );
    }

    return !!title && !!description;
  }

  checkMandatoryItinerary(): boolean {
    if (this.newItinerary.content.length < 2) {
      this._notificationsService.error(
        "Erro!",
        "Ao menos dois objetos devem compor um itinerário.",
        5000
      );
      return false;
    }
    return true;
  }

  isValid(): boolean {
    return this.metadata.length > 0 && this.selectedObjects.length > 0;
  }

  onLinkClick(node: any): void {
    this._dialogService.openDialog(node, this.metadata);
  }
}
