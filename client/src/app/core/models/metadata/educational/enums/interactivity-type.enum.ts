import { VocabularyType } from "../../util.model"

export class InteractivityType extends VocabularyType {
    override value: InteractivityTypeEnum;

    getInteractivityTypes(): Array<string> {
        return Object.values(InteractivityTypeEnum);
    }
}

enum InteractivityTypeEnum {
    active = 'active',
    expositive = 'expositive',
    mixed = 'mixed',
}