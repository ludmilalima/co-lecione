import { Component, OnInit } from '@angular/core';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  cards: any[] = [];

  constructor(
    public objectsService: ObjectsService,
  ) { }

  ngOnInit(): void {
    var newObject = {
      "avatarSrc": "https://example.com/avatar.jpg",
      "headerImageSrc": "https://example.com/header.jpg",
      "title": "Example Title",
      "subtitle": "Example Subtitle",
      "content": "Example content",
      "action": "Example action",
      "resourceType": "Card",
      "metadata": [
        {
          "key": "exampleKey1",
          "value": "exampleValue1"
        },
        {
          "key": "exampleKey2",
          "value": "exampleValue2"
        }
      ]
    };

    this.objectsService.getCards().subscribe(response => {
      this.cards = response;
      console.log(response);
    });
  }
}
