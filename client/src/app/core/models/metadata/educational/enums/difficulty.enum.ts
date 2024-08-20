import { VocabularyType } from "../../util.model";

export class Difficulty extends VocabularyType {
    override value: DifficultyEnum;

    getDifficulties(): Array<string> {
        return Object.values(DifficultyEnum);
    }
}

enum DifficultyEnum {
    veryEasy = 'very easy',
    easy = 'easy',
    medium = 'medium',
    difficult = 'difficult',
    veryDifficult = 'very difficult'
}