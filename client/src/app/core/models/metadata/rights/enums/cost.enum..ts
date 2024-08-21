import { VocabularyType } from "../../util.model";

export class Cost extends VocabularyType {
    override value: CostEnum;

    getValueOptions(): Array<string> {
        return Object.values(CostEnum);
    }
}

enum CostEnum {
    yes = 'yes',
    no = 'no',
}