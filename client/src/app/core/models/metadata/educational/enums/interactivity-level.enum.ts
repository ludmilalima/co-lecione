import { VocabularyType } from "../../util.model";

export class InteractivityLevel extends VocabularyType {
    override value: InteractivityLevelEnum;

    getValueOptions(): Array<string> {
        return Object.values(InteractivityLevelEnum);
    }
}

enum InteractivityLevelEnum {
    veryLow = 'very low',
    low = 'low',
    medium = 'medium',
    high = 'high',
    veryHigh = 'very high',
}