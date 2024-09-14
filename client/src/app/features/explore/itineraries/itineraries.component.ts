import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { MetadataFormComponent } from 'src/app/components/reusable/metadata-form/metadata-form.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { ItinerariesService } from '../../create/itineraries/itineraries.service';

@Component({
  selector: 'app-itineraries',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,

    CardsComponent,
    QuestionComponent,
    MetadataFormComponent,

    MatExpansionModule,
  ],
  templateUrl: './itineraries.component.html',
  styleUrl: './itineraries.component.scss'
})
export class ItinerariesComponent implements OnInit {

  itineraries: Array<any> = [];
  metadata: Array<any> = [];
  buttonAction = { label: "Buscar", action: this.search.bind(this) };

  constructor(
    private _notificationsService: NotificationsService,
    private _itinerariesService: ItinerariesService
  ) { }

  ngOnInit(): void {
      this._itinerariesService.getAllItineraries().subscribe(response => {
        console.log(response);
        response.map((itinerary: any) => {
          console.log(itinerary);
        });
      });
  }

  search() {
    if (this.metadata.length == 0) {
      this._notificationsService.error("Erro!", "Nenhum filtro foi selecionado.");
    } else {
      // this._itinerariesService.getItineraries(this.metadata).subscribe(response => {
      //   console.log(response);
    }
  }
}
