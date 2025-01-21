import {
  ArrayInfo,
  BooleanType,
  CharacterStringType,
  LanguageType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { AudioDescription } from "./enums/audio-description.enum";
import { ColorAvoidance } from "./enums/color-avoidance.enum";
import { LearnerScaffold } from "./enums/learner-scaffold.enum";
import { SignLanguage } from "./enums/sign-language.enum";

export class Accessibility {
  nodeInfo: NodeInfo;
  hasVisual: BooleanType = new BooleanType(0, 1, "hasVisual", LOMBaseSchema);
  hasAuditory: BooleanType = new BooleanType(
    0,
    1,
    "hasAuditory",
    LOMBaseSchema
  );
  hasText: BooleanType = new BooleanType(0, 1, "hasText", LOMBaseSchema);
  hasTactile: BooleanType = new BooleanType(0, 1, "hasTactile", LOMBaseSchema);
  earlStatement: EarlStatementType = new EarlStatementType();
  equivalentResource: EquivalentResourceType = new EquivalentResourceType();

  constructor() {
    const scheme: MetadataEntrySchema = {
      name: "Accessibility",
      description:
        "Acessibilidade é a habilidade do ambiente de aprendizagem de se adaptar às necessidades de cada usuário/estudante. Ela é determinada pela flexibilidade de um ambiente educacional (no que diz respeito à apresentação, métodos de controle, modalidade de acesso e suporte para os estudantes e a disponibilidade de conteúdos e atividades alternativas mas equivalentes.",
      minCardinality: 0,
      maxCardinality: 1,
    };

    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class EarlStatementType extends ArrayInfo {
  override childType: EarlStatement = new EarlStatement();
  nodeInfo: NodeInfo;
  earlStatement: Array<EarlStatement> = [];

  constructor() {
    super();
    const scheme: MetadataEntrySchema = {
      name: "Earl Statement",
      description:
        "Indicação se existem informações fornecidas na Linguagem EARL (Evaluation and Report Language) do W3C sobre propriedades do OA.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class EarlStatement {
  displayTransformability: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Display transformability",
    {
      name: "earlStatement",
      description:
        "Indicação se existem informações fornecidas na Linguagem EARL (Evaluation and Report Language) do W3C sobre propriedades do OA.",
      subElements: [
        {
          name: "Display transformability",
          description:
            "Relato EARL sobre as características de transformabilidade dos recursos referenciados.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unspecified",
          valueSpace: "URI",
          dataType: "string",
        },
      ],
    }
  );
  controlFlexibility: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Control flexibility",
    {
      name: "earlStatement",
      description:
        "Indicação se existem informações fornecidas na Linguagem EARL (Evaluation and Report Language) do W3C sobre propriedades do OA.",

      subElements: [
        {
          name: "Control flexibility",
          description:
            "Relato EARL sobre as características de controle e flexibilidade dos recursos referenciados.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unspecified",
          valueSpace: "URI",
          dataType: "string",
        },
      ],
    }
  );
}

class EquivalentResourceType extends ArrayInfo {
  override childType: EquivalentResource = new EquivalentResource();
  nodeInfo: NodeInfo;
  equivalentResource: Array<EquivalentResource> = [];

  constructor() {
    super();
    const scheme: MetadataEntrySchema = {
      name: "Equivalent Resource",
      description:
        "Aponta para um recurso equivalente (metadados) dos recursos descritos ou partes dos mesmos.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      valueSpace: "URI",
      dataType: "string",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class EquivalentResource {
  isSupplementary: BooleanType = new BooleanType(0, 1, "isSupplementary", {
    name: "equivalentResource",
    description:
      "Aponta para um recurso equivalente (metadados) dos recursos descritos ou partes dos mesmos.",
    subElements: [
      {
        name: "isSupplementary",
        description:
          "Indica se o recurso equivalente é suplementar para OA ativo.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        valueSpace: "True, False",
        dataType: "boolean",
        examples: ["False"],
      },
    ],
  });
  learnerScaffold: LearnerScaffold = new LearnerScaffold(
    0,
    40,
    "Learner Scaffold",
    {
      name: "equivalentResource",
      description:
        "Aponta para um recurso equivalente (metadados) dos recursos descritos ou partes dos mesmos.",
      subElements: [
        {
          name: "Learner Scaffold",
          description:
            "Facilidades de acesso ao aprendizado, descrevendo recursos como ferramentas de apoio.",
          minCardinality: 0,
          maxCardinality: 40,
          order: "unordered",
          valueSpace:
            "dictionary, calculator, noteTaking, peerInteraction, abacus, thesaurus, spellChecker, homophoneChecker, mindMappingSoftware, outlineTool",
          dataType: "Vocabulary (Enumerated)",
          examples: ["thesaurus"],
        },
      ],
    }
  );
  alternativesToVisual: AlternativesToVisualType =
    new AlternativesToVisualType();
  alternativesToText: AlternativesToTextType = new AlternativesToTextType();
  alternativesToAuditory: AlternativesToAuditoryType =
    new AlternativesToAuditoryType();
}

class AlternativesToVisualType extends ArrayInfo {
  override childType: AlternativesToVisual = new AlternativesToVisual();
  nodeInfo: NodeInfo;
  alternativesToVisual: Array<AlternativesToVisual> = [];

  constructor() {
    super();

    const scheme: MetadataEntrySchema = {
      name: "alternativesToVisual",
      description:
        "Apresentação de conteúdo diferenciado como alternativa visual.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class AlternativesToVisual {
  audioDescription: AudioDescription = new AudioDescription(
    0,
    1,
    "Audio description",
    {
      name: "alternativesToVisual",
      description:
        "Apresentação de conteúdo diferenciado como alternativa visual.",
      subElements: [
        {
          name: "Audio description",
          description:
            "Apresentação do conteúdo diferenciado sendo uma alternativa em áudio.",
          dataType: "string",
          minCardinality: 0,
          maxCardinality: 40,
          examples: ["standard"],
        },
      ],
    }
  );
  language: LanguageType = new LanguageType(0, 1, "Language", {
    name: "alternativesToVisual",
    description:
      "Apresentação de conteúdo diferenciado como alternativa visual.",
    subElements: [
      {
        name: "Language",
        description: "Linguagem usada para a descrição em áudio.",
        dataType: "string",
        minCardinality: 0,
        maxCardinality: 1,
        examples: ["en"],
      },
    ],
  });
  altTextLang: LanguageType = new LanguageType(0, 1, "Alt text lang", {
    name: "alternativesToVisual",
    description:
      "Apresentação de conteúdo diferenciado como alternativa visual.",
    subElements: [
      {
        name: "Alt text lang",
        description:
          "Indica que o recurso contém texto alternativo na linguagem especificada.",
        dataType: "string",
        minCardinality: 0,
        maxCardinality: 1,
        examples: ["en"],
      },
    ],
  });
  longDescriptiomLang: LanguageType = new LanguageType(
    0,
    1,
    "Long description lang",
    {
      name: "alternativesToVisual",
      description:
        "Apresentação de conteúdo diferenciado como alternativa visual.",
      subElements: [
        {
          name: "Long description lang",
          description:
            "Texto alternativo longo na linguagem especificada para o recurso principal.",
          dataType: "string",
          minCardinality: 0,
          maxCardinality: 1,
          examples: ["en"],
        },
      ],
    }
  );
  colorAvoidance: ColorAvoidance = new ColorAvoidance(
    0,
    40,
    "Color avoidance",
    {
      name: "alternativesToVisual",
      description:
        "Apresentação de conteúdo diferenciado como alternativa visual.",
      subElements: [
        {
          name: "Color avoidance",
          description:
            "Descreve como as cores devem ser utilizadas para acessibilidade visual.",
          dataType: "string",
          minCardinality: 0,
          maxCardinality: 40,
          examples: ["avoidRedBlack"],
        },
      ],
    }
  );
}

class AlternativesToTextType extends ArrayInfo {
  override childType: AlternativesToText = new AlternativesToText();
  nodeInfo: NodeInfo;
  alternativesToText: Array<AlternativesToText> = [];

  constructor() {
    super();
    const scheme: MetadataEntrySchema = {
      name: "Alternatives to text",
      description: "Conteúdos textuais presentes em diferentes modalidades.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class AlternativesToText {
  graphicAlternative: BooleanType = new BooleanType(
    0,
    1,
    "Graphic alternative",
    {
      name: "alternativesToText",
      description: "Conteúdos textuais presentes em diferentes modalidades.",
      subElements: [
        {
          name: "Graphic alternative",
          description:
            "Alternativas gráficas ou visuais para textos no conteúdo principal.",
          dataType: "boolean",
          minCardinality: 0,
          maxCardinality: 1,
          examples: ["False"],
        },
      ],
    }
  );
  signLanguage: SignLanguage = new SignLanguage(0, 1, "Sign language", {
    name: "alternativesToText",
    description: "Conteúdos textuais presentes em diferentes modalidades.",
    subElements: [
      {
        name: "Sign language",
        description:
          "Conteúdos traduzidos para linguagem de sinais no dialeto especificado.",
        dataType: "string",
        minCardinality: 0,
        maxCardinality: 40,
        examples: ["Brazilian-BRA"],
      },
    ],
  });
}

class AlternativesToAuditoryType extends ArrayInfo {
  override childType: AlternativesToAuditory = new AlternativesToAuditory();
  nodeInfo: NodeInfo;
  alternativesToAuditory: Array<AlternativesToAuditory> = [];

  constructor() {
    super();
    const scheme: MetadataEntrySchema = {
      name: "Alternatives to auditory",
      description:
        "Informações alternativas ao conteúdo auditivo para diferentes tipos de usuários.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class AlternativesToAuditory {
  captionType: CaptionType = new CaptionType();
}

class CaptionType extends ArrayInfo {
  override childType: Caption = new Caption();
  nodeInfo: NodeInfo;
  caption: Array<Caption> = [];

  constructor() {
    super();
    let scheme: MetadataEntrySchema = {
      name: "captionType",
      description:
        "Indica que o recurso contém legendas com referência direta ao conteúdo principal.",
      minCardinality: 0,
      maxCardinality: 40,
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class Caption {
  language: LanguageType = new LanguageType(0, 1, "Language", {
    name: "captionType",
    description:
      "Indica que o recurso contém legendas com referência direta ao conteúdo principal.",
    subElements: [
      {
        name: "Language",
        description: "Linguagem utilizada na legenda.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["en"],
      },
    ],
  });
  captionRate: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Caption rate",
    {
      name: "captionType",
      description:
        "Indica que o recurso contém legendas com referência direta ao conteúdo principal.",
      subElements: [
        {
          name: "Caption rate",
          description: "Taxa de velocidade da legenda.",
          dataType: "CharacterString",
          minCardinality: 0,
          maxCardinality: 1,
          examples: ["120"],
        },
      ],
    }
  );
}

const LOMBaseSchema: MetadataEntrySchema = {
  name: "Accessibility",
  description:
    "Acessibilidade é a habilidade do ambiente de aprendizagem de se adaptar às necessidades de cada usuário/estudante. Ela é determinada pela flexibilidade do ambiente educacional na apresentação, métodos de controle, modalidades de acesso e disponibilidade de conteúdos e atividades alternativas, mas equivalentes.",
  minCardinality: 1,
  maxCardinality: 1,
  order: "unspecified",
  subElements: [
    {
      name: "hasVisual",
      description:
        "Indica se o objeto de aprendizagem contém informações visuais.",
      dataType: "boolean",
      minCardinality: 1,
      maxCardinality: 1,
      examples: ["True"],
    },
    {
      name: "hasAudititory",
      description:
        "Indica se o objeto de aprendizagem contém informações audíveis.",
      dataType: "boolean",
      minCardinality: 1,
      maxCardinality: 1,
      examples: ["False"],
    },
    {
      name: "hasText",
      description:
        "Indica se o objeto de aprendizagem contém informações textuais.",
      dataType: "boolean",
      minCardinality: 1,
      maxCardinality: 1,
      examples: ["True"],
    },
    {
      name: "hasTactile",
      description:
        "Indica se o objeto de aprendizagem contém informações táteis (hápticas).",
      dataType: "boolean",
      minCardinality: 1,
      maxCardinality: 1,
      examples: ["True"],
    },
    {
      name: "earlStatement",
      description:
        "Indica se existem declarações EARL (Evaluation and Report Language) fornecidas sobre as propriedades do objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      subElements: [
        {
          name: "displayTransformability",
          description:
            "Declaração EARL sobre as características de transformabilidade dos recursos referenciados.",
          dataType: "URI",
          minCardinality: 0,
          maxCardinality: 1,
        },
        {
          name: "controlFlexibility",
          description:
            "Declaração EARL sobre as características de controle e flexibilidade dos recursos referenciados.",
          dataType: "URI",
          minCardinality: 0,
          maxCardinality: 1,
        },
      ],
    },
    {
      name: "equivalentResource",
      description:
        "Aponta para um recurso equivalente (metadados) dos recursos descritos ou partes dos mesmos.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      subElements: [
        {
          name: "isSupplementary",
          description:
            "Indica se o recurso equivalente é suplementar ao objeto de aprendizagem ativo.",
          dataType: "boolean",
          minCardinality: 1,
          maxCardinality: 1,
          examples: ["False"],
        },
        {
          name: "learnerScaffold",
          description:
            "Facilidades de acesso ao aprendizado, descrevendo ferramentas de apoio (dicionário, calculadora, etc).",
          dataType: "string",
          minCardinality: 0,
          maxCardinality: 40,
          examples: ["thesaurus"],
        },
        {
          name: "alternativesToVisual",
          description:
            "Apresentação de conteúdo diferenciado como alternativa visual.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unordered",
          subElements: [
            {
              name: "audioDescription",
              description:
                "Apresentação do conteúdo diferenciado sendo uma alternativa em áudio.",
              dataType: "string",
              minCardinality: 0,
              maxCardinality: 40,
              examples: ["standard"],
              subElements: [
                {
                  name: "language",
                  description: "Linguagem usada para a descrição em áudio.",
                  dataType: "string",
                  minCardinality: 0,
                  maxCardinality: 1,
                  examples: ["en"],
                },
                {
                  name: "altTextLang",
                  description:
                    "Indica que o recurso contém texto alternativo na linguagem especificada.",
                  dataType: "string",
                  minCardinality: 0,
                  maxCardinality: 1,
                  examples: ["en"],
                },
                {
                  name: "longDescriptionLang",
                  description:
                    "Texto alternativo longo na linguagem especificada para o recurso principal.",
                  dataType: "string",
                  minCardinality: 0,
                  maxCardinality: 1,
                  examples: ["en"],
                },
                {
                  name: "colorAvoidance",
                  description:
                    "Descreve como as cores devem ser utilizadas para acessibilidade visual.",
                  dataType: "string",
                  minCardinality: 0,
                  maxCardinality: 40,
                  examples: ["avoidRedBlack"],
                },
              ],
            },
          ],
        },
        {
          name: "alternativesToText",
          description:
            "Conteúdos textuais presentes em diferentes modalidades.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unordered",
          subElements: [
            {
              name: "graphicAlternative",
              description:
                "Alternativas gráficas ou visuais para textos no conteúdo principal.",
              dataType: "boolean",
              minCardinality: 0,
              maxCardinality: 1,
              examples: ["False"],
            },
            {
              name: "signLanguage",
              description:
                "Conteúdos traduzidos para linguagem de sinais no dialeto especificado.",
              dataType: "string",
              minCardinality: 0,
              maxCardinality: 40,
              examples: ["Brazilian-BRA"],
            },
          ],
        },
        {
          name: "alternativesToAuditory",
          description:
            "Informações alternativas ao conteúdo auditivo para diferentes tipos de usuários.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unordered",
          subElements: [
            {
              name: "captionType",
              description:
                "Indica que o recurso contém legendas com referência direta ao conteúdo principal.",
              minCardinality: 0,
              maxCardinality: 40,
              subElements: [
                {
                  name: "language",
                  description: "Linguagem utilizada na legenda.",
                  dataType: "string",
                  minCardinality: 1,
                  maxCardinality: 1,
                  examples: ["en"],
                },
                {
                  name: "captionRate",
                  description: "Taxa de velocidade da legenda.",
                  dataType: "integer",
                  minCardinality: 0,
                  maxCardinality: 1,
                  examples: ["120"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
