import { VocabularyType } from "../../util.model";

export class LearningContentType extends VocabularyType {
    override source: string = 'BOAA'
    override value = LearningContentTypeEnum;

    override getValueOptions(): Array<string> {
        return Object.keys(this.value).filter(value => isNaN(Number(value)));
    }
}

enum LearningContentTypeEnum {
    fatual = 'fatual',
    contentual = 'contentual',
    procedimental = 'procedimental',
    atitudinal = 'atitudinal'
}