import { VocabularyType } from "../../util.model";

export class LearningResourceType extends VocabularyType {
    override value: LearningResource;

    getValueOptions(): Array<string> {
        return Object.values(LearningResource);
    }
}

enum LearningResource {
    exercise = 'exercise',
    simulation = 'simulation',
    questionnaire = 'questionnaire',
    diagram = 'diagram',
    figure = 'figure',
    graph = 'graph',
    index = 'index',
    slide = 'slide',
    table = 'table',
    narrativeText = 'narrative text',
    exam = 'exam',
    experiment = 'experiment',
    problemStatement = 'problem statement',
    selfAssessment = 'self assessment',
    lecture = 'lecture',
}