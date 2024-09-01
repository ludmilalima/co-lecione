import { VocabularyType } from "../../util.model";

export class LearningContentType extends VocabularyType {
    override source: string = 'BOAA'
    override value = LearningContentTypeEnum;

    override getValueOptions(): Array<string> {
        return Object.values(LearningContentTypeEnum);
    }
}

enum LearningContentTypeEnum {
    fatual = 'fatual',
    contentual = 'contentual',
    procedimental = 'procedimental',
    atitudinal = 'atitudinal'
}