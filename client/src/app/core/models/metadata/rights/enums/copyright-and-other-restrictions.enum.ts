import { VocabularyType } from "../../util.model";

export class CopyrightAndOtherRestrictions extends VocabularyType {
    override value: CopyrightAndOtherRestrictionsEnum;

    getValues(): Array<string> {
        return Object.values(CopyrightAndOtherRestrictionsEnum);
    }
}

enum CopyrightAndOtherRestrictionsEnum {
    yes = 'yes',
    no = 'no',
}