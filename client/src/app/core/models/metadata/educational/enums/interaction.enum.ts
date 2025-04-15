import {
  BooleanType,
  MetadataEntrySchema,
  NodeInfo,
  VocabularyType,
} from "../../util.model";
import { Perception } from "./perception.enum";
import { Reciprocity } from "./reciprocity.enum";

export class InteractionType {
  nodeInfo: NodeInfo = new NodeInfo();
  interaction: Interaction = new Interaction(1, 1, "Interaction", {
    name: "Interaction",
    description:
      "Especifica a interação educacional proposta por este objeto de aprendizagem e seu(s) usuários.",
    subElements: [
      {
        name: "Interaction",
        description:
          "Especifica a interação educacional proposta por este objeto de aprendizagem e seu(s) usuários.",
        minCardinality: 1,
        valueSpace: "Objeto-sujeito, Sujeito 1 - sujeito 2, Objeto",
        dataType: "Vocabulário (enumerado)",
        examples: ["Objeto-sujeito"],
      },
    ],
  });
  perception: Perception = new Perception(1, 1);
  synchronism: BooleanType = new BooleanType(1, 1, "Syncronism", {
    name: "Synchronism",
    description:
      "Especifica o sincronismo referente à interação do aluno com o dispositivo utilizado para executar o objeto de aprendizagem.",
    subElements: [
      {
        name: "Synchronism",
        description:
          "Especifica o sincronismo referente à interação do aluno com o dispositivo utilizado para executar o objeto de aprendizagem.",
        minCardinality: 1,
        valueSpace:
          "True: denota sincronismo (Synchronous), False: denota interação assincrona (Asynchronous)",
        dataType: "boolean",
        examples: ["True"],
      },
    ],
  });
  copresence: BooleanType = new BooleanType(1, 1, "Co-presence", {
    name: "Co-presence",
    description:
      "Especifica a utilização de mecanismos que auxiliem a identificação de outros usuários no ambiente.",
    subElements: [
      {
        name: "Co-presence",
        description:
          "Especifica a utilização de mecanismos que auxiliem a identificação de outros usuários no ambiente.",
        minCardinality: 1,
        valueSpace:
          "True: o objeto faz uso de mecanismos de co-presença. False: o objeto não utiliza mecanismos de co-presença.",
        dataType: "boolean",
        examples: ["True"],
      },
    ],
  });
  reciprocity: Reciprocity = new Reciprocity(1, 1, "Reciprocity", {
    name: "Reciprocity",
    description:
      "Forma de relacionamento entre os usuários, necessária para o funcionamento deste objeto de aprendizagem.",
    subElements: [
      {
        name: "Reciprocity",
        description:
          "Forma de relacionamento entre os usuários, necessária para o funcionamento deste objeto de aprendizagem.",
        minCardinality: 1,
        maxCardinality: 1, // Assuming "1-1" indicates this relationship
        valueSpace: "1-1, 1-N, N-M",
        dataType: "Vocabulário (enumerado)",
        examples: ["1-N"],
      },
    ],
  });

  constructor() {
    let schema: MetadataEntrySchema = {
      name: "Interaction",
      description:
        "Especifica a interação educacional proposta por este objeto de aprendizagem e seu(s) usuários.",
      subElements: [
        {
          name: "Interaction",
          description:
            "Especifica a interação educacional proposta por este objeto de aprendizagem e seu(s) usuários.",
          minCardinality: 1,
          maxCardinality: 1,
        },
      ],
    };

    this.nodeInfo = new NodeInfo(1, 1, schema.description, "root");
    this.nodeInfo.metadataEntrySchema = schema;
  }

  getValueOptions(): Array<string> {
    return Object.values(InteractionEnum);
  }
}

export class Interaction extends VocabularyType {
  override source: string = "BOAA";
  override value: InteractionEnum;

  getValueOptions(): Array<string> {
    return Object.values(InteractionEnum);
  }
}

enum InteractionEnum {
  objetoSujeito = "objeto-sujeito",
  sujeito1Sujeito2Objeto = "sujeito1-sujeito2-objeto",
}
