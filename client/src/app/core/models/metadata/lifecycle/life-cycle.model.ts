import { LangStringType, MetadataEntrySchema, NodeInfo } from "../util.model";
import { ContributeLifeCycle } from "./enums/contribute-life-cycle.enum";
import { Status } from "./enums/status.enum";

export class LifeCycle {
  nodeInfo: NodeInfo;
  version: LangStringType = new LangStringType(0, 1, "Version", LOMBaseSchema);
  status: Status = new Status(0, 1, "Status", LOMBaseSchema);
  contribute: ContributeLifeCycle = new ContributeLifeCycle(0, 30, 0, 40);

  constructor() {
    this.nodeInfo = new NodeInfo(0, 1, LOMBaseSchema.description, "root");
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Life Cycle",
  description:
    "Agrupa as características relacionadas à história e ao estado atual deste objeto de aprendizagem e àqueles que o afetaram durante sua evolução.",
  order: "unspecified",
  subElements: [
    {
      name: "Version",
      description:
        "Identifica a edição do objeto de aprendizagem atual. A edição pode ser descrita de acordo com as regras de um sistema específico de versionamento.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 1000 caracteres)",
      examples: ['("en", "v1.0")', '("en", "2024 edition")'],
    },
    {
      name: "Status",
      description: "Indica o estado do objeto de aprendizagem em sua evolução.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary (Enumerated)",
      valueSpace: '"draft", "final", "revised", "unavailable"',
      examples: ["draft", "final"],
    },
    {
      name: "Contribute",
      description:
        "Indica aqueles que contribuíram para este objeto de aprendizagem e as funções que desempenharam.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unordered",
      dataType: "aggregate",
      subElements: [
        {
          name: "Role",
          description:
            "A função desempenhada pelo(s) responsável(is) por esta contribuição.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "Vocabulary (Enumerated)",
          valueSpace:
            '"author", "publisher", "unknown", "initiator", "terminator", "validator", "editor", "graphical designer"',
          examples: ["author", "editor"],
        },
        {
          name: "Entity",
          description:
            "Uma pessoa ou organização envolvida nesta contribuição. Representada por uma string codificada, como um vCard.",
          minCardinality: 1,
          maxCardinality: 40,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "vCard format",
          examples: [
            "BEGIN:VCARD\nFN:John Doe\nORG:Example Organization\nEND:VCARD",
          ],
        },
        {
          name: "Date",
          description: "A data desta contribuição.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "DateTime",
          examples: ["2024-11-26"],
        },
      ],
    },
  ],
};
