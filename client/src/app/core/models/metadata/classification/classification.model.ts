import { LangStringType, NodeInfo } from "../util.model";
import { Purpose } from "./enums/purpose.enum";

export class Classification {
  nodeInfo: NodeInfo;
  purpose: Purpose = new Purpose(0, 1);
  taxonPath: TaxonPath = new TaxonPath();
  description: LangStringType = new LangStringType(0, 1);
  keyword: LangStringType = new LangStringType(0, 40);

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      40,
      "Esta categoria descreve onde este objeto de aprendizagem se enquadra dentro de um sistema de classificação específico.\n Para definir múltiplas classificações, pode haver várias instâncias desta categoria.",
      "root"
    );
  }
}

class TaxonPath {
  nodeInfo: NodeInfo;
  source: LangStringType = new LangStringType(0, 1);
  taxon: Taxon = new Taxon();

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      15,
      "Um caminho taxonômico em um sistema de classificação específico.\nCada nível sucessivo é um refinamento na definição do nível precedente.\nCaminhos diferentes, na mesma ou em diferentes classificações, que descrevem a mesma característica, são permitidos.",
      "root"
    );
  }
}

class Taxon {
  nodeInfo: NodeInfo;
  id: string;
  entry: LangStringType = new LangStringType(0, 1);

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      15,
      "Um termo específico dentro de uma taxonomia.\nUm táxon é um nó que tem um rótulo ou termo definido.\nUm táxon também pode ter uma designação alfanumérica ou identificador para referência padronizada.\nO rótulo e/ou a entrada podem ser usados para designar um táxon específico.\nUma lista ordenada de táxons cria um caminho taxonômico, ou seja, “escada taxonômica”: este é um caminho de uma entrada mais geral para uma mais específica em uma classificação.",
      "root"
    );
  }
}
