import { FormArray } from "@angular/forms";
import { Question } from "src/app/components/reusable/question/question.model";

export class QuestionExample {
  questionExample: Object = {
    _id: {
      $oid: "679eb1804d35f579adf28bb4",
    },
    type: "question",
    content: [
      {
        key: "topic",
        value: "Este é um exemplo de questão",
        _id: {
          $oid: "679eb1804d35f579adf28bb5",
        },
      },
      {
        key: "note",
        value: "Será que este é o tipo ideal de objeto para você?",
        _id: {
          $oid: "679eb1804d35f579adf28bb6",
        },
      },
      {
        key: "figureSrc",
        value:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/791514f9-b282-4c75-830a-e1164ef7736f/da57koc-e174b044-460c-437c-8a03-72d77457d83c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc5MTUxNGY5LWIyODItNGM3NS04MzBhLWUxMTY0ZWY3NzM2ZlwvZGE1N2tvYy1lMTc0YjA0NC00NjBjLTQzN2MtOGEwMy03MmQ3NzQ1N2Q4M2MuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ztmlvzcfbz1swOrhceOwkaCpIbFxeA_BQBVptOwZG0g",
        _id: {
          $oid: "679eb1804d35f579adf28bb7",
        },
      },
      {
        key: "statement",
        value:
          '{"type":"doc","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Se o mago "},{"type":"text","marks":[{"type":"strong"}],"text":"Editor, o Riquenriquecedor"},{"type":"text","text":", tivesse que criar um feitiço para impedir que os escribas procrastinassem, qual seria o encantamento?"}]},{"type":"paragraph","attrs":{"align":"center","indent":null},"content":[{"type":"image","attrs":{"src":"https://upload.wikimedia.org/wikipedia/commons/8/8d/StaffWand.gif","alt":"","title":"","width":"178px"}}]},{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Compartilhe outros remédios com potencial de cura para este mal que os afeta."}]}]}',
        _id: {
          $oid: "679eb1804d35f579adf28bb8",
        },
      },
      {
        key: "alternatives",
        value:
          '["\\"Digitus Rápidus!\\" – Para escrever na velocidade da luz","\\"Sem-Scrollium!\\" – Para impedir que rolem a timeline ao invés de trabalhar","\\"AutoSalvatus!\\" – Para salvar automaticamente antes que a inspiração fuja","\\"Café Infinitus!\\" – Para manter todos acordados até terminarem o texto"]',
        _id: {
          $oid: "679eb1804d35f579adf28bb9",
        },
      },
      {
        key: "discursive",
        value: "true",
        _id: {
          $oid: "679eb1804d35f579adf28bba",
        },
      },
    ],
    metadata: [
      {
        key: "Propósito",
        value: "Exemplo questão",
        _id: {
          $oid: "679eb1804d35f579adf28bbb",
        },
      },
    ],
    __v: 0,
  };

  // old question example
  contentQuestion = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "rgb(52, 58, 64)",
                },
              },
              {
                type: "text_background_color",
                attrs: {
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
            ],
            text: "Analisando as vendas de uma empresa, o gerente concluiu que o montante diário arrecadado, em milhar de real, poderia ser calculado pela expressão:",
          },
        ],
      },
      {
        type: "blockquote",
        attrs: {
          indent: null,
        },
        content: [
          {
            type: "paragraph",
            attrs: {
              align: null,
              indent: null,
            },
            content: [
              {
                type: "text",
                marks: [
                  {
                    type: "text_color",
                    attrs: {
                      color: "rgb(52, 58, 64)",
                    },
                  },
                  {
                    type: "text_background_color",
                    attrs: {
                      backgroundColor: "rgb(255, 255, 255)",
                    },
                  },
                ],
                text: "V(x) = x^2/4 - 10x + 105,",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "rgb(52, 58, 64)",
                },
              },
              {
                type: "text_background_color",
                attrs: {
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
            ],
            text: "na qual os valores de x representam os dias do mês, variando de 1 a 30.",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          align: null,
          indent: null,
        },
        content: [
          {
            type: "hard_break",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "rgb(52, 58, 64)",
                },
              },
              {
                type: "text_background_color",
                attrs: {
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
            ],
          },
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "rgb(52, 58, 64)",
                },
              },
              {
                type: "text_background_color",
                attrs: {
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
            ],
            text: "Um dos fatores para avaliar o desempenho mensal da empresa é verificar qual é o menor montante diário V0 arrecadado ao longo do mês e classificar o desempenho conforme as categorias apresentadas a seguir, em que as quantidades estão expressas em milhar de real.",
          },
        ],
      },
      {
        type: "bullet_list",
        content: [
          {
            type: "list_item",
            content: [
              {
                type: "paragraph",
                attrs: {
                  align: null,
                  indent: null,
                },
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "text_color",
                        attrs: {
                          color: "rgb(52, 58, 64)",
                        },
                      },
                      {
                        type: "text_background_color",
                        attrs: {
                          backgroundColor: "rgb(255, 255, 255)",
                        },
                      },
                    ],
                    text: "Ótimo: V0 ≥  24",
                  },
                ],
              },
            ],
          },
          {
            type: "list_item",
            content: [
              {
                type: "paragraph",
                attrs: {
                  align: null,
                  indent: null,
                },
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "text_color",
                        attrs: {
                          color: "rgb(52, 58, 64)",
                        },
                      },
                      {
                        type: "text_background_color",
                        attrs: {
                          backgroundColor: "rgb(255, 255, 255)",
                        },
                      },
                    ],
                    text: "Bom: 20 ≤ V0 < 24",
                  },
                ],
              },
            ],
          },
          {
            type: "list_item",
            content: [
              {
                type: "paragraph",
                attrs: {
                  align: null,
                  indent: null,
                },
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "text_color",
                        attrs: {
                          color: "rgb(52, 58, 64)",
                        },
                      },
                      {
                        type: "text_background_color",
                        attrs: {
                          backgroundColor: "rgb(255, 255, 255)",
                        },
                      },
                    ],
                    text: "Normal: 10 ≤ V0 < 20",
                  },
                ],
              },
            ],
          },
          {
            type: "list_item",
            content: [
              {
                type: "paragraph",
                attrs: {
                  align: null,
                  indent: null,
                },
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "text_color",
                        attrs: {
                          color: "rgb(52, 58, 64)",
                        },
                      },
                      {
                        type: "text_background_color",
                        attrs: {
                          backgroundColor: "rgb(255, 255, 255)",
                        },
                      },
                    ],
                    text: "Ruim: 4 ≤ V0 < 10",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "bullet_list",
        content: [
          {
            type: "list_item",
            content: [
              {
                type: "paragraph",
                attrs: {
                  align: null,
                  indent: null,
                },
                content: [
                  {
                    type: "text",
                    marks: [
                      {
                        type: "text_color",
                        attrs: {
                          color: "rgb(52, 58, 64)",
                        },
                      },
                      {
                        type: "text_background_color",
                        attrs: {
                          backgroundColor: "rgb(255, 255, 255)",
                        },
                      },
                    ],
                    text: "Péssimo: V0 < 4",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "rgb(52, 58, 64)",
                },
              },
              {
                type: "text_background_color",
                attrs: {
                  backgroundColor: "rgb(255, 255, 255)",
                },
              },
            ],
            text: "No caso analisado, qual seria a classificação do desempenho da empresa? Justifique sua resposta.",
          },
        ],
      },
    ],
  };

  newQuestion: Question = {
    topic: this.questionExample["content"].find(
      (item) => item["key"] === "topic"
    ).value,
    note: this.questionExample["content"].find((item) => item["key"] === "note")
      .value,
    figureSrc: this.questionExample["content"].find(
      (item) => item["key"] === "figureSrc"
    ).value,
    statement: JSON.parse(
      this.questionExample["content"].find((item) => item.key === "statement")
        .value
    ),
    alternatives: JSON.parse(
      this.questionExample["content"].find(
        (item) => item.key === "alternatives"
      ).value
    ),
    selectedAlternatives: new FormArray([]),
    discursive: this.questionExample["content"].find(
      (item) => item.key === "discursive"
    ).value as boolean,
  };
}
