import { Card } from "src/app/components/reusable/cards/card.model";

export class CardExample {

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

    newCard: Card = {
        avatarSrc: 'https://cdn0.iconfinder.com/data/icons/dog-avatars/192/avatar-dog-saint-bernard-puppy-512.png',
        headerImageSrc: 'https://files.secure.website/wscfus/10567870/25715020/happy-golden-w1200-o.jpg',
        title: 'Este será o título do card!',
        subtitle: 'Este será o subtítulo do card.',
        content: JSON.stringify(this.contentCard),
        actionTitle: 'Saiba mais!',
        actionLink: 'https://www.google.com'
    };
}