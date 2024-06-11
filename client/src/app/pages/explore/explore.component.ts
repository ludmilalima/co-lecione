import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { on } from 'events';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { Objects } from 'src/app/models/objects';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CardsComponent,
    QuestionComponent,
  ]
})
export class ExploreComponent implements OnInit {
  objects: any[] = [];

  constructor(private _objectsService: ObjectsService) { }

  ngOnInit(): void {
    this._objectsService.getAllObjects().subscribe(response => {
      this.objects = response.map((object: any) => {
        return {
          type: object.type,
          content: object.content.reduce((acc: any, curr: any) => {
            return {
              ...acc,
              [curr.key]: curr.value,
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
}