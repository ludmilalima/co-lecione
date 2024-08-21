import { VocabularyType } from "../../util.model";

export class Reciprocity extends VocabularyType {
    override source: string = 'BOAA';
    override value: ReciprocityEnum;

    getValueOptions(): Array<string> {
        return Object.values(ReciprocityEnum);
    }
}

enum ReciprocityEnum {
    one_one = '1-1',
    one_many = '1-n',
    many_many = 'n-m',
}