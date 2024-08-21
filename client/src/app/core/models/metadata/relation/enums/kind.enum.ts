import { VocabularyType } from "../../util.model";

export class Kind extends VocabularyType {
    override value: KindEnum;

    getValueOptions(): Array<string> {
        return Object.values(KindEnum);
    }
}

enum KindEnum {
    IsPartOf = "is part of",
    HasPart = "has part",
    IsVersionOf = "is version of",
    HasVersion = "has version",
    IsFormatOf = "is format of",
    HasFormat = "has format",
    References = "references",
    IsReferencedBy = "is referenced by",
    IsBasedOn = "is based on",
    IsBasisFor = "is basis for",
    Requires = "requires",
    IsRequiredBy = "is required by",
}