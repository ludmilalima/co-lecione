import { AudioDescription } from "./enums/audio-description.enum";
import { ColorAvoidance } from "./enums/color-avoidance.enum";
import { LearnerScaffold } from "./enums/learner-scaffold.enum";
import { SignLanguage } from "./enums/sign-language.enum";

export class Accessibility {
    hasVisual: boolean;
    hasAuditory: boolean;
    hasText: boolean;
    hasTactile: boolean;
    earlStatement: EarlStatement[];
    equivalentResource: EquivalentResource[];

    constructor() {
        this.hasVisual = false;
        this.hasAuditory = false;
        this.hasText = false;
        this.hasTactile = false;
        this.earlStatement = [];
        this.equivalentResource = [];
    }
}

class AlternativesToAuditory {
    captionType: CaptionType;
}

class AlternativesToText {
    graphicAlternative: boolean;
    signLanguage: SignLanguage[];
}

class AlternativesToVisual {
    audioDescription: AudioDescription;
    language: IsoLanguageCode;
    altTextLang: IsoLanguageCode;
    longDescriptiomLang: IsoLanguageCode;
    colorAvoidance: ColorAvoidance[];
}

class CaptionType {
    language: IsoLanguageCode;
    captionRate: number;
}

class EarlStatement {
    displayTransformability: URL;
    controlFlexibility: URL;
}

class EquivalentResource {
    isSupplementary: boolean;
    learnerScaffold: LearnerScaffold[];
    alternativesToVisual: AlternativesToVisual;
    alternativesToText: AlternativesToText;
    alternativesToAuditory: AlternativesToAuditory;

    constructor() {
        this.isSupplementary = false;
        this.learnerScaffold = [];
    }
}