import { LanguageType } from "../util.model";
import { AudioDescription } from "./enums/audio-description.enum";
import { ColorAvoidance } from "./enums/color-avoidance.enum";
import { LearnerScaffold } from "./enums/learner-scaffold.enum";
import { SignLanguage } from "./enums/sign-language.enum";

export class Accessibility {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    hasVisual: boolean;
    hasAuditory: boolean;
    hasText: boolean;
    hasTactile: boolean;
    earlStatement: EarlStatementType = new EarlStatementType();
    equivalentResource: EquivalentResourceType = new EquivalentResourceType();

    constructor() {
        this.hasVisual = false;
        this.hasAuditory = false;
        this.hasText = false;
        this.hasTactile = false;
    }
}

class EarlStatementType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    earlStatement = Array<EarlStatement>;
}

class EarlStatement {
    displayTransformability: URL;
    controlFlexibility: URL;
}

class EquivalentResourceType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    equivalentResource = Array<EquivalentResource>;
}

class EquivalentResource {
    isSupplementary: boolean;
    learnerScaffold: LearnerScaffold = new LearnerScaffold(0, 100);
    alternativesToVisual: AlternativesToVisualType = new AlternativesToVisualType();
    alternativesToText: AlternativesToTextType = new AlternativesToTextType();
    alternativesToAuditory: AlternativesToAuditoryType = new AlternativesToAuditoryType();
}

class AlternativesToVisualType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    alternativesToVisual = Array<AlternativesToVisual>;
}

class AlternativesToVisual {
    audioDescription: AudioDescription = new AudioDescription(0, 1);
    language: LanguageType = new LanguageType(0, 1);
    altTextLang: LanguageType = new LanguageType(0, 1);
    longDescriptiomLang: LanguageType = new LanguageType(0, 1);
    colorAvoidance: ColorAvoidance = new ColorAvoidance(0, 100);
}

class AlternativesToTextType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    alternativesToText = Array<AlternativesToText>;
}

class AlternativesToText {
    graphicAlternative: boolean;
    signLanguage: SignLanguage = new SignLanguage(0, 1);
}

class AlternativesToAuditoryType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    alternativesToAuditory = Array<AlternativesToAuditory>;
}

class AlternativesToAuditory {
    captionType: CaptionType = new CaptionType();
}

class CaptionType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    caption: Array<Caption>;
}

class Caption {
    language: LanguageType = new LanguageType(0, 1);
    captionRate: number;
}