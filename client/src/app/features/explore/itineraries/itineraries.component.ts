import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from "@angular/material/expansion";
import { MetadataFormComponent } from "src/app/components/reusable/metadata-form/metadata-form.component";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { ItinerariesService } from "../../create/itineraries/itineraries.service";
import { Itineraries } from "../../create/itineraries/itineraries.model";
import { ObjectsService } from "../../create/objects/objects.service";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";
import { ConvertByTypeService } from "src/app/shared/services/convert-by-type.service";
import { Objects } from "../../create/objects/objects.model";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProcessMetadataService } from "src/app/components/reusable/filter/process-metadata.service";
import { environment } from "src/environments/environment";
import { MatDialog } from "@angular/material/dialog";
import { MetadataTableComponent } from "src/app/components/reusable/metadata-table/metadata-table.component";

@Component({
  selector: "app-itineraries",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,

    MetadataFormComponent,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: "./itineraries.component.html",
  styleUrl: "./itineraries.component.scss",
})
export class ItinerariesComponent implements OnInit {
  itineraries: Array<Itineraries> = [];
  metadata: Array<any> = [];
  loadedContent: Array<any> = [];

  buttonAction = { label: "Buscar", action: this.search.bind(this) };

  constructor(
    private _notificationsService: NotificationsService,
    private _itinerariesService: ItinerariesService,
    private _objectsService: ObjectsService,
    private _convertByType: ConvertByTypeService,
    private _processMetadataService: ProcessMetadataService,
    private changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._itinerariesService.getAllItineraries().subscribe((response) => {
      response.map((itinerary: Itineraries) => {
        let item: Itineraries = new Itineraries([], []);
        item._id = itinerary._id;
        item.metadata = itinerary.metadata.map((metadata) => {
          return {
            key: metadata.key,
            value: metadata.value,
          };
        });
        item.content = itinerary.content.map((content) => {
          return {
            position: content.position,
            objectId: content.objectId,
          };
        });
        this.itineraries.push(item);
      });
    });
  }

  handleClearFilters() {
    this.metadata = [];
    this.getAllItineraries();
  }

  getAllItineraries() {
    this.itineraries = [];
    this._itinerariesService.getAllItineraries().subscribe((response) => {
      response.map((itinerary: Itineraries) => {
        let item: Itineraries = new Itineraries([], []);
        item._id = itinerary._id;
        item.metadata = itinerary.metadata.map((metadata) => {
          return {
            key: metadata.key,
            value: metadata.value,
          };
        });
        item.content = itinerary.content.map((content) => {
          return {
            position: content.position,
            objectId: content.objectId,
          };
        });
        this.itineraries.push(item);
      });
    });
  }

  getMetadataValue(item: Itineraries, key: string): string {
    const meta = item.metadata.find((meta) => meta.key === key);
    return meta ? JSON.parse(meta.value).content : "";
  }

  getItineraryContent(item: Itineraries) {
    item.content.forEach((content) => {
      if (
        this.loadedContent.find((obj) => obj._id === content.objectId) ===
        undefined
      ) {
        this._objectsService
          .getObjectById(content.objectId.toString())
          .subscribe((response) => {
            this.loadedContent.push(this.convertContent(response));
          });
      }
    });
  }

  convertContent(object: any) {
    return {
      _id: object._id,
      type: object.type,
      content: object.content.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: this._convertByType.convertType(curr.value),
        };
      }, {}),
      metadata: object.metadata.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: curr.value,
        };
      }, {}),
    };
  }

  getObjectContent(id: string): any {
    let objContent: Objects;
    objContent = this.loadedContent.find((obj) => obj._id === id);

    if (objContent != undefined) {
      return objContent.content;
    }
  }

  getObjectType(id: string): string {
    let item = this.loadedContent.find((obj) => obj._id === id);
    if (item != undefined) {
      return item.type;
    }
    return "undefined";
  }

  defineItem(id: string): string {
    let item = this.loadedContent.find((obj) => obj._id === id);
    if (item != undefined) {
      switch (item.type) {
        case "card":
          return "description";
        case "question":
          return "quiz";
        case "itinerary":
          return "route";
      }
    }
    return "warning";
  }

  shareItinerary(itinerary: Itineraries) {
    let link: URL = new URL(
      environment.clientUrl + "/consumir/" + itinerary._id
    );
    navigator.clipboard.writeText(link.toString());
    this._notificationsService.info(
      "Link copiado!",
      "O link deste foi copiado para a área de transferência.",
      5000
    );
  }

  openNewTab(itinerary: Itineraries) {
    let link: URL = new URL(
      environment.clientUrl + "/consumir/" + itinerary._id
    );
    window.open(link.toString(), "_blank");
  }

  search() {
    if (this.metadata.length == 0) {
      this.getAllItineraries();
      this._notificationsService.error(
        "Erro!",
        "Nenhum filtro foi selecionado.",
        5000
      );
    } else {
      let filters = this._processMetadataService.buildFiltersList(
        this.metadata
      );

      this._itinerariesService.filterAny(filters).subscribe((data) => {
        this.itineraries = data;
        this.itineraries.forEach((itinerary) => {
          this.getItineraryContent(itinerary);
        });
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  openDialog(node: any) {
    const dialogConfig = {
      data: { metadata: node.metadata },
      width: "80%",
    };
    this._dialog.open(MetadataTableComponent, dialogConfig);
  }
}
