import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { ObjectsService } from '../create/objects/objects.service';
import { ConvertByTypeService } from 'src/app/shared/services/convert-by-type.service';
import { FilterComponent } from 'src/app/components/reusable/filter/filter.component';
import { ProcessMetadataService } from 'src/app/components/reusable/filter/process-metadata.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
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