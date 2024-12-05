import { MetadataEntrySchema, VocabularyType } from "../../util.model";

export class Name extends VocabularyType {
  override value: NameEnum;

  override getValueOptions(): Array<string> {
    return Object.values(NameEnum);
  }

  constructor(minCardinality: number, maxCardinality: number) {
    super(minCardinality, maxCardinality);

    let nameScheme: MetadataEntrySchema = {
      name: "Name",
      description: "O nome do requisito.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "CharacterString",
      valueSpace: "Defined according to the Type.",
    };
    this.nodeInfo.metadataEntrySchema = nameScheme;
    this.nodeInfo.description = nameScheme.description;
  }
}

enum NameEnum {
  pcDos = "pc-dos",
  msWindows = "ms-windows",
  macos = "macos",
  unix = "unix",
  multiOs = "multi-os",
  none = "none",
  any = "any",
  netscapeCommunicator = "netscape-communicator",
  msInternetExplorer = "ms-internet-explorer",
  opera = "opera",
  amaya = "amaya",
}

export class OperatingSystems extends VocabularyType {
  override value: OperatingSystemsEnum;

  override getValueOptions(): Array<string> {
    return Object.values(OperatingSystemsEnum);
  }

  constructor(minCardinality: number, maxCardinality: number) {
    super(minCardinality, maxCardinality);

    let nameScheme: MetadataEntrySchema = {
      name: "Name",
      description: "O nome do requisito.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "CharacterString",
      valueSpace: "Defined according to the Type.",
    };
    this.nodeInfo.metadataEntrySchema = nameScheme;
    this.nodeInfo.description = nameScheme.description;
  }
}

enum OperatingSystemsEnum {
  pcDos = "pc-dos",
  msWindows = "ms-windows",
  macos = "macos",
  unix = "unix",
  multiOs = "multi-os",
  none = "none",
}

export class Browsers extends VocabularyType {
  override value: BrowsersEnum;

  override getValueOptions(): Array<string> {
    return Object.values(BrowsersEnum);
  }

  constructor(minCardinality: number, maxCardinality: number) {
    super(minCardinality, maxCardinality);

    let nameScheme: MetadataEntrySchema = {
      name: "Name",
      description: "O nome do requisito.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "CharacterString",
      valueSpace: "Defined according to the Type.",
    };
    this.nodeInfo.metadataEntrySchema = nameScheme;
    this.nodeInfo.description = nameScheme.description;
  }
}

enum BrowsersEnum {
  any = "any",
  netscapeCommunicator = "netscape-communicator",
  msInternetExplorer = "ms-internet-explorer",
  opera = "opera",
  amaya = "amaya",
}
