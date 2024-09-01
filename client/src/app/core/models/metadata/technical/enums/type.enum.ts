import { VocabularyType } from "../../util.model";

export class Type extends VocabularyType {
    override value: TypeEnum;

    override getValueOptions(): Array<string> {
        return Object.values(TypeEnum);
    }
}

enum TypeEnum {
    operatingSystem = 'operating system',
    browser = 'browser',
}