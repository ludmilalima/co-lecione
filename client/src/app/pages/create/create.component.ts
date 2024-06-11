import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';
import { AvailableObjectsComponent } from './create-object/available-objects/available-objects.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewCardComponent } from 'src/app/components/new-card/new-card.component';
import { NewQuestionComponent } from 'src/app/components/new-question/new-question.component';
import { CommonModule } from '@angular/common';
import { CreateObjectComponent } from './create-object/create-object.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    AvailableObjectsComponent,
    NewCardComponent,
    NewQuestionComponent,
    CreateObjectComponent
  ]
})
export class CreateComponent implements OnInit {
  newObjectType: string = null;

  constructor(private _confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
  }

  handleObjectTypeChange(newType: string): void {
    if (this.newObjectType) {
      this._confirmationDialogService.openDialog(
        'Tem certeza que gostaria de descartar o objeto atual?',
        () => this.changeObjectType(newType),
        () => { }
      );
    } else {
      this.changeObjectType(newType);
    }
  }

  changeObjectType(newType: string): void {
    this.newObjectType = newType;
  }
}
