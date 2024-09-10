import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  @Input() filters: Array<any>;
  clearFiltersEvent = new EventEmitter<boolean>();


  clearFilters() {
    this.filters = [];
    this.emitClearFilters().subscribe(() => {
      this.clearFiltersEvent.emit(false);
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

}