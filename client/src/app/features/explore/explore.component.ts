import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { ObjectsService } from '../create/objects/objects.service';
import { ConvertByTypeService } from 'src/app/shared/services/convert-by-type.service';
import { FilterComponent } from 'src/app/components/reusable/filter/filter.component';
import { Obaa } from 'src/app/core/models/metadata/obaa.model';
import { UnitSelect } from 'src/app/components/reusable/filter/filter.model';

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
    FilterComponent,
  ]
})
export class ExploreComponent implements OnInit {
  objects: any[] = [];

  unitSelects: Array<UnitSelect> = [];
  obaa: Obaa = new Obaa();

  constructor(private _objectsService: ObjectsService, private _convertByType: ConvertByTypeService) { }

  ngOnInit(): void {
    this._objectsService.getAllObjects().subscribe(response => {
      this.objects = response.map((object: any) => {
        return {
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
      });
    });

    this.unitSelects.push(new UnitSelect('Select a unit', ['unit1', 'unit2', 'unit3']));
    this.unitSelects.push(new UnitSelect('Select a fruit', this.obaa.educational.intendedEndUserRole.getValueOptions()));
  }
}