import { IdentifierType, LangStringType, LanguageType, NodeInfo } from "../util.model";
import { AggregationLevel } from "./enums/aggregation-level.enum";
import { Structure } from "./enums/structure.enum";

export class General {
    nodeInfo: NodeInfo;
    identifier: IdentifierType = new IdentifierType(0, 10);
    title: LangStringType = new LangStringType(0, 1);
    language: LanguageType = new LanguageType(0, 10);
    description: LangStringType = new LangStringType(0, 10);
    keyword: LangStringType = new LangStringType(0, 10);
    coverage: LangStringType = new LangStringType(0, 10);
    structure: Structure = new Structure(0, 1);
    aggregationLevel: AggregationLevel = new AggregationLevel(0, 1);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'General information about the learning object.',
            'root'
        );
    }
}