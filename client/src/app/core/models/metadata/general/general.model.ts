import {
  IdentifierType,
  LangStringType,
  LanguageType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { AggregationLevel } from "./enums/aggregation-level.enum";
import { Structure } from "./enums/structure.enum";

export class General {
  nodeInfo: NodeInfo;
  identifier: IdentifierType = new IdentifierType(
    0,
    10,
    "Identifier",
    LOMBaseSchema
  );
  title: LangStringType = new LangStringType(0, 1, "Title", LOMBaseSchema);
  language: LanguageType = new LanguageType(0, 10, "Language", LOMBaseSchema);
  description: LangStringType = new LangStringType(
    0,
    10,
    "Description",
    LOMBaseSchema
  );
  keyword: LangStringType = new LangStringType(0, 10, "Keyword", LOMBaseSchema);
  coverage: LangStringType = new LangStringType(
    0,
    10,
    "Coverage",
    LOMBaseSchema
  );
  structure: Structure = new Structure(0, 1, "Structure", LOMBaseSchema);
  aggregationLevel: AggregationLevel = new AggregationLevel(
    0,
    1,
    "Aggregation Level",
    LOMBaseSchema
  );

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      1,
      LOMBaseSchema.description,
      "root"
    );

    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "General",
  description:
    "Agrupa as informações gerais que descrevem o objeto de aprendizagem como um todo.",
  minCardinality: 1,
  maxCardinality: 1,
  order: "unspecified",
  subElements: [
    {
      name: "Identifier",
      description:
        "Um rótulo globalmente único que identifica este objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unspecified",
      dataType: "aggregate",
      subElements: [
        {
          name: "Catalog",
          description:
            "O nome ou designação do esquema de identificação ou catalogação para esta entrada.",
          minCardinality: 1,
          maxCardinality: 1,
          dataType: "CharacterString",
          valueSpace:
            "ISO/IEC 10646-1:2000 (máximo permitido: 1000 caracteres)",
          examples: ['"ISBN"', '"URI"'],
        },
        {
          name: "Entry",
          description:
            "O valor do identificador dentro do esquema de identificação ou catalogação.",
          minCardinality: 1,
          maxCardinality: 1,
          dataType: "CharacterString",
          valueSpace:
            "ISO/IEC 10646-1:2000 (máximo permitido: 1000 caracteres)",
          examples: ['"2-7342-0318"', '"https://www.ieee.org/documents/1234"'],
        },
      ],
    },
    {
      name: "Title",
      description: "Nome dado a este objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 1000 caracteres)",
      examples: ['("en", "The life and works of Leonardo da Vinci")'],
    },
    {
      name: "Language",
      description:
        "O idioma humano primário ou idiomas usados neste objeto de aprendizagem para se comunicar com o usuário pretendido.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "CharacterString",
      valueSpace:
        "ID de Idioma = Langcode ['-' Subcode]* (ISO 639-1988, ISO 3166-1:1997)",
      examples: ["en", "en-GB", "de", "fr-CA"],
    },
    {
      name: "Description",
      description:
        "Uma descrição textual do conteúdo deste objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 2000 caracteres)",
      examples: [
        '("en", "A brief overview of Leonardo da Vinci\'s artistic works.")',
      ],
    },
    {
      name: "Keyword",
      description:
        "Uma palavra-chave ou frase que descreve o tópico deste objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 1000 caracteres)",
      examples: ['("en", "Mona Lisa")'],
    },
    {
      name: "Coverage",
      description:
        "O tempo, cultura, geografia ou região a que este objeto de aprendizagem se aplica.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 1000 caracteres)",
      examples: ['("en", "16th century France")'],
    },
    {
      name: "Structure",
      description:
        "Estrutura organizacional subjacente deste objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      dataType: "Vocabulary (State)",
      valueSpace:
        '"atomic", "collection", "networked", "hierarchical", "linear"',
      examples: ["atomic", "collection"],
    },
    {
      name: "Aggregation Level",
      description:
        "O nível de granularidade funcional deste objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      dataType: "Vocabulary (Enumerated)",
      valueSpace: "1, 2, 3, 4",
      examples: ["1 (menor nível)", "4 (maior nível)"],
    },
  ],
};
