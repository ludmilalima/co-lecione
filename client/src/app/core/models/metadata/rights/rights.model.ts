import { LangStringType, MetadataEntrySchema, NodeInfo } from "../util.model";
import { CopyrightAndOtherRestrictions } from "./enums/copyright-and-other-restrictions.enum";
import { Cost } from "./enums/cost.enum.";

export class Rights {
  nodeInfo: NodeInfo;
  cost: Cost = new Cost(0, 1, "Cost", LOMBaseSchema);
  copyrightAndOtherRestrictions: CopyrightAndOtherRestrictions =
    new CopyrightAndOtherRestrictions(
      0,
      1,
      "Copyright and Other Restrictions",
      LOMBaseSchema
    );
  description: LangStringType = new LangStringType(
    0,
    1,
    "Description",
    LOMBaseSchema
  );

  constructor() {
    this.nodeInfo = new NodeInfo(0, 1, LOMBaseSchema.description, "root");
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Rights",
  description:
    "Esta categoria descreve os direitos de propriedade intelectual e as condições de uso deste objeto de aprendizagem. OBSERVAÇÃO 40 — A intenção é reutilizar os resultados do trabalho em andamento nas comunidades de Propriedade Intelectual e de e-commerce. Atualmente, esta categoria fornece apenas o nível mínimo de detalhes.",
  minCardinality: 1,
  maxCardinality: 1,
  order: "unspecified",
  dataType: "container",
  subElements: [
    {
      name: "Cost",
      description:
        "Indica se o uso deste objeto de aprendizagem requer pagamento.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "yes, no",
      dataType: "Vocabulary (State)",
    },
    {
      name: "Copyright and Other Restrictions",
      description:
        "Indica se direitos autorais ou outras restrições se aplicam ao uso deste objeto de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      valueSpace: "yes, no",
      dataType: "Vocabulary (State)",
    },
    {
      name: "Description",
      description:
        "Comentários sobre as condições de uso deste objeto de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType:
        "LangString (mínimo permitido: 1 caractere; máximo permitido: 1000 caracteres)",
      examples: [
        "en: 'O uso deste objeto de aprendizagem só é permitido após uma doação à Anistia Internacional.'",
      ],
    },
  ],
};
