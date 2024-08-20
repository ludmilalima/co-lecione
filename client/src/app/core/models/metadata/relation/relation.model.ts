import { IdentifierType, LangStringType } from "../util.model";
import { Kind } from "./enums/kind.enum";

export class Relation {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    kind: Kind = new Kind(0, 1);
    resorce: ResourceType = new ResourceType;
}

class ResourceType {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    identifier: IdentifierType = new IdentifierType(0, 10);
    description: LangStringType = new LangStringType(0, 10);
}