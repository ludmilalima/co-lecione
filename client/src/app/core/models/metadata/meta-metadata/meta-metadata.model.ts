import { CharacterStringType, IdentifierType, IsoLanguageCodeEnum, LanguageType } from "../util.model";
import { ContributeMetaMetadata } from "./enums/contribute-meta-metadata.enum";

export class MetaMetadata {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    identifier: IdentifierType = new IdentifierType(0, 10);
    contribute: ContributeMetaMetadata = new ContributeMetaMetadata(0, 10, 0, 10);
    metadataSchema: CharacterStringType = new CharacterStringType(0, 1);
    language: LanguageType = new LanguageType(0, 1);

    constructor() {
        this.metadataSchema.content.push("LOMv1.0");
    }
}