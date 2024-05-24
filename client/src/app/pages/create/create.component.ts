import { Component, OnInit } from '@angular/core';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  content = {
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
            "text": "Hello"
          }
        ]
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
            "text": "This is editable text. "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "text_color",
                "attrs": {
                  "color": "#d93f0b"
                }
              }
            ],
            "text": "You can focus it and start typing"
          },
          {
            "type": "text",
            "text": "."
          }
        ]
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
                "type": "code"
              }
            ],
            "text": "code block"
          }
        ]
      },
      {
        "type": "blockquote",
        "attrs": {
          "indent": null
        },
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
                "marks": [
                  {
                    "type": "strong"
                  }
                ],
                "text": "Lorem Ipsum"
              },
              {
                "type": "text",
                "text": " is "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "text_background_color",
                    "attrs": {
                      "backgroundColor": "#fbca04"
                    }
                  }
                ],
                "text": "simply dummy"
              },
              {
                "type": "text",
                "text": " text of the printing and typesetting industry. "
              },
              {
                "type": "text",
                "marks": [
                  {
                    "type": "em"
                  }
                ],
                "text": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              },
              {
                "type": "text",
                "text": ", when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2,
          "align": null,
          "indent": null
        },
        "content": [
          {
            "type": "text",
            "text": "The code block is a code editor"
          }
        ]
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
            "text": "This editor has been wired up to render code blocks as instances of the "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://codemirror.net",
                  "title": "https://codemirror.net",
                  "target": "_blank"
                }
              }
            ],
            "text": "CodeMirror"
          },
          {
            "type": "text",
            "text": " code editor, which provides "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://en.wikipedia.org",
                  "title": "",
                  "target": "_blank"
                }
              }
            ],
            "text": "syntax highlighting"
          },
          {
            "type": "text",
            "text": ", auto-indentation, and similar."
          }
        ]
      },
      {
        "type": "code_block",
        "content": [
          {
            "type": "text",
            "text": "function max(a, b) {\n  return a > b ? a : b\n}"
          }
        ]
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
            "text": "The content of the code editor is kept in sync with the content of the code block in the rich text editor, so that it is as if you're directly editing the outer document, using a more convenient interface."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 4,
          "align": "center",
          "indent": null
        },
        "content": [
          {
            "type": "text",
            "text": "Mr. Beani"
          }
        ]
      },
      {
        "type": "paragraph",
        "attrs": {
          "align": "center",
          "indent": null
        },
        "content": [
          {
            "type": "text",
            "text": "The image is resizable. Include "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "strong"
              }
            ],
            "text": "image"
          },
          {
            "type": "text",
            "text": " plugin to enable image resizing"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3,
          "align": "center",
          "indent": null
        },
        "content": [
          {
            "type": "image",
            "attrs": {
              "src": "https://wallpapercave.com/wp/wp2318909.png",
              "alt": "Bean",
              "title": "Mr. Bean",
              "width": "98px"
            }
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3,
          "align": null,
          "indent": null
        },
        "content": [
          {
            "type": "text",
            "text": "Bullet list"
          }
        ]
      },
      {
        "type": "bullet_list",
        "content": [
          {
            "type": "list_item",
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
                    "marks": [
                      {
                        "type": "strong"
                      }
                    ],
                    "text": "Lorem Ipsum"
                  },
                  {
                    "type": "text",
                    "text": " is simply dummy text of the printing and typesetting industry"
                  }
                ]
              },
              {
                "type": "bullet_list",
                "content": [
                  {
                    "type": "list_item",
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
                            "text": "("
                          },
                          {
                            "type": "text",
                            "marks": [
                              {
                                "type": "strong"
                              }
                            ],
                            "text": "depth 1"
                          },
                          {
                            "type": "text",
                            "text": ") It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                          }
                        ]
                      },
                      {
                        "type": "bullet_list",
                        "content": [
                          {
                            "type": "list_item",
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
                                    "text": "("
                                  },
                                  {
                                    "type": "text",
                                    "marks": [
                                      {
                                        "type": "strong"
                                      }
                                    ],
                                    "text": "depth 2"
                                  },
                                  {
                                    "type": "text",
                                    "text": ") The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "list_item",
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
                    "text": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"
                  }
                ]
              }
            ]
          },
          {
            "type": "list_item",
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
                    "text": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 4,
          "align": null,
          "indent": null
        },
        "content": [
          {
            "type": "text",
            "text": "Ordered List"
          }
        ]
      },
      {
        "type": "ordered_list",
        "attrs": {
          "order": 1
        },
        "content": [
          {
            "type": "list_item",
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
                    "marks": [
                      {
                        "type": "strong"
                      }
                    ],
                    "text": "Lorem Ipsum"
                  },
                  {
                    "type": "text",
                    "text": " is simply dummy text of the printing and typesetting industry"
                  }
                ]
              }
            ]
          },
          {
            "type": "list_item",
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
                    "text": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable"
                  }
                ]
              },
              {
                "type": "ordered_list",
                "attrs": {
                  "order": 1
                },
                "content": [
                  {
                    "type": "list_item",
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
                            "text": "("
                          },
                          {
                            "type": "text",
                            "marks": [
                              {
                                "type": "strong"
                              }
                            ],
                            "text": "depth 1"
                          },
                          {
                            "type": "text",
                            "text": ") It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                          }
                        ]
                      },
                      {
                        "type": "ordered_list",
                        "attrs": {
                          "order": 1
                        },
                        "content": [
                          {
                            "type": "list_item",
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
                                    "text": "("
                                  },
                                  {
                                    "type": "text",
                                    "marks": [
                                      {
                                        "type": "strong"
                                      }
                                    ],
                                    "text": "depth 2"
                                  },
                                  {
                                    "type": "text",
                                    "text": ") The chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "list_item",
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
                    "text": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };


  card: any = {
    avatarSrc: 'https://www.happyway.com.au/cdn/shop/articles/Healthy-Eating-Tips.jpg?v=1674535125',
    headerImageSrc: 'https://imageio.forbes.com/specials-images/imageserve/63b6dbc1b64d967f5ee8003d/Healthy-eating--exercising--weight-and-blood-pressure-control/960x0.jpg?format=jpg&width=960',
    title: 'Este será o título do card!',
    subtitle: 'Este será o subtítulo do card.',
    content: this.content,
    action: 'Criar!',
    resourceType: 'Card',
    metadata: [
      {
        key: 'Author',
        value: 'Talita'
      },
      {
        key: 'CreationDate',
        value: '2024-05-01'
      }
    ]
  };

  constructor(
    public objectsService: ObjectsService,
  ) { }

  ngOnInit(): void {
    
  }
}
