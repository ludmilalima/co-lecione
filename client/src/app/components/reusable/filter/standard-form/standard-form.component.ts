import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource, MatTreeModule } from '@angular/material/tree';
import { Obaa } from 'src/app/core/models/metadata/obaa.model';
import { ProcessStringService } from '../process-string.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BooleanTypeFilterComponent } from '../boolean-type-filter/boolean-type-filter.component';
import { CharacterStringTypeFilterComponent } from '../character-string-type-filter/character-string-type-filter.component';
import { LangStringTypeFilterComponent } from '../lang-string-type-filter/lang-string-type-filter.component';
import { MultipleSelectComponent } from '../multiple-select/multiple-select.component';
import { SimpleTextInputComponent } from '../simple-text-input/simple-text-input.component';
import { UnitSelectComponent } from '../unit-select/unit-select.component';
import { GenericContainerComponent } from '../generic-container/generic-container.component';
import { DialogService } from '../dialog.service';

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
  selector: 'app-standard-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,

    UnitSelectComponent,
    SimpleTextInputComponent,
    LangStringTypeFilterComponent,
    CharacterStringTypeFilterComponent,
    GenericContainerComponent,
    BooleanTypeFilterComponent,
    MultipleSelectComponent,

    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './standard-form.component.html',
  styleUrl: './standard-form.component.scss'
})
export class StandardFormComponent {
  @Input() filters: Array<any>;
  @Input() clearFilters: boolean;

  obaa: Obaa = new Obaa();
  obaaTree: Array<ObaaNode>;

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  private _transformer = (node: ObaaNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      object: node.object,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public _processStringService: ProcessStringService,
    private _dialogService: DialogService,
  ) {
    this._processStringService = new ProcessStringService();

    this.initTree();
  }

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
        console.info(`key error: ${key}`)
        console.info(item);
        console.error(error);
      }
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  initTree() {
    this.obaaTree = [{ name: 'Metadados', children: [], hierarchy: 'root' }];
    this.mapNodes(this.obaaTree[0], this.obaa);
    this.dataSource.data = this.obaaTree;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearFilters'] && changes['clearFilters'].currentValue) {
      this.clearFilter();
    }
  }

  openNodeDialog(node: any): void {
    this._dialogService.openDialog(node, this.filters);
  }

  clearFilter() {
    this.initTree();
  }
}
