import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnitSelectComponent } from './unit-select/unit-select.component';
import { CommonModule } from '@angular/common';
import { Obaa } from 'src/app/core/models/metadata/obaa.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { LangStringTypeFilterComponent } from './lang-string-type-filter/lang-string-type-filter.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SimpleTextInputComponent } from './simple-text-input/simple-text-input.component';
import { IsoLanguageCodeEnum, NodeInfo } from 'src/app/core/models/metadata/util.model';
import { CharacterStringTypeFilterComponent } from './character-string-type-filter/character-string-type-filter.component';

interface ObaaNode {
  name: string;
  children?: ObaaNode[];
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

    UnitSelectComponent,
    SimpleTextInputComponent,
    LangStringTypeFilterComponent,
    CharacterStringTypeFilterComponent,

    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {

  obaa: Obaa = new Obaa();
  obaaTree: Array<ObaaNode> = [{ name: 'root', children: [], hierarchy: 'root' }];

  constructor() {
    this.mapNodes(this.obaaTree[0], this.obaa);
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

  mapNodes(root: ObaaNode, item: Object) {
    for (const key in item) {
      let hierarchy = root.hierarchy + '.' + key;
      try {
        if (item.hasOwnProperty(key) && key !== 'nodeInfo' && key !== 'childType') {
          if (item[key].hasOwnProperty('nodeInfo') && item[key].nodeInfo.nodeType == 'root') {
            item[key].nodeInfo.key = hierarchy;
            root.children.push({ name: key, children: [], hierarchy: hierarchy, object: item[key] });
            this.mapNodes(root.children.find(e => e.name === key), item[key]);
          } else {
            if (item[key]?.nodeInfo) {
              item[key].nodeInfo.key = hierarchy;
              root.children.push({
                name: key,
                hierarchy: hierarchy,
                object: item[key],
              });
            } else if (item[key] instanceof Array) {
              root.children.push({ name: key, children: [], hierarchy: hierarchy, object: item['childType'] });
              this.mapNodes(root.children.find(e => e.name === key), item['childType']);
            } else {
              item[key].nodeInfo.key = hierarchy;
              root.children.push({ name: key, hierarchy: hierarchy, object: item[key] });
            }
          }
        }
      } catch (error) {
        console.log(`key error: ${key}`)
        console.log(item);
        console.error(error);
      }
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getLastToken(input: string): string {
    const tokens = input.split('.');
    return this.convertString(tokens[tokens.length - 1]);
  }

  convertString(input: string): string {
    const words = input.replace(/([A-Z])/g, ' $1').trim().split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  }
}