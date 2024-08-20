import { LangStringType } from "../util.model";
import { ContributeLifeCycle } from "./enums/contribute-life-cycle.enum";
import { Status } from "./enums/status.enum";

export class LifeCycle {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    version: LangStringType = new LangStringType(0, 1);
    status: Status = new Status(0, 1);
    contribute: ContributeLifeCycle = new ContributeLifeCycle(0, 30, 0, 40);
}