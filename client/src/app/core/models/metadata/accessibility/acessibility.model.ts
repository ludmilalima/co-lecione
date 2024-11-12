import {
  ArrayInfo,
  BooleanType,
  CharacterStringType,
  LanguageType,
  NodeInfo,
} from "../util.model";
import { AudioDescription } from "./enums/audio-description.enum";
import { ColorAvoidance } from "./enums/color-avoidance.enum";
import { LearnerScaffold } from "./enums/learner-scaffold.enum";
import { SignLanguage } from "./enums/sign-language.enum";

export class Accessibility {
  nodeInfo: NodeInfo;
  hasVisual: BooleanType = new BooleanType();
  hasAuditory: BooleanType = new BooleanType();
  hasText: BooleanType = new BooleanType();
  hasTactile: BooleanType = new BooleanType();
  earlStatement: EarlStatementType = new EarlStatementType();
  equivalentResource: EquivalentResourceType = new EquivalentResourceType();

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      1,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class EarlStatementType extends ArrayInfo {
  override childType: EarlStatement = new EarlStatement();
  nodeInfo: NodeInfo;
  earlStatement: Array<EarlStatement> = [];

  constructor() {
    super();
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class EarlStatement {
  displayTransformability: CharacterStringType = new CharacterStringType(0, 1);
  controlFlexibility: CharacterStringType = new CharacterStringType(0, 1);
}

class EquivalentResourceType extends ArrayInfo {
  override childType: EquivalentResource = new EquivalentResource();
  nodeInfo: NodeInfo;
  equivalentResource: Array<EquivalentResource> = [];

  constructor() {
    super();
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class EquivalentResource {
  isSupplementary: BooleanType = new BooleanType();
  learnerScaffold: LearnerScaffold = new LearnerScaffold(0, 100);
  alternativesToVisual: AlternativesToVisualType =
    new AlternativesToVisualType();
  alternativesToText: AlternativesToTextType = new AlternativesToTextType();
  alternativesToAuditory: AlternativesToAuditoryType =
    new AlternativesToAuditoryType();
}

class AlternativesToVisualType extends ArrayInfo {
  override childType: AlternativesToVisual = new AlternativesToVisual();
  nodeInfo: NodeInfo;
  alternativesToVisual: Array<AlternativesToVisual> = [];

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

class AlternativesToVisual {
  audioDescription: AudioDescription = new AudioDescription(0, 1);
  language: LanguageType = new LanguageType(0, 1);
  altTextLang: LanguageType = new LanguageType(0, 1);
  longDescriptiomLang: LanguageType = new LanguageType(0, 1);
  colorAvoidance: ColorAvoidance = new ColorAvoidance(0, 100);
}

class AlternativesToTextType extends ArrayInfo {
  override childType: AlternativesToText = new AlternativesToText();
  nodeInfo: NodeInfo;
  alternativesToText: Array<AlternativesToText> = [];

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

class AlternativesToText {
  graphicAlternative: BooleanType = new BooleanType();
  signLanguage: SignLanguage = new SignLanguage(0, 1);
}

class AlternativesToAuditoryType extends ArrayInfo {
  override childType: AlternativesToAuditory = new AlternativesToAuditory();
  nodeInfo: NodeInfo;
  alternativesToAuditory: Array<AlternativesToAuditory> = [];

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

class AlternativesToAuditory {
  captionType: CaptionType = new CaptionType();
}

class CaptionType extends ArrayInfo {
  override childType: Caption = new Caption();
  nodeInfo: NodeInfo;
  caption: Array<Caption> = [];

  constructor() {
    super();
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "Platform specific features of the learning object.",
      "root"
    );
  }
}

class Caption {
  language: LanguageType = new LanguageType(0, 1);
  captionRate: CharacterStringType = new CharacterStringType(0, 1);
}
