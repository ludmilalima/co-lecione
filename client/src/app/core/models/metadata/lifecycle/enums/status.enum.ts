import { VocabularyType } from "../../util.model";

export class Status extends VocabularyType {
    override value: StatusValue;
}

enum StatusValue {
    draft = 'draft',
    final = 'final',
    revised = 'revised',
    unavailable = 'unavailable',
}