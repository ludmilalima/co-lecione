import { VocabularyType } from "../../util.model";

export class DidacticStrategy extends VocabularyType {
    override source: string = 'BOAA';
    override value: DidacticStrategyEnum;

    getValueOptions(): Array<string> {
        return Object.values(DidacticStrategyEnum);
    }
}

enum DidacticStrategyEnum {
    modelConstruction = 'model construction',
    challenge = 'challenge',
    hypothesisAndTest = 'hypothesis and test',
    development = 'development',
    caseStudy = 'case study',
    questionAndAnswering = 'question and answering',
    problemSolving = 'problem solving'
}