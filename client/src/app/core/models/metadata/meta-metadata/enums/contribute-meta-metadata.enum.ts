import { ContributeType } from "../../util.model";

export class ContributeMetaMetadata extends ContributeType {
    override role: ContributeRole;
}

enum ContributeRole {
    creator = 'creator',
    validator = 'validator',
}