import { VocabularyType } from "../../util.model";

export class IntendedEndUserRole extends VocabularyType {
    override value: IntendedEndUserRoleEnum;

    getValueOptions(): Array<string> {
        return Object.values(IntendedEndUserRoleEnum);
    }
}

enum IntendedEndUserRoleEnum {
    teacher = 'teacher',
    author = 'author',
    learner = 'learner',
    manager = 'manager',
}