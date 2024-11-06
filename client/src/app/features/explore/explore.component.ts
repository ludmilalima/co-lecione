import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ItinerariesComponent } from './itineraries/itineraries.component';
import { ObjectsComponent } from './objects/objects.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    ItinerariesComponent,
    ObjectsComponent,

    MatTabsModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent {

}