import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateObjectTabComponent } from './objects/create-object-tab/create-object-tab.component';
import { CreateItineraryTabComponent } from './itineraries/create-itinerary-tab/create-itinerary-tab.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CreateObjectTabComponent,
    CreateItineraryTabComponent
  ]
})
export class CreateComponent implements OnInit {
  newObjectType: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
