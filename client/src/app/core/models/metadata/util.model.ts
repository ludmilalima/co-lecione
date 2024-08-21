export class LangStringType {
    minOccurs: number;
    maxOccurs: number;
    langString: Array<{
        content: string;
        language: IsoLanguageCodeEnum;
    }>;

    constructor(minOccurs: number, maxOccurs: number) {
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.langString = [];
    }

    getIsoLanguageCodes(): Array<string> {
        return Object.values(IsoLanguageCodeEnum);
    }
}

export class CharacterStringType {
    minOccurs: number;
    maxOccurs: number;
    content: Array<string>;

    constructor(minOccurs: number, maxOccurs: number) {
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.content = [];
    }
}

export class DateTimeType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    dateTime: string;
    description: LangStringType = new LangStringType(0, 1);
}

export class DurationType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    duration: string;
    description: LangStringType = new LangStringType(0, 1);
}

export abstract class VocabularyType {
    minOccurs: number;
    maxOccurs: number;
    source: string = 'LOMv1.0';
    value: any;

    constructor(minOccurs: number, maxOccurs: number) {
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
    }

    abstract getValueOptions(): Array<string>;
}

export class IdentifierType {
    minOccurs: number;
    maxOccurs: number;
    identifier: Array<{
        catalog: string;
        entry: string;
    }>;

    constructor(minOccurs: number, maxOccurs: number) {
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.identifier = [];
    }
}

export class ContributeType {
    minOccurs: number;
    maxOccurs: number;
    role: any;
    entity: CharacterStringType;
    date: DateTimeType;

    constructor(minOccurs: number, maxOccurs: number, minEntity: number, maxEntity: number) {
        this.minOccurs = minOccurs;
        this.maxOccurs = maxOccurs;
        this.entity = new CharacterStringType(minEntity, maxEntity);
    }
}

export class LanguageType extends CharacterStringType {
    override content: Array<IsoLanguageCodeEnum>;

    getIsoLanguageCodes(): Array<string> {
        return Object.values(IsoLanguageCodeEnum);
    }
}

enum IsoLanguageCodeEnum {
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
    Zulu = "zu"
}
