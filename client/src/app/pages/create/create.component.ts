import { Component, OnInit } from '@angular/core';
import { ObjectsService } from 'src/app/services/objects.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  contentCard = {
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
            "text": "Mr. Bean"
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
    content: this.contentCard,
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

  contentQuestion = {
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
                    "marks": [
                        {
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ],
                    "text": "Analisando as vendas de uma empresa, o gerente concluiu que o montante diário arrecadado, em milhar de real, poderia ser calculado pela expressão:"
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
                                    "type": "text_color",
                                    "attrs": {
                                        "color": "rgb(52, 58, 64)"
                                    }
                                },
                                {
                                    "type": "text_background_color",
                                    "attrs": {
                                        "backgroundColor": "rgb(255, 255, 255)"
                                    }
                                }
                            ],
                            "text": "V(x) = x^2/4 - 10x + 105,  "
                        }
                    ]
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
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ],
                    "text": "na qual os valores de x representam os dias do mês, variando de 1 a 30."
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
                    "type": "hard_break",
                    "marks": [
                        {
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ]
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ],
                    "text": "Um dos fatores para avaliar o desempenho mensal da empresa é verificar qual é o menor montante diário V"
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        },
                        {
                            "type": "sub"
                        }
                    ],
                    "text": "0"
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ],
                    "text": " arrecadado ao longo do mês e classificar o desempenho conforme as categorias apresentadas a seguir, em que as quantidades estão expressas em milhar de real."
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
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": "Ótimo: V"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        },
                                        {
                                            "type": "sub"
                                        }
                                    ],
                                    "text": "0"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": " ≥  24"
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
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": "Bom: 20 ≤ V"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        },
                                        {
                                            "type": "sub"
                                        }
                                    ],
                                    "text": "0"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": " < 24"
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
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": "Normal: 10 ≤ V"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        },
                                        {
                                            "type": "sub"
                                        }
                                    ],
                                    "text": "0"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": " < 20"
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
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": "Ruim: 4 ≤ V"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        },
                                        {
                                            "type": "sub"
                                        }
                                    ],
                                    "text": "0"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": " < 10"
                                }
                            ]
                        }
                    ]
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
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": "Péssimo: V"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        },
                                        {
                                            "type": "sub"
                                        }
                                    ],
                                    "text": "0"
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "text_color",
                                            "attrs": {
                                                "color": "rgb(52, 58, 64)"
                                            }
                                        },
                                        {
                                            "type": "text_background_color",
                                            "attrs": {
                                                "backgroundColor": "rgb(255, 255, 255)"
                                            }
                                        }
                                    ],
                                    "text": " < 4"
                                }
                            ]
                        }
                    ]
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
                            "type": "text_color",
                            "attrs": {
                                "color": "rgb(52, 58, 64)"
                            }
                        },
                        {
                            "type": "text_background_color",
                            "attrs": {
                                "backgroundColor": "rgb(255, 255, 255)"
                            }
                        }
                    ],
                    "text": "No caso analisado, qual seria a classificação do desempenho da empresa? Justifique sua resposta."
                }
            ]
        }
    ]
};

  question: any = {
    topic: 'Equação do segundo grau',
    note: 'Livro \'ABC matemático\', capítulo 6',
    figureSrc: 'data:image/jpeg;base64,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',
    statement: this.contentQuestion,
    alternatives: [
      'Ótimo',
      'Bom',
      'Normal',
      'Ruim',
      'Péssimo',
    ],
    discursive: true,
  };

  constructor(
    public objectsService: ObjectsService,
  ) { }

  ngOnInit(): void {
    
  }
}
