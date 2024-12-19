export class LangStringType {
  nodeInfo: NodeInfo;
  langString: Array<{
    content: string;
    language: IsoLanguageCodeEnum;
  }>;

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo = new NodeInfo(
        minOccurs,
        maxOccurs,
        "A string of characters in one or more languages.",
        "langString-type"
      );
    } else {
      this.nodeInfo = new NodeInfo(
        localMetadataSchema.minCardinality,
        localMetadataSchema.maxCardinality,
        localMetadataSchema.description,
        "langString-type"
      );
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }

    this.nodeInfo.optionsList = this.getIsoLanguageCodes();
    this.langString = [];
  }

  getIsoLanguageCodes(): Array<string> {
    return Object.values(IsoLanguageCodeEnum);
  }
}

export class CharacterStringType {
  nodeInfo: NodeInfo;
  content: Array<string>;

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo = new NodeInfo(
        minOccurs,
        maxOccurs,
        "A string of characters.",
        "characterString-type"
      );
    } else {
      this.nodeInfo = new NodeInfo(
        localMetadataSchema.minCardinality,
        localMetadataSchema.maxCardinality,
        localMetadataSchema.description,
        "characterString-type"
      );
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }
    this.content = [];
  }
}

export class BooleanType {
  nodeInfo: NodeInfo;
  content: boolean;

  constructor(
    minOccurs?: number,
    maxOccurs?: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo = new NodeInfo(
        minOccurs,
        maxOccurs,
        "A string of characters.",
        "boolean-type"
      );
    } else {
      this.nodeInfo = new NodeInfo(
        localMetadataSchema.minCardinality,
        localMetadataSchema.maxCardinality,
        localMetadataSchema.description,
        "boolean-type"
      );
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }
  }
}

export class DateTimeType {
  nodeInfo: NodeInfo;
  dateTime: CharacterStringType = new CharacterStringType(0, 1, "DateTime", {
    name: "DateTime",
    description: "A point in time with an accuracy of at least one second.",
    subElements: [
      {
        name: "DateTime",
        description: "Um ponto no tempo com precisão de pelo menos um segundo.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        valueSpace:
          "YYYY[-MM[-DD[Thh[:mm[:ss[.s[TZD]]]]]]] where:\n" +
          "YYYY = four-digit year (>= 0001)\n" +
          "MM = two-digit month (01 through 12 where 01 = January, etc.)\n" +
          "DD = two-digit day of month (01 through 31, depending on value of month and year)\n" +
          "hh = two digits of hour (00 through 23) (am/pm NOT allowed)\n" +
          "mm = two digits of minute (00 through 59)\n" +
          "ss = two digits of second (00 through 59)\n" +
          "s = one or more digits representing a decimal fraction of a second\n" +
          "TZD = time zone designator ('Z' for UTC or ±hh:mm or ±hhmm)\n" +
          "At least the four-digit year must be present. If additional parts of the DateTime are included, the character lexical representation must follow the specified format.",
        dataType: "CharacterString",
        examples: [
          `"1999-01-11" (January 11th, 1999)`,
          `"1979-07-16T19:20+01:00" (July 16th, 1979, at 7:20 p.m. with a time offset of 1 h with respect to UTC)`,
        ],
      },
    ],
  });
  description: LangStringType = new LangStringType(0, 1, "Description", {
    name: "Description",
    description: "A description of the date.",
    subElements: [
      {
        name: "Description",
        description: "Descrição da data.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "LangString",
        examples: [`"en", "circa 1300 BCE"`],
      },
    ],
  });

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name: string,
    metadataSchema: MetadataEntrySchema
  ) {
    let scheme = metadataSchema.subElements.find((item) => item.name == name);
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "dateTime-type"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

export class DurationType {
  nodeInfo: NodeInfo;
  duration: string;
  description: LangStringType = new LangStringType(0, 1);

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name: string,
    metadataSchema: MetadataEntrySchema
  ) {
    let scheme = metadataSchema.subElements.find((item) => item.name == name);

    this.nodeInfo = new NodeInfo(
      minOccurs,
      maxOccurs,
      scheme.description,
      "duration-type"
    );

    this.nodeInfo.metadataEntrySchema = scheme;
    this.nodeInfo.description = scheme.description;
  }
}

export abstract class VocabularyType {
  nodeInfo: NodeInfo;
  source: string = "LOMv1.0";
  value: any;

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo = new NodeInfo(
        minOccurs,
        maxOccurs,
        "A value from a controlled vocabulary."
      );
    } else {
      this.nodeInfo = new NodeInfo(
        localMetadataSchema.minCardinality,
        localMetadataSchema.maxCardinality,
        localMetadataSchema.description
      );
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }

    this.setType();
    this.nodeInfo.optionsList = this.getValueOptions();
  }

  setType() {
    if (this.nodeInfo.maxOccurs > 1) {
      this.nodeInfo.nodeType = "multi-select";
    } else {
      this.nodeInfo.nodeType = "single-select";
    }
  }

  abstract getValueOptions(): Array<string>;
}

export class IdentifierType {
  nodeInfo: NodeInfo;
  identifier: Array<{
    catalog: string;
    entry: string;
  }>;

  constructor(
    minOccurs?: number,
    maxOccurs?: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo = new NodeInfo(
        minOccurs,
        maxOccurs,
        "A unique identifier for the resource.",
        "identifier-type"
      );
    } else {
      this.nodeInfo = new NodeInfo(
        localMetadataSchema.minCardinality,
        localMetadataSchema.maxCardinality,
        localMetadataSchema.description,
        "identifier-type"
      );
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }

    this.identifier = [];
  }
}

export class ContributeType {
  nodeInfo: NodeInfo;
  role: any;
  entity: CharacterStringType;
  date: DateTimeType;

  constructor(
    minOccurs: number,
    maxOccurs: number,
    minEntity: number,
    maxEntity: number
  ) {
    this.nodeInfo = new NodeInfo(
      minOccurs,
      maxOccurs,
      "A person or organization that contributed to the resource.",
      "contribute-type"
    );
    this.entity = new CharacterStringType(minEntity, maxEntity);
  }
}

export class LanguageType extends CharacterStringType {
  override content: Array<IsoLanguageCodeEnum>;

  constructor(
    minOccurs: number,
    maxOccurs: number,
    name?: string,
    metadataSchema?: MetadataEntrySchema
  ) {
    super(minOccurs, maxOccurs);

    let localMetadataSchema = undefined;
    if (name != undefined && metadataSchema != undefined) {
      localMetadataSchema = metadataSchema.subElements.find(
        (item) => item.name == name
      );
    }

    if (localMetadataSchema == undefined) {
      this.nodeInfo.nodeType = "language-type";
      this.nodeInfo.description = "A language used in the resource.";
    } else {
      this.nodeInfo.nodeType = "language-type";
      this.nodeInfo.description = localMetadataSchema.description;
      this.nodeInfo.metadataEntrySchema = localMetadataSchema;
    }
  }

  getIsoLanguageCodes(): Array<string> {
    return Object.values(IsoLanguageCodeEnum);
  }
}

export enum IsoLanguageCodeEnum {
  Abkhazian = "ab",
  Afar = "aa",
  Afrikaans = "af",
  Akan = "ak",
  Albanian = "sq",
  Amharic = "am",
  Arabic = "ar",
  Aragonese = "an",
  Armenian = "hy",
  Assamese = "as",
  Avaric = "av",
  Avestan = "ae",
  Aymara = "ay",
  Azerbaijani = "az",
  Bambara = "bm",
  Bashkir = "ba",
  Basque = "eu",
  Belarusian = "be",
  Bengali = "bn",
  Bihari = "bh",
  Bislama = "bi",
  Bosnian = "bs",
  Breton = "br",
  Bulgarian = "bg",
  Burmese = "my",
  Catalan = "ca",
  Chamorro = "ch",
  Chechen = "ce",
  Chichewa = "ny",
  Chinese = "zh",
  ChineseSimplified = "zh-Hans",
  ChineseTraditional = "zh-Hant",
  Chuvash = "cv",
  Cornish = "kw",
  Corsican = "co",
  Cree = "cr",
  Croatian = "hr",
  Czech = "cs",
  Danish = "da",
  Divehi = "dv",
  Dutch = "nl",
  Dzongkha = "dz",
  English = "en",
  Esperanto = "eo",
  Estonian = "et",
  Ewe = "ee",
  Faroese = "fo",
  Fijian = "fj",
  Finnish = "fi",
  French = "fr",
  Fula = "ff",
  Galician = "gl",
  ScottishGaelic = "gd",
  ManxGaelic = "gv",
  Georgian = "ka",
  German = "de",
  Greek = "el",
  Greenlandic = "kl",
  Guarani = "gn",
  Gujarati = "gu",
  HaitianCreole = "ht",
  Hausa = "ha",
  Hebrew = "he",
  Herero = "hz",
  Hindi = "hi",
  HiriMotu = "ho",
  Hungarian = "hu",
  Icelandic = "is",
  Ido = "io",
  Igbo = "ig",
  Indonesian = "id",
  Interlingua = "ia",
  Interlingue = "ie",
  Inuktitut = "iu",
  Inupiak = "ik",
  Irish = "ga",
  Italian = "it",
  Japanese = "ja",
  Javanese = "jv",
  Kannada = "kn",
  Kanuri = "kr",
  Kashmiri = "ks",
  Kazakh = "kk",
  Khmer = "km",
  Kikuyu = "ki",
  Kinyarwanda = "rw",
  Kirundi = "rn",
  Kyrgyz = "ky",
  Komi = "kv",
  Kongo = "kg",
  Korean = "ko",
  Kurdish = "ku",
  Kwanyama = "kj",
  Lao = "lo",
  Latin = "la",
  Latvian = "lv",
  Limburgish = "li",
  Lingala = "ln",
  Lithuanian = "lt",
  LugaKatanga = "lu",
  Luganda = "lg",
  Luxembourgish = "lb",
  Macedonian = "mk",
  Malagasy = "mg",
  Malay = "ms",
  Malayalam = "ml",
  Maltese = "mt",
  Maori = "mi",
  Marathi = "mr",
  Marshallese = "mh",
  Moldavian = "mo",
  Mongolian = "mn",
  Nauru = "na",
  Navajo = "nv",
  Ndonga = "ng",
  NorthernNdebele = "nd",
  Nepali = "ne",
  Norwegian = "no",
  NorwegianBokmal = "nb",
  NorwegianNynorsk = "nn",
  Nuosu = "ii",
  Occitan = "oc",
  Ojibwe = "oj",
  OldChurchSlavonic = "cu",
  Oriya = "or",
  Oromo = "om",
  Ossetian = "os",
  Pali = "pi",
  Pashto = "ps",
  Persian = "fa",
  Polish = "pl",
  Portuguese = "pt",
  Punjabi = "pa",
  Quechua = "qu",
  Romansh = "rm",
  Romanian = "ro",
  Russian = "ru",
  Sami = "se",
  Samoan = "sm",
  Sango = "sg",
  Sanskrit = "sa",
  Serbian = "sr",
  SerboCroatian = "sh",
  Sesotho = "st",
  Setswana = "tn",
  Shona = "sn",
  Sindhi = "sd",
  Sinhalese = "si",
  Siswati = "ss",
  Slovak = "sk",
  Slovenian = "sl",
  Somali = "so",
  SouthernNdebele = "nr",
  Spanish = "es",
  Sundanese = "su",
  Swahili = "sw",
  Swedish = "sv",
  Tagalog = "tl",
  Tahitian = "ty",
  Tajik = "tg",
  Tamil = "ta",
  Tatar = "tt",
  Telugu = "te",
  Thai = "th",
  Tibetan = "bo",
  Tigrinya = "ti",
  Tonga = "to",
  Tsonga = "ts",
  Turkish = "tr",
  Turkmen = "tk",
  Twi = "tw",
  Uyghur = "ug",
  Ukrainian = "uk",
  Urdu = "ur",
  Uzbek = "uz",
  Venda = "ve",
  Vietnamese = "vi",
  Volapuk = "vo",
  Wallon = "wa",
  Welsh = "cy",
  Wolof = "wo",
  WesternFrisian = "fy",
  Xhosa = "xh",
  Yiddish = "yi",
  Yoruba = "yo",
  Zhuang = "za",
  Zulu = "zu",
}

export class NodeInfo {
  key?: string;
  description?: string;
  minOccurs?: number;
  maxOccurs?: number;
  nodeType?: string;
  optionsList?: Array<string>;
  metadataEntrySchema?: MetadataEntrySchema;

  constructor(
    minOccurs?: number,
    maxOccurs?: number,
    description?: string,
    nodeType?: string
  ) {
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.description = description;
    this.nodeType = nodeType;
  }
}

export class MetadataEntrySchema {
  name: string;
  description: string;
  minCardinality?: number;
  maxCardinality?: number;
  order?: "ordered" | "unordered" | "unspecified";
  valueSpace?: string;
  dataType?: string;
  examples?: Array<string>;
  subElements?: Array<MetadataEntrySchema>;
}

export abstract class ArrayInfo {
  abstract childType: object;
}
