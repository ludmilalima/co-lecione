import { CharacterStringType, LangStringType } from "../util.model";
import { SegmentMediaType } from "./enums/segment-media-type.enum";

export class SegmentInformationTable {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    segmentList: SegmentList = new SegmentList();
    segmentGroupList: SegmentGroupList = new SegmentGroupList();
}

class SegmentList {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    segmentInformation: SegmentInformation = new SegmentInformation();
}

class SegmentInformation {
    identifier: CharacterStringType = new CharacterStringType(1, 1);
    title: LangStringType = new LangStringType(1, 1);
    description: LangStringType = new LangStringType(1, 1);
    keyword: LangStringType = new LangStringType(1, 100);
    segmentMediaType: SegmentMediaType = new SegmentMediaType(1, 1);
    start: CharacterStringType = new CharacterStringType(1, 1);
    end: CharacterStringType = new CharacterStringType(1, 1);
}

class SegmentGroupList {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    segmentGroupInformation: SegmentGroupInformation = new SegmentGroupInformation();
}

class SegmentGroupInformation {
    identifier: CharacterStringType = new CharacterStringType(1, 1);
    groupType: LangStringType = new LangStringType(1, 1);
    title: LangStringType = new LangStringType(1, 1);
    description: LangStringType = new LangStringType(1, 1);
    keyword: LangStringType = new LangStringType(1, 100);
    segments: Segments = new Segments();
}

class Segments {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    identifier: CharacterStringType = new CharacterStringType(1, 100);
}