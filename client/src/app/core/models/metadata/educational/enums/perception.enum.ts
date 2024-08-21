import { VocabularyType } from "../../util.model";

export class Perception extends VocabularyType {
    override source: string = 'BOAA';
    override value: PerceptionEnum;

    getValueOptions(): Array<string> {
        return Object.values(PerceptionEnum);
    }
}

enum PerceptionEnum {
    visual = 'visual',
    auditory = 'auditory',
    mixed = 'mixed',
    other = 'other',
}