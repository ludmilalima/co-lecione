import { VocabularyType } from "../../util.model";

export class AudioDescription extends VocabularyType {
    override source = 'OBAA';
    override value = AudioDescriptionEnum;

    getValueOptions(): Array<string> {
        return Object.values(AudioDescriptionEnum);
    }
}

enum AudioDescriptionEnum {
    standard = 'standard',
    extended = 'extended',
}