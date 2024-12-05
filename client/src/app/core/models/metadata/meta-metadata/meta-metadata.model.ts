import {
  CharacterStringType,
  IdentifierType,
  LanguageType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { ContributeMetaMetadata } from "./enums/contribute-meta-metadata.enum";

export class MetaMetadata {
  nodeInfo: NodeInfo;
  identifier: IdentifierType = new IdentifierType(
    0,
    10,
    "Identifier",
    LOMBaseSchema
  );
  contribute: ContributeMetaMetadata = new ContributeMetaMetadata(0, 10, 0, 10);
  metadataSchema: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Metadata Schema",
    LOMBaseSchema
  );
  language: LanguageType = new LanguageType(0, 1);

  constructor() {
    this.nodeInfo = new NodeInfo(0, 1, LOMBaseSchema.description, "root");
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Meta-Metadata",
  description:
    "Agrupa informações sobre a própria instância de metadados (em vez do objeto de aprendizagem que a instância descreve).",
  order: "unspecified",
  subElements: [
    {
      name: "Identifier",
      description:
        "Um rótulo globalmente único que identifica esta instância de metadados.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
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
      name: "Contribute",
      description:
        "Indica aqueles que contribuíram para esta instância de metadados e as funções que desempenharam.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "aggregate",
      subElements: [
        {
          name: "Role",
          description:
            "A função desempenhada pelo(s) responsável(is) por esta contribuição.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "Vocabulary (Enumerated)",
          valueSpace:
            '"creator", "validator", "editor", "publisher", "unknown"',
          examples: ["creator", "validator"],
        },
        {
          name: "Entity",
          description:
            "Uma pessoa ou organização envolvida nesta contribuição. Representada por uma string codificada, como um vCard.",
          minCardinality: 1,
          maxCardinality: 10,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "vCard format",
          examples: [
            "BEGIN:VCARD\nFN:John Doe\nORG:Metadata Organization\nEND:VCARD",
          ],
        },
        {
          name: "Date",
          description: "A data desta contribuição.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "DateTime",
          examples: ["2024-11-26"],
        },
      ],
    },
    {
      name: "Metadata Schema",
      description:
        "Identifica o esquema de metadados (ou padrões) em que esta instância de metadados se baseia.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "CharacterString",
      valueSpace: "CharacterString (máximo permitido: 1000 caracteres)",
      examples: ['"LOMv1.0"', '"Dublin Core"'],
    },
    {
      name: "Language",
      description:
        "Idioma primário usado para criar esta instância de metadados.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "CharacterString",
      valueSpace:
        "Language ID = Langcode ['-' Subcode]* (ISO 639-1988, ISO 3166-1:1997)",
      examples: ["en", "en-GB", "pt-BR"],
    },
  ],
};
