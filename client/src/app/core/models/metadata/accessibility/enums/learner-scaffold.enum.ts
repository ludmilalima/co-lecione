import { VocabularyType } from "../../util.model";

export class LearnerScaffold extends VocabularyType {
    override source = 'OBAA';
    override value = LearnerScaffoldEnum;

    getValueOptions(): Array<string> {
        return Object.values(LearnerScaffoldEnum);
    }
}

enum LearnerScaffoldEnum {
    dictionary = 'dictionary',
    calculator = 'calculator',
    noteTaking = 'noteTaking',
    peerInteraction = 'peerInteraction',
    abacus = 'abacus',
    thesaurus = 'thesaurus',
    spellChecker = 'spellChecker',
    mindMapping = 'mindMapping',
    software = 'software',
    outlineTool = 'outlineTool',
}