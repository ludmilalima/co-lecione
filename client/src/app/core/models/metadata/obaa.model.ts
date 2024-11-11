import { Accessibility } from "./accessibility/acessibility.model";
import { Annotation } from "./annotation/annotation.model";
import { Classification } from "./classification/classification.model";
import { Educational } from "./educational/educational.model";
import { General } from "./general/general.model";
import { LifeCycle } from "./lifecycle/life-cycle.model";
import { MetaMetadata } from "./meta-metadata/meta-metadata.model";
import { Relation } from "./relation/relation.model";
import { Rights } from "./rights/rights.model";
import { SegmentInformationTable } from "./segment-information-table/segment-information-table.model";
import { Technical } from "./technical/technical.model";
import { NodeInfo } from "./util.model";

export class Obaa {
    nodeInfo: NodeInfo;
    general: General = new General();
    lifeCycle: LifeCycle = new LifeCycle();
    metaMetadata: MetaMetadata = new MetaMetadata();
    technical: Technical = new Technical();
    educational: Educational = new Educational();
    // rights: Rights = new Rights();
    // relation: Relation = new Relation();
    // annotation: Annotation = new Annotation();
    // classification: Classification = new Classification();
    // accessibility: Accessibility = new Accessibility();
    // segmentInformationTable: SegmentInformationTable = new SegmentInformationTable();

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'The root element of the OBAA model.',
            'root'
        );
    }
}