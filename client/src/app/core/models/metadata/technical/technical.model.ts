import { CharacterStringType, DurationType, LangStringType } from "../util.model";
import { MimeType } from "./enums/mime-types.enum";
import { Browsers, OperatingSystems } from "./enums/name.enum";
import { SpecificBrowsers, SpecificMiddleware, SpecificOperatingSystems } from "./enums/specific-name.enum";
import { SpecificType } from "./enums/specific-type.enum";
import { SupportedPlatforms } from "./enums/supported-platforms.enum";
import { Type } from "./enums/type.enum";

export class Technical {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    format: MimeType = new MimeType(0, 40);
    size: CharacterStringType = new CharacterStringType(0, 1);
    location: CharacterStringType = new CharacterStringType(0, 1);
    requirement: Requirement = new Requirement();
    installationRemarks: LangStringType = new LangStringType(0, 1);
    otherPlatformRequirements: LangStringType = new LangStringType(0, 1);
    duration: DurationType = new DurationType();
    supportedPlatforms: SupportedPlatforms = new SupportedPlatforms(0, 100);
    platformSpecificFeatures: PlatformSpecificFeaturesType = new PlatformSpecificFeaturesType();
    service: ServiceType = new ServiceType();
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

class PlatformSpecificFeaturesType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    platformSpecificFeatures: PlatformSpecificFeatures = new PlatformSpecificFeatures();
}

class PlatformSpecificFeatures {
    platformType: SupportedPlatforms = new SupportedPlatforms(1, 1);
    specificFormat: MimeType = new MimeType(1, 100);
    specificSize: CharacterStringType = new CharacterStringType(0, 1);
    specificLocation: CharacterStringType = new CharacterStringType(0, 1);
    specificRequirement: SpecificRequirement = new SpecificRequirement();
    specificInstallationRemarks: LangStringType = new LangStringType(0, 1);
    specificOtherPlatformRequirements: LangStringType = new LangStringType(0, 1);
}

class SpecificRequirement {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    specificOrComposite: Array<SpecificOrComposite> = [];

    getSpecificTypes(): Array<string> {
        return Object.values(SpecificType);
    }

    getSpecificNames(type: string): Array<string> {
        switch (type) {
            case 'browser':
                return Object.values(SpecificBrowsers);
            case 'operating system':
                return Object.values(SpecificOperatingSystems);
            case 'middleware':
                return Object.values(SpecificMiddleware);
            default:
                return [...Object.values(Browsers), ...Object.values(OperatingSystems)];
        }
    }
}

class SpecificOrComposite {
    minOccurs: number = 0;
    maxOccurs: number = 40;
    content: Array<{
        specificType: SpecificType;
        specificName: SpecificOperatingSystems | SpecificBrowsers | SpecificMiddleware;
        specificMinimumVersion: string;
        specificMaximumVersion: string;
    }> = [];
}

class ServiceType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    serviceType: Array<Service>;
}

class Service {
    name: CharacterStringType = new CharacterStringType(1, 1);
    type: CharacterStringType = new CharacterStringType(1, 1);
    provides: boolean;
    essential: boolean;
    protocol: CharacterStringType = new CharacterStringType(1, 100);
    ontology: OntologyType = new OntologyType();
    language: CharacterStringType = new CharacterStringType(0, 100);
    details: DetailsType = new DetailsType();
}

class OntologyType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    ontologyType: Array<Ontology>;
}

class Ontology {
    ontologyLanguage: CharacterStringType = new CharacterStringType(1, 1);
    ontologyLocation: CharacterStringType = new CharacterStringType(1, 1);
}

class DetailsType {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    details: string;
    serviceLocation: CharacterStringType = new CharacterStringType(1, 100);
}