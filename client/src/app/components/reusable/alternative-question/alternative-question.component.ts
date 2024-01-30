import { Component } from '@angular/core';

@Component({
  selector: 'alternative-question',
  templateUrl: './alternative-question.component.html',
  styleUrls: ['./alternative-question.component.scss']
})
export class AlternativeQuestionComponent {
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
