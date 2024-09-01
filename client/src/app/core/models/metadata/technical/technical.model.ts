import { ArrayInfo, BooleanType, CharacterStringType, DurationType, LangStringType, NodeInfo } from "../util.model";
import { MimeType } from "./enums/mime-types.enum";
import { Browsers, OperatingSystems } from "./enums/name.enum";
import { SpecificBrowsers, SpecificMiddleware, SpecificOperatingSystems } from "./enums/specific-name.enum";
import { SpecificType } from "./enums/specific-type.enum";
import { SupportedPlatforms } from "./enums/supported-platforms.enum";
import { Type } from "./enums/type.enum";

export class Technical {
    nodeInfo: NodeInfo;
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

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'Technical information about the learning object.',
            'root'
        );
    }
}

class Requirement extends ArrayInfo {
    override childType: OrCompositeType = new OrCompositeType();
    nodeInfo: NodeInfo;
    orComposite: Array<OrCompositeType> = [];

    constructor() {
        super();
        this.nodeInfo = new NodeInfo(
            0,
            40,
            'Requirement information about the learning object.',
            'root'
        );
    }

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

class OrCompositeType extends ArrayInfo {
    override childType: OrComposite = new OrComposite();
    nodeInfo: NodeInfo;
    content: Array<OrComposite> = [];

    constructor() {
        super()
        this.nodeInfo = new NodeInfo(
            0,
            40,
            'Composite information about the learning object.',
            'root'
        );
    }
}

class OrComposite {
    type: Type;
    name: OperatingSystems | Browsers;
    minimumVersion: CharacterStringType = new CharacterStringType(1, 1);
    maximumVersion: CharacterStringType = new CharacterStringType(1, 1);
}

class PlatformSpecificFeaturesType {
    nodeInfo: NodeInfo;
    platformSpecificFeatures: PlatformSpecificFeatures = new PlatformSpecificFeatures();

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            100,
            'Platform specific features of the learning object.',
            'root'
        );
    }
}

class PlatformSpecificFeatures {
    nodeInfo: NodeInfo;
    platformType: SupportedPlatforms = new SupportedPlatforms(1, 1);
    specificFormat: MimeType = new MimeType(1, 100);
    specificSize: CharacterStringType = new CharacterStringType(0, 1);
    specificLocation: CharacterStringType = new CharacterStringType(0, 1);
    specificRequirement: SpecificRequirement = new SpecificRequirement();
    specificInstallationRemarks: LangStringType = new LangStringType(0, 1);
    specificOtherPlatformRequirements: LangStringType = new LangStringType(0, 1);

    constructor() {
        this.nodeInfo = new NodeInfo(
            1,
            1,
            'Platform specific features of the learning object.',
            'root'
        );
    }
}

class SpecificRequirement extends ArrayInfo {
    override childType: SpecificOrCompositeType = new SpecificOrCompositeType();
    nodeInfo: NodeInfo;
    specificOrComposite: Array<SpecificOrCompositeType> = [];

    constructor() {
        super();
        this.nodeInfo = new NodeInfo(
            0,
            100,
            'Specific requirement information about the learning object.',
            'root'
        );
    }

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

class SpecificOrCompositeType extends ArrayInfo {
    override childType: SpecificOrComposite = new SpecificOrComposite();
    nodeInfo: NodeInfo;
    content: Array<SpecificOrComposite> = [];

    constructor() {
        super();
        this.nodeInfo = new NodeInfo(
            0,
            40,
            'Specific composite information about the learning object.',
            'root'
        );
    }
}

class SpecificOrComposite {
    specificType: SpecificType;
    specificName: SpecificOperatingSystems | SpecificBrowsers | SpecificMiddleware;
    specificMinimumVersion: CharacterStringType = new CharacterStringType(1, 1);
    specificMaximumVersion: CharacterStringType = new CharacterStringType(1, 1);
}

class ServiceType extends ArrayInfo {
    override childType: Service = new Service();
    nodeInfo: NodeInfo;
    serviceType: Array<Service> = [];

    constructor() {
        super();
        this.nodeInfo = new NodeInfo(
            0,
            100,
            'Service information about the learning object.',
            'root'
        );
    }
}

class Service {
    nodeInfo: NodeInfo;
    name: CharacterStringType = new CharacterStringType(1, 1);
    type: CharacterStringType = new CharacterStringType(1, 1);
    provides: BooleanType = new BooleanType();
    essential: BooleanType = new BooleanType();
    protocol: CharacterStringType = new CharacterStringType(1, 100);
    ontology: OntologyType = new OntologyType();
    language: CharacterStringType = new CharacterStringType(0, 100);
    details: DetailsType = new DetailsType();

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'Service information about the learning object.',
            'root'
        );
    }
}

class OntologyType extends ArrayInfo {
    override childType: Ontology = new Ontology();
    nodeInfo: NodeInfo;
    ontologyType: Array<Ontology> = [];

    constructor() {
        super();
        this.nodeInfo = new NodeInfo(
            0,
            100,
            'Ontology information about the learning object.',
            'root'
        );
    }
}

class Ontology {
    nodeInfo: NodeInfo;
    ontologyLanguage: CharacterStringType = new CharacterStringType(1, 1);
    ontologyLocation: CharacterStringType = new CharacterStringType(1, 1);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'Ontology information about the learning object.',
            'root'
        );
    }
}

class DetailsType {
    nodeInfo: NodeInfo;
    details: CharacterStringType = new CharacterStringType(1, 1);
    serviceLocation: CharacterStringType = new CharacterStringType(1, 100);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            100,
            'Details information about the learning object.',
            'root'
        );
    }
}