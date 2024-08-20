import { VocabularyType } from "../../util.model";

export class SemanticDensity extends VocabularyType {
    override value: SemanticDensityEnum;

    getSemanticDensities(): Array<string> {
        return Object.values(SemanticDensityEnum);
    }
}

enum SemanticDensityEnum {
    veryLow = 'very low',
    low = 'low',
    medium = 'medium',
    high = 'high',
    veryHigh = 'very high',
}