import { VocabularyType } from "../../util.model";

export class SupportedPlatforms extends VocabularyType {
    override source: 'OBAA';
    override value: SupportedPlatformsEnum;

    getValueOptions(): Array<string> {
        return Object.values(SupportedPlatformsEnum);
    }
}

enum SupportedPlatformsEnum {
    mobile = 'mobile',
    dtv = 'dtv',
    web = 'web',
}