import { Card } from "src/app/components/reusable/cards/card.model";

export class CardExample {
  cardExample: Object = {
    _id: {
      $oid: "67a1f27962f96dae36fb5021",
    },
    type: "card",
    content: [
      {
        key: "headerImageSrc",
        value:
          "https://i.ibb.co/S49jnyTv/Exemplos-de-objetos-de-aprendizagem-10.png",
        _id: {
          $oid: "67a1f27962f96dae36fb5022",
        },
      },
      {
        key: "title",
        value: "Este exemplo de cartão contém um título",
        _id: {
          $oid: "67a1f27962f96dae36fb5023",
        },
      },
      {
        key: "subtitle",
        value: "E também um subtítulo",
        _id: {
          $oid: "67a1f27962f96dae36fb5024",
        },
      },
      {
        key: "content",
        value:
          '{"type":"doc","content":[{"type":"heading","attrs":{"level":2,"align":null,"indent":null},"content":[{"type":"text","text":"O que mais esse cartão pode ter?"}]},{"type":"blockquote","attrs":{"indent":null},"content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"— Tem um editor de texto embutido."}]}]},{"type":"bullet_list","content":[{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Onde você pode:"}]},{"type":"ordered_list","attrs":{"order":1},"content":[{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Criar listas,"}]}]},{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Estilizar texto,"}]}]},{"type":"list_item","content":[{"type":"paragraph","attrs":{"align":null,"indent":null},"content":[{"type":"text","text":"Inserir mais imagens."}]}]}]}]}]}]}',
        _id: {
          $oid: "67a1f27962f96dae36fb5025",
        },
      },
      {
        key: "actionTitle",
        value: "Também pode ter um link!",
        _id: {
          $oid: "67a1f27962f96dae36fb5026",
        },
      },
      {
        key: "actionLink",
        value:
          "https://i.ibb.co/6RCsp4FJ/Exemplos-de-objetos-de-aprendizagem-13.png",
        _id: {
          $oid: "67a1f27962f96dae36fb5027",
        },
      },
    ],
    metadata: [
      {
        key: "Tópico",
        value: "Exemplo cartão",
        _id: {
          $oid: "67a1f27962f96dae36fb5028",
        },
      },
    ],
    __v: 0,
  };

  //   old card example
  contentCard = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "Hello",
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
            text: "This is editable text. ",
          },
          {
            type: "text",
            marks: [
              {
                type: "text_color",
                attrs: {
                  color: "#d93f0b",
                },
              },
            ],
            text: "You can focus it and start typing",
          },
          {
            type: "text",
            text: ".",
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
                type: "code",
              },
            ],
            text: "code block",
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
                    type: "strong",
                  },
                ],
                text: "Lorem Ipsum",
              },
              {
                type: "text",
                text: " is ",
              },
              {
                type: "text",
                marks: [
                  {
                    type: "text_background_color",
                    attrs: {
                      backgroundColor: "#fbca04",
                    },
                  },
                ],
                text: "simply dummy",
              },
              {
                type: "text",
                text: " text of the printing and typesetting industry. ",
              },
              {
                type: "text",
                marks: [
                  {
                    type: "em",
                  },
                ],
                text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              },
              {
                type: "text",
                text: ", when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 2,
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "The code block is a code editor",
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
            text: "This editor has been wired up to render code blocks as instances of the ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://codemirror.net",
                  title: "https://codemirror.net",
                  target: "_blank",
                },
              },
            ],
            text: "CodeMirror",
          },
          {
            type: "text",
            text: " code editor, which provides ",
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://en.wikipedia.org",
                  title: "",
                  target: "_blank",
                },
              },
            ],
            text: "syntax highlighting",
          },
          {
            type: "text",
            text: ", auto-indentation, and similar.",
          },
        ],
      },
      {
        type: "code_block",
        content: [
          {
            type: "text",
            text: "function max(a, b) {\n  return a > b ? a : b\n}",
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
            text: "The content of the code editor is kept in sync with the content of the code block in the rich text editor, so that it is as if you're directly editing the outer document, using a more convenient interface.",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 4,
          align: "center",
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "Mr. Bean",
          },
        ],
      },
      {
        type: "paragraph",
        attrs: {
          align: "center",
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "The image is resizable. Include ",
          },
          {
            type: "text",
            marks: [
              {
                type: "strong",
              },
            ],
            text: "image",
          },
          {
            type: "text",
            text: " plugin to enable image resizing",
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
          align: "center",
          indent: null,
        },
        content: [
          {
            type: "image",
            attrs: {
              src: "https://wallpapercave.com/wp/wp2318909.png",
              alt: "Bean",
              title: "Mr. Bean",
              width: "98px",
            },
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 3,
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "Bullet list",
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
                        type: "strong",
                      },
                    ],
                    text: "Lorem Ipsum",
                  },
                  {
                    type: "text",
                    text: " is simply dummy text of the printing and typesetting industry",
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
                            text: "(",
                          },
                          {
                            type: "text",
                            marks: [
                              {
                                type: "strong",
                              },
                            ],
                            text: "depth 1",
                          },
                          {
                            type: "text",
                            text: ") It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
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
                                    text: "(",
                                  },
                                  {
                                    type: "text",
                                    marks: [
                                      {
                                        type: "strong",
                                      },
                                    ],
                                    text: "depth 2",
                                  },
                                  {
                                    type: "text",
                                    text: ") The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
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
                    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
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
                    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        attrs: {
          level: 4,
          align: null,
          indent: null,
        },
        content: [
          {
            type: "text",
            text: "Ordered List",
          },
        ],
      },
      {
        type: "ordered_list",
        attrs: {
          order: 1,
        },
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
                        type: "strong",
                      },
                    ],
                    text: "Lorem Ipsum",
                  },
                  {
                    type: "text",
                    text: " is simply dummy text of the printing and typesetting industry",
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
                    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
                  },
                ],
              },
              {
                type: "ordered_list",
                attrs: {
                  order: 1,
                },
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
                            text: "(",
                          },
                          {
                            type: "text",
                            marks: [
                              {
                                type: "strong",
                              },
                            ],
                            text: "depth 1",
                          },
                          {
                            type: "text",
                            text: ") It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                          },
                        ],
                      },
                      {
                        type: "ordered_list",
                        attrs: {
                          order: 1,
                        },
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
                                    text: "(",
                                  },
                                  {
                                    type: "text",
                                    marks: [
                                      {
                                        type: "strong",
                                      },
                                    ],
                                    text: "depth 2",
                                  },
                                  {
                                    type: "text",
                                    text: ") The chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
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
                    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  newCard: Card = {
    // avatarSrc: this.cardExample["content"].find(
    //   (element) => element.key === "avatarSrc"
    // ).value,
    headerImageSrc: this.cardExample["content"].find(
      (element) => element.key === "headerImageSrc"
    ).value,
    title: this.cardExample["content"].find(
      (element) => element.key === "title"
    ).value,
    subtitle: this.cardExample["content"].find(
      (element) => element.key === "subtitle"
    ).value,
    content: JSON.parse(
      this.cardExample["content"].find((element) => element.key === "content")
        .value
    ),
    actionTitle: this.cardExample["content"].find(
      (element) => element.key === "actionTitle"
    ).value,
    actionLink: this.cardExample["content"].find(
      (element) => element.key === "actionLink"
    ).value,
  };
}
