import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewCardComponent } from 'src/app/components/reusable/cards/new-card/new-card.component';
import { NewQuestionComponent } from 'src/app/components/reusable/question/new-question/new-question.component';
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
export class CreateObjectTabComponent {}
