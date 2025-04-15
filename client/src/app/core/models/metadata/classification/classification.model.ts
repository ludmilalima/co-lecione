import {
  CharacterStringType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { Purpose } from "./enums/purpose.enum";

export class Classification {
  nodeInfo: NodeInfo;
  purpose: Purpose = new Purpose(0, 1, "Purpose", LOMBaseSchema);
  taxonPath: TaxonPath = new TaxonPath();
  description: LangStringType = new LangStringType(
    0,
    1,
    "Description",
    LOMBaseSchema
  );
  keyword: LangStringType = new LangStringType(0, 40, "Keyword", LOMBaseSchema);

  constructor() {
    this.nodeInfo = new NodeInfo(0, 40, LOMBaseSchema.description, "root");
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

class TaxonPath {
  nodeInfo: NodeInfo;
  source: LangStringType = new LangStringType(0, 1, "Source", {
    name: "Taxon Path",
    description:
      "Um caminho taxonômico em um sistema de classificação específico.",
    subElements: [
      {
        name: "Source",
        description: "O nome do sistema de classificação.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        valueSpace: "Repertoire of ISO/IEC 10646-1:2000",
        dataType: "LangString (smallest permitted maximum: 1000 char)",
      },
    ],
  });
  taxon: Taxon = new Taxon();

  constructor() {
    const scheme: MetadataEntrySchema = {
      name: "Taxon Path",
      description:
        "Um caminho taxonômico em um sistema de classificação específico.",
      minCardinality: 1,
      maxCardinality: 15,
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

class Taxon {
  nodeInfo: NodeInfo;
  id: CharacterStringType = new CharacterStringType(0, 1, "Id", {
    name: "Taxon",
    description: "Um termo particular dentro de uma taxonomia.",
    subElements: [
      {
        name: "Id",
        description:
          "O identificador do táxon, como um número ou outra combinação fornecida pela fonte da taxonomia.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        valueSpace: "Repertoire of ISO/IEC 10646-1:2000",
        dataType: "CharacterString (smallest permitted maximum: 100 char)",
      },
    ],
  });
  entry: LangStringType = new LangStringType(0, 1, "Entry", {
    name: "Taxon",
    description: "Um termo particular dentro de uma taxonomia.",
    subElements: [
      {
        name: "Entry",
        description: "O rótulo textual do táxon.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "LangString (smallest permitted maximum: 500 char)",
      },
    ],
  });

  constructor() {
    const scheme: MetadataEntrySchema = {
      name: "Taxon",
      description: "Um termo particular dentro de uma taxonomia.",
      minCardinality: 1,
      maxCardinality: 15,
      order: "ordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
  }
}

const LOMBaseSchema: MetadataEntrySchema = {
  name: "Classification",
  description:
    "Esta categoria descreve onde este objeto de aprendizagem se encaixa dentro de um sistema de classificação específico.",
  minCardinality: 1,
  maxCardinality: 40,
  order: "unordered",
  subElements: [
    {
      name: "Purpose",
      description: "O propósito de classificar este objeto de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace:
        "discipline, idea, prerequisite, educational objective, accessibility restrictions, educational level, skill level, security level, competency",
      dataType: "Vocabulary (State)",
    },
    {
      name: "Taxon Path",
      description:
        "Um caminho taxonômico em um sistema de classificação específico.",
      minCardinality: 1,
      maxCardinality: 15,
      order: "unordered",
      subElements: [
        {
          name: "Source",
          description: "O nome do sistema de classificação.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          valueSpace: "Repertoire of ISO/IEC 10646-1:2000",
          dataType: "LangString (smallest permitted maximum: 1000 char)",
        },
        {
          name: "Taxon",
          description: "Um termo particular dentro de uma taxonomia.",
          minCardinality: 1,
          maxCardinality: 15,
          order: "ordered",
          subElements: [
            {
              name: "Id",
              description:
                "O identificador do táxon, como um número ou outra combinação fornecida pela fonte da taxonomia.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              valueSpace: "Repertoire of ISO/IEC 10646-1:2000",
              dataType:
                "CharacterString (smallest permitted maximum: 100 char)",
            },
            {
              name: "Entry",
              description: "O rótulo textual do táxon.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              dataType: "LangString (smallest permitted maximum: 500 char)",
            },
          ],
        },
      ],
    },
    {
      name: "Description",
      description: "O conteúdo textual que descreve esta classificação.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "LangString (smallest permitted maximum: 1000 char)",
    },
    {
      name: "Keyword",
      description:
        "Palavras-chave associadas à classificação deste objeto de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 10,
      order: "unspecified",
      dataType: "LangString (smallest permitted maximum: 1000 char)",
    },
  ],
};
