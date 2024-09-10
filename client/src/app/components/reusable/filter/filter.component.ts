import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Obaa } from 'src/app/core/models/metadata/obaa.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProcessStringService } from './process-string.service';
import { ProcessMetadataService } from './process-metadata.service';
import { ObjectsService } from 'src/app/features/create/objects/objects.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { CustomTypeFilterComponent } from './custom-type-filter/custom-type-filter.component';
import { Observable } from 'rxjs';
import { StandardFormComponent } from './standard-form/standard-form.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,

    StandardFormComponent,
    CustomTypeFilterComponent,

    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Output() objectsChanged = new EventEmitter<any[]>();
  clearFiltersEvent = new EventEmitter<boolean>();

  filters: Array<any> = [];

  constructor(
    public _processStringService: ProcessStringService,
    private _processMetadataService: ProcessMetadataService,
    private _objectsService: ObjectsService,
    public _notificationsService: NotificationsService
  ) { }


  clearFilters() {
    this.filters = [];
    this.emitClearFilters().subscribe(() => {
      this.clearFiltersEvent.emit(false);
      this.getAllObjects();
    });
  }

  emitClearFilters(): Observable<any> {
    this.clearFiltersEvent.emit(true);
    return new Observable(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 100);
    });
  }

  search() {
    if (this.filters.length == 0) {
      this._notificationsService.error('Erro', 'Nenhum filtro selecionado.');
    }
    else {
      let filters = this._processMetadataService.buildFiltersList(this.filters);
      this._objectsService.filterAny(filters).subscribe(data => {
        this.objectsChanged.emit(data);
      });
    }
  }

  getAllObjects() {
    this._objectsService.getAllObjects().subscribe(data => {
      this.objectsChanged.emit(data);
    });
  }
}