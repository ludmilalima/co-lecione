import { LangStringType } from "../util.model";
import { CopyrightAndOtherRestrictions } from "./enums/copyright-and-other-restrictions.enum";
import { Cost } from "./enums/cost.enum.";

export class Rights {
    minOccurs: number = 0;
    maxOccurs: number = 1;
    cost: Cost = new Cost(0, 1);
    copyrightAndOtherRestrictions: CopyrightAndOtherRestrictions = new CopyrightAndOtherRestrictions(0, 1);
    description: LangStringType = new LangStringType(0, 1);
}