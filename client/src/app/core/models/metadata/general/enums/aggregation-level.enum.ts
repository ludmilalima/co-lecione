import { VocabularyType } from "../../util.model";

export class AggregationLevel extends VocabularyType {
    override value: AggregationLevelValue;
}

enum AggregationLevelValue {
    first = "1",
    second = "2",
    third = "3",
    fourth = "4",
}