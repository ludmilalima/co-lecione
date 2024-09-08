import { CharacterStringType, IdentifierType, LanguageType, NodeInfo } from "../util.model";
import { ContributeMetaMetadata } from "./enums/contribute-meta-metadata.enum";

export class MetaMetadata {
    nodeInfo: NodeInfo;
    identifier: IdentifierType = new IdentifierType(0, 10);
    contribute: ContributeMetaMetadata = new ContributeMetaMetadata(0, 10, 0, 10);
    metadataSchema: CharacterStringType = new CharacterStringType(0, 1);
    language: LanguageType = new LanguageType(0, 1);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'General information about the learning object.',
            'root'
        );
    }
}