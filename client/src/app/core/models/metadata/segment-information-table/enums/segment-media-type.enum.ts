import { VocabularyType } from "../../util.model";

export class SegmentMediaType extends VocabularyType {
    override source: string = 'OBAA';
    override value: SegmentMediaTypeEnum;

    override getValueOptions(): Array<string> {
        return Object.values(SegmentMediaTypeEnum);
    }
}

enum SegmentMediaTypeEnum {
    Document = "Document",
    Hyperdocument = "Hyperdocument",
    Audio = "Audio",
    Video = "Video",
    Other = "Other"
}