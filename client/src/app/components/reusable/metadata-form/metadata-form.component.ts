import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { CardsComponent } from "src/app/components/reusable/cards/cards.component";
import { FilterComponent } from "src/app/components/reusable/filter/filter.component";
import { QuestionComponent } from "src/app/components/reusable/question/question.component";
import { ProcessMetadataService } from "../filter/process-metadata.service";

@Component({
  selector: "app-metadata-form",
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,
    FilterComponent,

    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: "./metadata-form.component.html",
  styleUrl: "./metadata-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataFormComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() metadata: Array<any>;
  @Input() buttonAction: { label: string; action: Function };
  @Output() filtersCleaned: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("filter", { read: FilterComponent }) filter: FilterComponent;

  displayedColumns: string[] = ["key", "value", "actions"];
  dataSource: MatTableDataSource<any>;

  private metadataDiffer: IterableDiffer<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _processMetadataService: ProcessMetadataService,
    private cdr: ChangeDetectorRef,
    private differs: IterableDiffers
  ) {}

  ngOnInit() {
    this.metadataDiffer = this.differs.find(this.metadata).create();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngDoCheck() {
    const changes = this.metadataDiffer.diff(this.metadata);
    if (changes) {
      this.dataSource.data = this._processMetadataService.buildFiltersList(
        this.metadata
      );
      this.cdr.markForCheck();
    }
  }

  removeElement(element: any): void {
    let indexMetadata = this.dataSource.data.indexOf(element);
    this.metadata.splice(indexMetadata, 1);
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  clearFilters() {
    this.filter.clearFilters();
    this.filtersCleaned.emit();
  }
}
