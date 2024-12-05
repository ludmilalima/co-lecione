import { MetadataEntrySchema, VocabularyType } from "../../util.model";

export class Type extends VocabularyType {
  override value: TypeEnum;

  override getValueOptions(): Array<string> {
    return Object.values(TypeEnum);
  }

  constructor(minCardinality: number, maxCardinality: number) {
    super(minCardinality, maxCardinality);

    let typeScheme: MetadataEntrySchema = {
      name: "Type",
      description: "O tipo de requisito.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary (Enumerated)",
      valueSpace: '"operating system", "browser", "software", "hardware"',
      examples: ['"operating system"', '"browser"'],
    };
    this.nodeInfo.metadataEntrySchema = typeScheme;
    this.nodeInfo.description = typeScheme.description;
  }
}

enum TypeEnum {
  operatingSystem = "operating system",
  browser = "browser",
}
