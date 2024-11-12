import {
  ArrayInfo,
  CharacterStringType,
  LangStringType,
  NodeInfo,
} from "../util.model";
import { SegmentMediaType } from "./enums/segment-media-type.enum";

export class SegmentInformationTable {
  nodeInfo: NodeInfo;
  segmentList: SegmentList = new SegmentList();
  segmentGroupList: SegmentGroupList = new SegmentGroupList();

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      1,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class SegmentList {
  nodeInfo: NodeInfo;
  segmentInformation: SegmentInformation = new SegmentInformation();

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class SegmentInformation {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(1, 1);
  title: LangStringType = new LangStringType(1, 1);
  description: LangStringType = new LangStringType(1, 1);
  keyword: LangStringType = new LangStringType(1, 100);
  segmentMediaType: SegmentMediaType = new SegmentMediaType(1, 1);
  start: CharacterStringType = new CharacterStringType(1, 1);
  end: CharacterStringType = new CharacterStringType(1, 1);

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Specific requirement information about the learning object.",
      "root"
    );
  }
}

class SegmentGroupList extends ArrayInfo {
  override childType: SegmentGroupInformation = new SegmentGroupInformation();
  nodeInfo: NodeInfo;
  segmentGroupInformation: Array<SegmentGroupInformation> = [];

  constructor() {
    super();
    this.nodeInfo = new NodeInfo(
      0,
      1,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class SegmentGroupInformation {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(1, 1);
  groupType: LangStringType = new LangStringType(1, 1);
  title: LangStringType = new LangStringType(1, 1);
  description: LangStringType = new LangStringType(1, 1);
  keyword: LangStringType = new LangStringType(1, 100);
  segments: Segments = new Segments();
}

class Segments {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(1, 100);

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}
