import { CharacterStringType, DurationType, LangStringType } from "../util.model";
import { Browsers, OperatingSystems } from "./enums/name.enum";
import { Type } from "./enums/type.enum";

export class Technical {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    format: CharacterStringType = new CharacterStringType(0, 40);
    size: CharacterStringType = new CharacterStringType(0, 1);
    location: CharacterStringType = new CharacterStringType(0, 1);
    requirement: Requirement = new Requirement();
    installationRemarks: LangStringType = new LangStringType(0, 1);
    otherPlatformRequirements: LangStringType = new LangStringType(0, 1);
    duration: DurationType = new DurationType();
}

class Requirement {
    minOccurs: number = 0;
    maxOccurs: number = 40;
    orComposite: Array<OrComposite> = [];

    getTypes(): Array<string> {
        return Object.values(Type);
    }

    getNames(type: string): Array<string> {
        switch (type) {
            case 'browser':
                return Object.values(Browsers);
            case 'operating system':
                return Object.values(OperatingSystems);
            default:
                return [...Object.values(Browsers), ...Object.values(OperatingSystems)];
        }
    }
}

class OrComposite {
    minOccurs: number = 0;
    maxOccurs: number = 40;
    content: Array<{
        type: Type;
        name: OperatingSystems | Browsers;
        minimumVersion: string;
        maximumVersion: string;
    }> = [];
}