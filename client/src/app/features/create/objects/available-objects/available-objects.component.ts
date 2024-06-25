import { Component, EventEmitter, Output } from '@angular/core';
import { CardExample } from '../examples/card-example';
import { QuestionExample } from '../examples/question-example';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { MatButtonModule } from '@angular/material/button';
import { Card } from 'src/app/components/reusable/cards/card.model';
import { Question } from 'src/app/components/reusable/question/question.model';
import { CollapseAccordionOnClickDirective } from 'src/app/shared/directives/collapse-accordion-on-click.directive';

@Component({
  selector: 'app-available-objects',
  templateUrl: './available-objects.component.html',
  styleUrl: './available-objects.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    CardsComponent,
    QuestionComponent,
    CollapseAccordionOnClickDirective
  ],
})
export class AvailableObjectsComponent {
  @Output() objectTypeChange: EventEmitter<string> = new EventEmitter<string>();
  newObjectType: string = null;

  card: Card = new CardExample().newCard;
  question: Question = new QuestionExample().newQuestion;

  setObjectType(type: string): void {
    this.newObjectType = type;
    this.objectTypeChange.emit(this.newObjectType);
  }
}
