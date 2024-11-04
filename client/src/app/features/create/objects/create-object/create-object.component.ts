import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DoCheck, EventEmitter, KeyValueDiffers, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { NewQuestionComponent } from 'src/app/components/reusable/question/new-question/new-question.component';
import { Objects } from '../objects.model';
import { ObjectsService } from '../objects.service';
import { SharedFormService } from 'src/app/shared/services/shared-form.service';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { NewCardComponent } from 'src/app/components/reusable/cards/new-card/new-card.component';
import { MetadataFormComponent } from '../../../../components/reusable/metadata-form/metadata-form.component';
import { ProcessMetadataService } from 'src/app/components/reusable/filter/process-metadata.service';
import { AvailableObjectsComponent } from '../available-objects/available-objects.component';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    AvailableObjectsComponent,
    NewQuestionComponent,
    NewCardComponent,
    QuestionComponent,
    CardsComponent,
    MetadataFormComponent,

    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ]
})

export class CreateObjectComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  @ViewChild('metadataTable', { static: false }) metadataTable: MatTable<any>;
  @ViewChild('metadataForm') metadataForm: MetadataFormComponent;
  @ViewChild('availableObjectsComponent') availableObjectsComponent: AvailableObjectsComponent;

  @Output() objectTypeChange: EventEmitter<string> = new EventEmitter<string>();

  objectType: string = null;

  filters: Array<any> = [];
  private filtersDiffer: any;

  editor: Editor;
  editorContent: Subscription;

  touchedForm: boolean;
  doNotCreateObject: boolean = false;

  displayedColumns: string[] = ['chave', 'valor'];

  newObject: Array<{ key: string, value: string }> = [];
  metadata: Array<{ key: string, value: string }> = [];
  dataSource = new MatTableDataSource(this.metadata);
  isLinear = false;

  objForm: FormGroup;

  constructor(
    private _confirmationDialogService: ConfirmationDialogService,
    private _objectsService: ObjectsService,
    private _formService: SharedFormService,
    private _processMetadataService: ProcessMetadataService,
    private _notificationsService: NotificationsService,
    private differs: KeyValueDiffers
  ) {
    this.editor = new Editor();
    this.filtersDiffer = this.differs.find(this.filters).create();
  }

  ngOnInit(): void {
    this._formService.currentForm.subscribe(form => {
      this.objForm = form;
    });

    this._formService.formChanged.subscribe(isFilled => {
      if (isFilled) {
        if (!this.touchedForm) {
          this.touchedForm = true;
        }
      }
    });

    this.touchedForm = false;
  }

  ngAfterViewInit(): void {
    this.updateMetadata();
  }

  ngDoCheck(): void {
    let filtersCopy = JSON.parse(JSON.stringify(this.filters));
    const filterChanges = this.filtersDiffer.diff(filtersCopy);
    if (filterChanges) {
      this.updateMetadata();
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.editorContent) {
      this.editorContent.unsubscribe();
    }
  }

  updateMetadata(): void {
    this.metadata = this._processMetadataService.buildFiltersList(this.filters);
    this.dataSource.data = [...this.metadata];
    if (this.metadataTable) {
      this.metadataTable.renderRows();
    }
  }

  handleObjectTypeChange(newType: string): void {
    if (this.objectType != null && this.objectType != newType) {
      this._confirmationDialogService.openDialog(
        'Tem certeza que gostaria de descartar o objeto atual?',
        () => this.changeObjectType(newType),
        () => { }
      );
    } else {
      this.changeObjectType(newType);
    }
  }

  changeObjectType(newType: string | null): void {
    this.objectType = newType;
  }

  submit(): void {
if (this.objForm.controls != undefined) {
  for (const key in this.objForm.controls) {
    if (this.objForm.get(key).value !== null && this.objForm.get(key).value !== '') {
      if (typeof this.objForm.get(key).value != 'string') {
        var strContent = JSON.stringify(this.objForm.get(key).value);
        this.newObject.push({ key: key, value: strContent });
      } else {
        this.newObject.push({ key: key, value: this.objForm.get(key).value });
      }
    }
  }

  const observer = {
    next: (response: any) => {
      this._notificationsService.success('Sucesso!', 'Objeto criado com sucesso.', 5000);
    },
    error: (error: any) => {
      this._notificationsService.error('Erro!', 'Erro ao criar objeto.', 5000);
    },
    complete: () => {
      this._confirmationDialogService.openDialog(`Deseja criar um novo objeto?`, () => this.resetCreation(), () => this.doNotResetCreation());
    }
  };

  if (this.checkMandatoryObject() && this.checkMandatoryMetadata()) {

    var obj = new Objects(
      this.objectType,
      this.newObject,
      this.metadata
    );

    this._objectsService.createObject(obj).subscribe(observer);
  }
} else {
  this._notificationsService.info('Atenção!', 'Ao menos um campo do objeto precisa ser preenchido.', 5000)
}
  }

  resetCreation(): void {
    window.location.reload();
  }

  doNotResetCreation(): void {
    this.doNotCreateObject = true;
  }

  checkMandatoryObject(): boolean {
    if (this.newObject.length < 1) {
      this._notificationsService.error('Erro!', 'O objeto deve conter ao menos um campo preenchido.', 5000);
      return false;
    }
    return true;
  }

  checkMandatoryMetadata(): boolean {
    if (this.metadata.length < 1) {
      this._notificationsService.error('Erro!', 'O objeto deve ter metadados associados.', 5000);
      return false;
    }
    return true;
  }

  isValid(): boolean {
    let valid = (this.metadata.length > 0) && (this.objForm != null) && (!this.doNotCreateObject);
    if (valid) {
      valid = this.objForm.controls != undefined;
    }
    return valid
  }

  clearObject(): void {
    this.objForm.value['alternatives'] = null;
    this.newObject = [];
    this.objForm.reset();
    this.touchedForm = false;
  }
}
