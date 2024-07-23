import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewCardComponent } from 'src/app/components/reusable/cards/new-card/new-card.component';
import { NewQuestionComponent } from 'src/app/components/reusable/question/new-question/new-question.component';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
import { AvailableObjectsComponent } from '../available-objects/available-objects.component';
import { CreateObjectComponent } from '../create-object/create-object.component';

@Component({
  selector: 'app-create-object-tab',
  templateUrl: './create-object-tab.component.html',
  styleUrl: './create-object-tab.component.scss',
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
export class CreateObjectTabComponent {
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

  changeObjectType(newType: string | null): void {
    this.newObjectType = newType;
  }
}
