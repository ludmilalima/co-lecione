import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UnitSelectComponent } from './unit-select/unit-select/unit-select.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitSelect } from './filter.model';
import { Obaa } from 'src/app/core/models/metadata/obaa.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { LangStringTypeFilterComponent } from './lang-string-type-filter/lang-string-type-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlatTreeControl } from '@angular/cdk/tree';

interface ObaaNode {
  name: string;
  // minOccurs?: number;
  // maxOccurs?: number;
  // type?: string;
  children?: ObaaNode[];
  // description?: string;
  hierarchy?: string;
  object?: Object;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UnitSelectComponent,
    LangStringTypeFilterComponent,

    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Input() unitSelects: Array<UnitSelect>;

  form: FormGroup;

  obaa: Obaa = new Obaa();
  obaaTree: Array<ObaaNode> = [{ name: 'root', children: [], hierarchy: 'root' }];


  constructor() {
    this.mapNodes(this.obaaTree[0], this.obaa);
    console.log(this.obaaTree);
    let node = this.obaaTree;
    console.log(node);
    console.log(JSON.stringify(this.obaaTree, null, 2));
    this.dataSource.data = this.obaaTree;
  }

  private _transformer = (node: ObaaNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      object: node.object,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
  }

  mapNodes(root: ObaaNode, item: Object) {
    for (const key in item) {
      try {
        if (item.hasOwnProperty(key) && key !== 'nodeInfo' && key !== 'childType') {
          if (item[key].hasOwnProperty('nodeInfo') && item[key].nodeInfo.nodeType == 'root') {
            root.children.push({ name: key, children: [], hierarchy: root.hierarchy + '.' + key, object: item[key] });
            this.mapNodes(root.children.find(e => e.name === key), item[key]);
          } else {
            if (item[key]?.nodeInfo) {
              root.children.push({
                name: key,
                hierarchy: root.hierarchy + '.' + key,
                object: item[key],
              });
            } else if (item[key] instanceof Array) {
              root.children.push({ name: key, children: [], hierarchy: root.hierarchy + '.' + key, object: item['childType'] });
              this.mapNodes(root.children.find(e => e.name === key), item['childType']);
            } else {
              console.log(`else key: ${key}`)
              root.children.push({ name: key, hierarchy: root.hierarchy + '.' + key, object: item[key] });
            }
          }
        }
      } catch (error) {
        console.log(`key: ${key}`)
        console.log(item);
        console.error(error);
      }
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}