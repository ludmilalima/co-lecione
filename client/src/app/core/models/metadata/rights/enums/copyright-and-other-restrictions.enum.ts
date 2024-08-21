import { VocabularyType } from "../../util.model";

export class CopyrightAndOtherRestrictions extends VocabularyType {
    override value: CopyrightAndOtherRestrictionsEnum;

    getValueOptions(): Array<string> {
        return Object.values(CopyrightAndOtherRestrictionsEnum);
    }
}

enum CopyrightAndOtherRestrictionsEnum {
    yes = 'yes',
    no = 'no',
}