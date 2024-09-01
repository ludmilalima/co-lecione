import { LangStringType, NodeInfo } from "../util.model";
import { ContributeLifeCycle } from "./enums/contribute-life-cycle.enum";
import { Status } from "./enums/status.enum";

export class LifeCycle {
    nodeInfo: NodeInfo;
    version: LangStringType = new LangStringType(0, 1);
    status: Status = new Status(0, 1);
    contribute: ContributeLifeCycle = new ContributeLifeCycle(0, 30, 0, 40);

    constructor() {
        this.nodeInfo = new NodeInfo(
            0,
            1,
            'General information about the learning object.',
            'root'
        );
    }
}