import { VocabularyType } from "../../util.model";

export class SpecificType extends VocabularyType {
    override source: string = 'OBAA';
    override value: SpecificType;

    getValueOptions(): Array<string> {
        return Object.values(SpecificTypeEnum);
    }
}

enum SpecificTypeEnum {
    browser = 'browser',
    operatingSystem = 'operating system',
    middleware = 'middleware',
}