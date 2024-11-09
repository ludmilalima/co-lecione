import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ProcessMetadataService } from "src/app/components/reusable/filter/process-metadata.service";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { ConvertByTypeService } from "src/app/shared/services/convert-by-type.service";
import { ObjectsService } from "../../create/objects/objects.service";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { MatButtonModule } from "@angular/material/button";
import { MetadataFormComponent } from "src/app/components/reusable/metadata-form/metadata-form.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MetadataTableComponent } from "src/app/components/reusable/metadata-table/metadata-table.component";

@Component({
  selector: "app-objects",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    MetadataFormComponent,
    QuestionComponent,
    CardsComponent,

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: "./objects.component.html",
  styleUrl: "./objects.component.scss",
})
export class ObjectsComponent implements OnInit {
  //@ViewChild("filter", { read: FilterComponent }) filter: FilterComponent;

  objects: Array<any> = [];
  metadata: Array<any> = [];

  buttonAction = { label: "Buscar", action: this.search.bind(this) };

  constructor(
    private _objectsService: ObjectsService,
    private _convertByType: ConvertByTypeService,
    private _processMetadataService: ProcessMetadataService,
    public _notificationsService: NotificationsService,
    private changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._objectsService.getAllObjects().subscribe((response) => {
      this.objects = response.map((object: any) => {
        return {
          id: object._id,
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
      });
    });
  }

  search() {
    if (this.metadata.length == 0) {
      this.getAllObjects();
      this._notificationsService.error(
        "Erro",
        "Nenhum filtro selecionado.",
        5000
      );
    } else {
      let filters = this._processMetadataService.buildFiltersList(
        this.metadata
      );
      this._objectsService.filterAny(filters).subscribe((data) => {
        this.objects = data;
        this.processObjects(this.objects);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  clearFilters() {
    this.metadata = [];
    this.getAllObjects();
  }

  getAllObjects() {
    this._objectsService.getAllObjects().subscribe((data) => {
      this.objects = data;
      this.processObjects(this.objects);
    });
  }

  processObjects(objectsList: Array<any>): void {
    this.objects = objectsList.map((object: any) => {
      return {
        id: object._id,
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
    });
  }

  openDialog(node: any) {
    console.log(node);
    const dialogConfig = {
      data: { metadata: node.metadata },
      width: "80%",
    };
    this._dialog.open(MetadataTableComponent, dialogConfig);
  }
}
