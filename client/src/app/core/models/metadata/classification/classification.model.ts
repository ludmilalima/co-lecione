import { LangStringType } from "../util.model";
import { Purpose } from "./enums/purpose.enum";

export class Classification {
    minOccurs: number = 0;
    maxOccurs: number = 40;
    purpose: Purpose = new Purpose(0, 1);
    taxonPath: TaxonPath = new TaxonPath();
    description: LangStringType = new LangStringType(0, 1);
    keyword: LangStringType = new LangStringType(0, 40);
}

class TaxonPath {
    minOccurs: number = 0;
    maxOccurs: number = 15;
    source: LangStringType = new LangStringType(0, 1);
    taxon: Taxon = new Taxon();
}

class Taxon {
    minOccurs: number = 0;
    maxOccurs: number = 15;
    id: string;
    entry: LangStringType = new LangStringType(0, 1);
}