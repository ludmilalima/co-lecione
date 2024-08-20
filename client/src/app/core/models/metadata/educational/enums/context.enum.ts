import { VocabularyType } from "../../util.model";

export class Context extends VocabularyType {
    override value: ContextEnum;

    getContexts(): Array<string> {
        return Object.values(ContextEnum);
    }
}

enum ContextEnum {
    school = 'school',
    higherEducation = 'higher education',
    training = 'training',
    other = 'other'
}