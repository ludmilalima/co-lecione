import { VocabularyType } from "../../util.model";

export class Status extends VocabularyType {
    override value: StatusValue;

    getValueOptions(): Array<string> {
        return Object.values(StatusValue);
    }
}

enum StatusValue {
    draft = 'draft',
    final = 'final',
    revised = 'revised',
    unavailable = 'unavailable',
}