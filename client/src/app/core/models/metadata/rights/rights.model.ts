import { LangStringType, NodeInfo } from "../util.model";
import { CopyrightAndOtherRestrictions } from "./enums/copyright-and-other-restrictions.enum";
import { Cost } from "./enums/cost.enum.";

export class Rights {
    nodeInfo: NodeInfo;
    cost: Cost = new Cost(0, 1);
    copyrightAndOtherRestrictions: CopyrightAndOtherRestrictions = new CopyrightAndOtherRestrictions(0, 1);
    description: LangStringType = new LangStringType(0, 1);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'A categoria Direitos agrupa os direitos de propriedade intelectual e as condições de uso do objeto de aprendizagem.',
            'root'
        );
    }
}