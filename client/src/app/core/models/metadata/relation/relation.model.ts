import { IdentifierType, LangStringType, NodeInfo } from "../util.model";
import { Kind } from "./enums/kind.enum";

export class Relation {
  nodeInfo: NodeInfo;
  kind: Kind = new Kind(0, 1);
  resource: ResourceType = new ResourceType();

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      100,
      "A categoria Relação agrupa as características que definem a relação entre o objeto de aprendizagem e outros objetos de aprendizagem relacionados.",
      "root"
    );
  }
}

class ResourceType {
  nodeInfo: NodeInfo;
  identifier: IdentifierType = new IdentifierType(0, 10);
  description: LangStringType = new LangStringType(0, 10);

  constructor() {
    this.nodeInfo = new NodeInfo(
      0,
      1,
      "O objeto de aprendizagem alvo que esta relação referencia.",
      "root"
    );
  }
}
