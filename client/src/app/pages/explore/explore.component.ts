import { AfterViewInit, Component, OnInit } from '@angular/core';
import { on } from 'events';
import { Objects } from 'src/app/models/objects';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  objects: any[] = [];

  constructor(private _objectsService: ObjectsService) { }

  ngOnInit(): void {
    // this._objectsService.getAllObjects().subscribe(response => {
    //   this.objects = response;
    //   console.log('Objects:', this.objects);
    // });
  }

  ngAfterViewInit(): void {
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

      var locObj = response.map((object: any) => {
        return  {
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
  };
}