import { FormArray } from "@angular/forms";
import { Question } from "src/app/components/reusable/question/question.model";

export class QuestionExample {
  questionExample: Object = {
    _id: {
      $oid: "67a1f41d62f96dae36fb513d",
    },
    type: "question",
    content: [
      {
        key: "topic",
        value: "Este exemplo de questão pode conter um título",
        _id: {
          $oid: "67a1f41d62f96dae36fb513e",
        },
      },
      {
        key: "note",
        value: "E também um subtítulo",
        _id: {
          $oid: "67a1f41d62f96dae36fb513f",
        },
      },
      {
        key: "figureSrc",
        value:
          "https://i.ibb.co/bgvFftmM/Exemplos-de-objetos-de-aprendizagem-14.png",
        _id: {
          $oid: "67a1f41d62f96dae36fb5140",
        },
      },
      {
        key: "statement",
        value:
          '{"type":"doc","content":[{"type":"blockquote","attrs":{"indent":null},"content":[{"type":"heading","attrs":{"level":2,"align":null,"indent":null},"content":[{"type":"text","text":"— É só isso?"}]}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"também tem um editor de texto para criar aquele enunciado bacana,"}]},{"type":"ordered_list","attrs":{"order":1},"content":[{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"dá pra criar listas,"}]}]},{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"colocar mais imagens,"}]}]},{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"pedir justificativa!"}]}]}]}]}]}]}',
        _id: {
          $oid: "67a1f41d62f96dae36fb5141",
        },
      },
      {
        key: "alternatives",
        value: '["também","tem","alternativas"]',
        _id: {
          $oid: "67a1f41d62f96dae36fb5142",
        },
      },
      {
        key: "discursive",
        value: "true",
        _id: {
          $oid: "67a1f41d62f96dae36fb5143",
        },
      },
    ],
    metadata: [
      {
        key: "Tópico",
        value: "Questão exemplo",
        _id: {
          $oid: "67a1f41d62f96dae36fb5144",
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
