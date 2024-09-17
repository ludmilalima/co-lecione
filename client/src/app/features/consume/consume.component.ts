import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { ItinerariesService } from '../create/itineraries/itineraries.service';
import { Itineraries } from '../create/itineraries/itineraries.model';
import { Objects } from '../create/objects/objects.model';
import { ObjectsService } from '../create/objects/objects.service';
import { ConvertByTypeService } from 'src/app/shared/services/convert-by-type.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-consume',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,

    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './consume.component.html',
  styleUrl: './consume.component.scss'
})
export class ConsumeComponent implements OnInit {

  itinerary: Itineraries | null = null;
  loadedObjects: Array<Objects> = [];

  constructor(
    private route: ActivatedRoute,
    private _itinerariesService: ItinerariesService,
    private _objectsService: ObjectsService,
    private _convertByType: ConvertByTypeService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const id = params.get('id');
      if (id) {
        this.getItineraryById(id);
      }
    });
  }

  getItineraryById(id: string): void {
    this._itinerariesService.getItineraryById(id).subscribe(response => {
      this.itinerary = response;
      this.getObjects();
    });
  }

  getObjects(): void {
    this.itinerary?.content.map(object => {
      this._objectsService.getObjectById(object.objectId).subscribe(response => {
        this.loadedObjects.push(this.convertContent(response));
      });
    });
  }

  convertContent(object: any) {
    return {
      _id: object._id,
      type: object.type,
      content: object.content.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: this._convertByType.convertType(curr.value),
        };
      }, {}),
      metadata: object.metadata.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          [curr.key]: curr.value,
        };
      }, {}),
    };
  }

  getObjectType(id: string): string {
    const item = this.loadedObjects?.find(obj => obj._id === id);
    return item ? item.type : 'undefined';
  }

  getObjectContent(id: string): any {
    const item = this.loadedObjects?.find(obj => obj._id === id);
    return item ? item.content : null;
  }

  defineItem(id: string): string {
    let item = this.loadedObjects.find(obj => obj._id === id);
    if (item != undefined) {
      switch (item.type) {
        case 'card':
          return 'description';
        case 'question':
          return 'quiz';
        case 'itinerary':
          return 'route';
      }
    }
    return 'warning';
  }
}
