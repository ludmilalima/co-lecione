import {
  IdentifierType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { Kind } from "./enums/kind.enum";

export class Relation {
  nodeInfo: NodeInfo;
  kind: Kind = new Kind(0, 1, "Kind", LOMBaseSchema);
  resource: ResourceType = new ResourceType();

  constructor() {
    this.nodeInfo = new NodeInfo(
      LOMBaseSchema.minCardinality,
      LOMBaseSchema.maxCardinality,
      LOMBaseSchema.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

class ResourceType {
  nodeInfo: NodeInfo;
  identifier: IdentifierType = new IdentifierType(0, 10, "Identifier", {
    name: "Resource",
    description: "Identificação do objeto de aprendizagem relacionado.",
    subElements: [
      {
        name: "Identifier",
        description:
          "Um identificador globalmente exclusivo que identifica o objeto de aprendizagem alvo.",
        minCardinality: 1,
        maxCardinality: 10,
        order: "unspecified",
      },
    ],
  });
  description: LangStringType = new LangStringType(0, 10, "Description", {
    name: "Resource",
    description: "Identificação do objeto de aprendizagem relacionado.",
    subElements: [
      {
        name: "Description",
        description:
          "Uma descrição textual sobre o objeto de aprendizagem relacionado.",
        minCardinality: 0,
        maxCardinality: 1,
        order: "unspecified",
        valueSpace: "--",
        dataType: "LangString",
        examples: [
          "pt: 'Este objeto está relacionado ao curso de matemática básica.'",
        ],
      },
    ],
  });

  constructor() {
    let metadataSchema: MetadataEntrySchema = {
      name: "Relation",
      description:
        "Esta categoria define o relacionamento entre este objeto de aprendizagem e outros objetos de aprendizagem, se houver. Para definir vários relacionamentos, pode haver várias instâncias desta categoria. Se houver mais de um alvo de objeto de aprendizagem, cada alvo deve ter uma nova instância de relacionamento.",
      minCardinality: 0,
      maxCardinality: 100,
      order: "unordered",
      dataType: "container",
    };
    this.nodeInfo = new NodeInfo(
      metadataSchema.minCardinality,
      metadataSchema.maxCardinality,
      metadataSchema.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = metadataSchema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Relation",
  description:
    "Esta categoria define o relacionamento entre este objeto de aprendizagem e outros objetos de aprendizagem, se houver. Para definir vários relacionamentos, pode haver várias instâncias desta categoria. Se houver mais de um alvo de objeto de aprendizagem, cada alvo deve ter uma nova instância de relacionamento.",
  minCardinality: 0,
  maxCardinality: 100,
  order: "unordered",
  dataType: "container",
  subElements: [
    {
      name: "Kind",
      description: "Tipo de relacionamento com outro objeto de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace:
        "LOMv1.0 (is part of, has part, references, is referenced by, is based on, is version of, etc.)",
      dataType: "Vocabulary",
      examples: ["'is part of'", "'references'"],
    },
    {
      name: "Resource",
      description: "Identificação do objeto de aprendizagem relacionado.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "--",
      dataType: "Structured",
      examples: [],
      subElements: [
        {
          name: "Identifier",
          description: "Identificador do objeto de aprendizagem relacionado.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          valueSpace: "--",
          dataType: "Structured",
          examples: ["Catalog: 'ISBN', Entry: '123-456-789'"],
          subElements: [
            {
              name: "Catalog",
              description: "O nome do sistema de catalogação.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              valueSpace: "--",
              dataType: "CharacterString",
              examples: ["'ISBN'", "'URI'"],
            },
            {
              name: "Entry",
              description:
                "A entrada ou valor do identificador dentro do catálogo especificado.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              valueSpace: "--",
              dataType: "CharacterString",
              examples: [
                "'123-456-789'",
                "'https://www.example.com/learning-object'",
              ],
            },
          ],
        },
        {
          name: "Description",
          description:
            "Uma descrição textual sobre o objeto de aprendizagem relacionado.",
          minCardinality: 0,
          maxCardinality: 1,
          order: "unspecified",
          valueSpace: "--",
          dataType: "LangString",
          examples: ["en: 'This object is related to a basic math course.'"],
        },
      ],
    },
  ],
};
