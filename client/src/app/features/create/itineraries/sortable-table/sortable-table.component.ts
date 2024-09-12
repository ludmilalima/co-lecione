import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, KeyValueDiffers, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardsComponent } from 'src/app/components/reusable/cards/cards.component';
import { QuestionComponent } from 'src/app/components/reusable/question/question.component';
import { MatChipsModule } from '@angular/material/chips';

interface tableItem {
  type: string;
  content: any;
  metadata: any;
  position: number;
}

const exampleData: tableItem[] = [
  {
    "type": "question",
    "content": {
      "topic": "Assunto",
      "note": "Nota",
      "figureSrc": "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?cs=srgb&dl=pexels-pixabay-356079.jpg&fm=jpg",
      "statement": {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "Espaço para enunciado da questão."
              }
            ]
          }
        ]
      },
      "alternatives": [
        "Aternativa 1",
        "Alternativa 2",
        "Alternativa 3",
        "Alternativa 4",
        "Alternativa 5"
      ],
      "discursive": "true"
    },
    "metadata": {
      "Propósito": "Teste"
    },
    "position": 2
  },
  {
    "type": "card",
    "content": {
      "title": "Título",
      "subtitle": "Subtítulo",
      "content": {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "ABCDE"
              }
            ]
          }
        ]
      }
    },
    "metadata": {
      "general.structure": "collection",
      "general.aggregationLevel": "2",
      "technical.size": "saddsd"
    },
    "position": 3
  },
  {
    "type": "card",
    "content": {
      "avatarSrc": "https://w7.pngwing.com/pngs/389/384/png-transparent-nickelodeon-spongebob-spreading-his-hand-bob-esponja-patrick-star-nickelodeon-television-show-others-miscellaneous-cartoon-vehicle-thumbnail.png",
      "headerImageSrc": "https://static.ric.com.br/uploads/2021/05/the-patrick-star-show.jpg",
      "title": "Cartão do Patrick",
      "subtitle": "Olha como está ficando!",
      "content": {
        "type": "doc",
        "content": [
          {
            "type": "heading",
            "attrs": {
              "level": 1,
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "Olá, Patrick!"
              }
            ]
          },
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            }
          },
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "marks": [
                  {
                    "type": "strong"
                  }
                ],
                "text": "Como vc está, amigo?"
              },
              {
                "type": "hard_break",
                "marks": [
                  {
                    "type": "strong"
                  }
                ]
              },
              {
                "type": "hard_break",
                "marks": [
                  {
                    "type": "strong"
                  }
                ]
              }
            ]
          }
        ]
      },
      "actionTitle": "Confira!",
      "actionLink": "https://pt.wikipedia.org/wiki/Patrick_Estrela"
    },
    "metadata": {
      "Propósito": "Patrick",
      "Local": "Lorena"
    },
    "position": 4
  },
  {
    "type": "question",
    "content": {
      "topic": "Questionamento",
      "statement": {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "Como você está se sentindo hoje?"
              },
              {
                "type": "hard_break"
              },
              {
                "type": "hard_break"
              },
              {
                "type": "text",
                "text": "Disserte sobre seu estado de humor…"
              }
            ]
          }
        ]
      },
      "alternatives": [
        "Ótimo!",
        "Fabuloso!",
        "Péssimo!"
      ],
      "discursive": "true"
    },
    "metadata": {
      "Propósito": "Patrick",
      "Local": "SJC"
    },
    "position": 5
  },
  {
    "type": "card",
    "content": {
      "title": "Objeto teste",
      "subtitle": "Subtítulo teste",
      "content": {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "Conteúdo teste"
              }
            ]
          }
        ]
      }
    },
    "metadata": {
      "general.structure": "hierarchical",
      "general.title": "{\"content\":\"Objeto teste\",\"language\":\"pt\"}",
      "general.description": "{\"content\":\"Subtítulo teste\",\"language\":\"pt\"}",
      "general.keyword": "{\"content\":\"palavra-chave\",\"language\":\"pt\"}",
      "chave": "valor"
    },
    "position": 6
  },
  {
    "type": "card",
    "content": {
      "avatarSrc": "https://png.pngtree.com/png-clipart/20220429/original/pngtree-dog-with-bell-going-to-sleep-pet-social-media-avatar-png-image_7572709.png",
      "headerImageSrc": "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/6/16/1/shutterstock_1862856634.jpg.rend.hgtvcom.1280.853.suffix/1655430860853.jpeg",
      "title": "Título",
      "subtitle": "Subtítulo",
      "content": {
        "type": "doc",
        "content": [
          {
            "type": "paragraph",
            "attrs": {
              "align": null,
              "indent": null
            },
            "content": [
              {
                "type": "text",
                "text": "Espaço para conteúdo!"
              }
            ]
          }
        ]
      },
      "actionTitle": "Texto para redirecionamento",
      "actionLink": "www.google.com"
    },
    "metadata": {
      "Propósito": "Teste"
    },
    "position": 1
  }
]

@Component({
  selector: 'app-sortable-table',
  standalone: true,
  imports: [
    CommonModule,

    CardsComponent,
    QuestionComponent,

    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './sortable-table.component.html',
  styleUrl: './sortable-table.component.scss'
})
export class SortableTableComponent {
  @Input() selectedObjects: Array<any> = [];

  @ViewChild('table', { static: true }) table: MatTable<tableItem>;

  displayedColumns: string[] = ['reorder', 'position', 'remove'];

  dataSource = new MatTableDataSource<any>(this.selectedObjects);
  private selectedObjectsDiffer: any;

  constructor(
    private differs: KeyValueDiffers
  ) {
    this.selectedObjectsDiffer = this.differs.find(this.selectedObjects).create();
  }

  ngDoCheck(): void {
    const selectedObjectsCopy = JSON.parse(JSON.stringify(this.selectedObjects));
    const selectedObjectsChanges = this.selectedObjectsDiffer.diff(selectedObjectsCopy);
    if (selectedObjectsChanges) {
      this.dataSource.data = this.selectedObjects;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    console.log(event.item.data);
    const previousIndex = this.dataSource.data.findIndex(d => d === event.item.data);
    console.log(previousIndex);
    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  addObject(row: any) {
    if (!this.isSelected(row)) {
      this.selectedObjects.push(row);
    }
  }

  removeObject(row: any) {
    const index = this.selectedObjects.indexOf(row);
    if (index >= 0) {
      this.fixPosition(index);
      this.selectedObjects.splice(index, 1);
    }
  }

  fixPosition(index: number) {
    let minPosition = this.selectedObjects[index].position;
    this.selectedObjects.map((object, i) => {
      if (object.position > minPosition) {
        object.position--;
      }
    });
  }

  isSelected(row: any): boolean {
    return this.selectedObjects.includes(row);
  }
}
