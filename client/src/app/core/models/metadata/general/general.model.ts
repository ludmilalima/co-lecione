import { IsoLanguageCode } from "../accessibility/enums/iso-language-code.enum";
import { IdentifierType, LangStringType, VocabularyType } from "../util.model";
import { AggregationLevel } from "./enums/aggregation-level.enum";
import { Structure } from "./enums/structure.enum";

export class General {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    identifier: IdentifierType = new IdentifierType(0, 10);
    title: LangStringType = new LangStringType(0, 1);
    language: IsoLanguageCode = new IsoLanguageCode(0, 10);
    description: LangStringType = new LangStringType(0, 10);
    keyword: LangStringType = new LangStringType(0, 10);
    coverage: LangStringType = new LangStringType(0, 10);
    structure: Structure = new Structure(0, 1);
    aggregationLevel: AggregationLevel = new AggregationLevel(0, 1);
}