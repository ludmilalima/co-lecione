import { Component } from '@angular/core';
import { CreateItineraryComponent } from '../create-itinerary/create-itinerary.component';

@Component({
  selector: 'app-create-itinerary-tab',
  standalone: true,
  imports: [
    CreateItineraryComponent
  ],
  templateUrl: './create-itinerary-tab.component.html',
  styleUrl: './create-itinerary-tab.component.scss'
})
export class CreateItineraryTabComponent {

}
