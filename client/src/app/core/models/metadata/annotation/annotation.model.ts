import { DateTimeValidatorService } from "../services/date-time-validator.service";
import { LangStringValidatorService } from "../services/lang-string-validator.service";
import {
  CharacterStringType,
  DateTimeType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";

export class Annotation {
  nodeInfo: NodeInfo;
  entity: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Entity",
    LOMBaseSchema
  );
  date: DateTimeType = new DateTimeType(0, 1, "Date", LOMBaseSchema);
  description: LangStringType = new LangStringType(
    0,
    1,
    "Description",
    LOMBaseSchema
  );

  private dateTimeValidatorService: DateTimeValidatorService;
  private langStringValidatorService: LangStringValidatorService;

  setDate(date: DateTimeType): void {
    if (
      !this.dateTimeValidatorService.isValidDateTime(date.dateTime.toString())
    ) {
      throw new Error('Invalid DateTime "dateTime" string');
    }
    if (
      !this.langStringValidatorService.validateLangString(
        date.description.langString[0]
      )
    ) {
      throw new Error('Invalid DataTime "description" string');
    } else {
      this.date = date;
    }
  }

  setDescription(description: LangStringType): void {
    if (
      !this.langStringValidatorService.validateLangString(
        description.langString[0]
      )
    ) {
      throw new Error("Invalid LangString string");
    } else {
      this.description = description;
    }
  }

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

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Annotation",
  description:
    "Esta categoria fornece comentários sobre o uso educacional deste objeto de aprendizagem e informações sobre quando e por quem os comentários foram criados. Esta categoria permite que educadores compartilhem suas avaliações de objetos de aprendizagem, sugestões de uso, etc.",
  minCardinality: 0,
  maxCardinality: 30,
  order: "unordered",
  valueSpace: "--",
  dataType: "--",
  examples: [],
  subElements: [
    {
      name: "Entity",
      description:
        "Entidade (ou seja, pessoa ou organização) que criou esta anotação.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "vCard, as defined by IMC vCard 3.0 (RFC 2425, RFC 2426)",
      dataType: "CharacterString",
      examples: [
        `"BEGIN:VCARD\nFN:Joe Friday\nTEL:+1-919-555-7878\nTITLE:Area Administrator, Assistant\nEMAIL;TYPE=INTERNET:jfriday@host.com\nEND:VCARD"`,
      ],
    },
    {
      name: "Date",
      description: "Data em que esta anotação foi criada.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "--",
      dataType: "DateTime",
      examples: ["'2001-08-23'"],
    },
    {
      name: "Description",
      description: "O conteúdo desta anotação.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "--",
      dataType: "LangString",
      examples: [
        `"en", "I have used this video clip with my students. They really enjoy being able to zoom in on specific features of the painting. Make sure they have a broadband connection or the experience becomes too cumbersome to be educationally interesting."`,
      ],
    },
  ],
};
