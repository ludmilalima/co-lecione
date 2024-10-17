import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FilterComponent } from 'src/app/components/reusable/filter/filter.component';
import { ProcessMetadataService } from 'src/app/components/reusable/filter/process-metadata.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { ConvertByTypeService } from 'src/app/shared/services/convert-by-type.service';
import { ObjectsService } from '../../objects/objects.service';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { SelectionTableComponent } from '../selection-table/selection-table.component';
import { ItineraryTableComponent } from '../itinerary-table/itinerary-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SortableTableComponent } from '../sortable-table/sortable-table.component';

@Component({
  selector: 'app-objects-selection',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    FilterComponent,
    CardsComponent,
    QuestionComponent,
    SelectionTableComponent,
    SortableTableComponent,
    ItineraryTableComponent,

    MatButtonModule,
    MatExpansionModule
  ],
  templateUrl: './objects-selection.component.html',
  styleUrl: './objects-selection.component.scss'
})
export class ObjectsSelectionComponent implements OnInit {
  @Input() selectedObjects: Array<any> = [];
  @ViewChild('filter', { read: FilterComponent }) filter: FilterComponent;

  filters: Array<any> = [];
  objects: Array<any> = [];

  constructor(
    private _objectsService: ObjectsService,
    private _convertByType: ConvertByTypeService,
    private _processMetadataService: ProcessMetadataService,
    public _notificationsService: NotificationsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._objectsService.getAllObjects().subscribe(response => {
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
    if (this.filters.length == 0) {
      this._notificationsService.error('Erro', 'Nenhum filtro selecionado.', 5000);
    }
    else {
      let filters = this._processMetadataService.buildFiltersList(this.filters);
      this._objectsService.filterAny(filters).subscribe(data => {
        this.objects = data;
        this.processObjects(this.objects);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  clearFilters() {
    this.filter.clearFilters();
    this.getAllObjects();
  }

  getAllObjects() {
    this._objectsService.getAllObjects().subscribe(data => {
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
}
