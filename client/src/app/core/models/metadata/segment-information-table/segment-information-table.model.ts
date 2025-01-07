import {
  ArrayInfo,
  CharacterStringType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { SegmentMediaType } from "./enums/segment-media-type.enum";

export class SegmentInformationTable {
  nodeInfo: NodeInfo;
  segmentList: SegmentList = new SegmentList();
  segmentGroupList: SegmentGroupList = new SegmentGroupList();

  constructor() {
    this.nodeInfo = new NodeInfo(
      LOMBaseSchema.minCardinality,
      LOMBaseSchema.maxCardinality,
      LOMBaseSchema.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

class SegmentList {
  nodeInfo: NodeInfo;
  segmentInformation: SegmentInformation = new SegmentInformation();

  constructor() {
    const scheme: MetadataEntrySchema = {
      name: "Segment List",
      description: "Lista de informações sobre segmentos.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class SegmentInformation {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Identifier",
    {
      name: "SegmentInformation",
      description: "Agrupamento das informações de um segmento.",
      subElements: [
        {
          name: "Identifier",
          description:
            "Identificador único do segmento nesse objeto de aprendizagem.",
          dataType: "CharacterString",
          minCardinality: 1,
          maxCardinality: 1,
          examples: ["1", "222", "12"],
        },
      ],
    }
  );
  title: LangStringType = new LangStringType(1, 1, "Title", {
    name: "SegmentInformation",
    description: "Agrupamento das informações de um segmento.",
    subElements: [
      {
        name: "Title",
        description: "Título do segmento.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["Exercícios receptores de TV Digital"],
      },
    ],
  });
  description: LangStringType = new LangStringType(1, 1, "Description", {
    name: "SegmentInformation",
    description: "Agrupamento das informações de um segmento.",
    subElements: [
      {
        name: "Description",
        description: "Descrição do conteúdo do segmento.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["Seção de exercícios de introdução à TVD."],
      },
    ],
  });
  keyword: LangStringType = new LangStringType(1, 40, "Keyword", {
    name: "SegmentInformation",
    description: "Agrupamento das informações de um segmento.",
    subElements: [
      {
        name: "Keyword",
        description: "Palavras-chave referentes ao segmento.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 40,
        examples: ["TV Digital", "receptores", "exercícios"],
      },
    ],
  });
  segmentMediaType: SegmentMediaType = new SegmentMediaType(
    1,
    1,
    "Segment Media Type",
    {
      name: "SegmentInformation",
      description: "Agrupamento das informações de um segmento.",
      subElements: [
        {
          name: "Segment Media Type",
          description: "Descreve o tipo de mídia do segmento.",
          dataType: "CharacterString",
          minCardinality: 1,
          maxCardinality: 1,
          examples: ["document", "audio", "video"],
        },
      ],
    }
  );
  start: CharacterStringType = new CharacterStringType(1, 1, "Start", {
    name: "SegmentInformation",
    description: "Agrupamento das informações de um segmento.",
    subElements: [
      {
        name: "Start",
        description: "Início do segmento (tempo, página, seção, etc.).",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["PT00H05M", "Page20Line10"],
      },
    ],
  });
  end: CharacterStringType = new CharacterStringType(1, 1, "End", {
    name: "SegmentInformation",
    description: "Agrupamento das informações de um segmento.",
    subElements: [
      {
        name: "End",
        description: "Fim do segmento (tempo, página, etc.).",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["PT00H10M", "Page25Line20"],
      },
    ],
  });

  constructor() {
    let scheme: MetadataEntrySchema = {
      name: "Segment Information",
      description: "Agrupamento das informações de um segmento.",
      minCardinality: 1,
      maxCardinality: 40,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class SegmentGroupList extends ArrayInfo {
  override childType: SegmentGroupInformation = new SegmentGroupInformation();
  nodeInfo: NodeInfo;
  segmentGroupInformation: Array<SegmentGroupInformation> = [];

  constructor() {
    super();
    let scheme: MetadataEntrySchema = {
      name: "Segment Group List",
      description: "Lista de informações sobre grupos de segmentos.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class SegmentGroupInformation {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Identifier",
    {
      name: "SegmentGroupInformation",
      description: "Conjunto de informações do grupo de segmentos.",
      subElements: [
        {
          name: "Identifier",
          description: "Identificador único do grupo de segmentos.",
          dataType: "CharacterString",
          minCardinality: 1,
          maxCardinality: 1,
          examples: ["Grupo1", "Exercícios"],
        },
      ],
    }
  );
  groupType: LangStringType = new LangStringType(1, 1, "Group Type", {
    name: "SegmentGroupInformation",
    description: "Conjunto de informações do grupo de segmentos.",
    subElements: [
      {
        name: "GroupType",
        description: "Tipo de agrupamento de segmentos.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["highlights", "bookmarks", "themeGroup"],
      },
    ],
  });
  title: LangStringType = new LangStringType(1, 1, "Title", {
    name: "SegmentGroupInformation",
    description: "Conjunto de informações do grupo de segmentos.",
    subElements: [
      {
        name: "Title",
        description: "Título do grupo de segmentos.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["Atividades e Exercícios do OA"],
      },
    ],
  });
  description: LangStringType = new LangStringType(1, 1, "Description", {
    name: "SegmentGroupInformation",
    description: "Conjunto de informações do grupo de segmentos.",
    subElements: [
      {
        name: "Description",
        description: "Descrição do conteúdo do grupo de segmentos.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 1,
        examples: ["Grupo contendo os segmentos com os exercícios deste OA."],
      },
    ],
  });
  keyword: LangStringType = new LangStringType(1, 40, "Keyword", {
    name: "SegmentGroupInformation",
    description: "Conjunto de informações do grupo de segmentos.",
    subElements: [
      {
        name: "Keyword",
        description: "Palavras-chave referentes ao grupo de segmentos.",
        dataType: "CharacterString",
        minCardinality: 1,
        maxCardinality: 40,
        examples: ["Exercícios", "Atividades"],
      },
    ],
  });
  segments: Segments = new Segments();

  constructor() {
    let scheme: MetadataEntrySchema = {
      name: "Segment Group List",
      description: "Lista de informações sobre grupos de segmentos.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class Segments {
  nodeInfo: NodeInfo;
  identifier: CharacterStringType = new CharacterStringType(
    1,
    100,
    "Identifier",
    {
      name: "Segments",
      description: "Segmentos que fazem parte do grupo.",
      subElements: [
        {
          name: "Identifier",
          description:
            "Código identificador único do segmento que pertence a este grupo.",
          dataType: "CharacterString",
          minCardinality: 1,
          maxCardinality: 40,
          examples: ["1", "222", "12"],
        },
      ],
    }
  );

  constructor() {
    let scheme: MetadataEntrySchema = {
      name: "Segments",
      description: "Segmentos que fazem parte do grupo.",
      minCardinality: 1,
      maxCardinality: 40,
      order: "unordered",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

const LOMBaseSchema: MetadataEntrySchema = {
  name: "Segment Information Table",
  description:
    "Grupo que contém o conjunto de informações de segmentação dos objetos de aprendizagem e de grupos de segmentos dos OA.",
  minCardinality: 0,
  maxCardinality: 1,
  order: "unordered",
  subElements: [
    {
      name: "SegmentList",
      description: "Lista de informações sobre segmentos.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      subElements: [
        {
          name: "SegmentInformation",
          description: "Agrupamento das informações de um segmento.",
          minCardinality: 1,
          maxCardinality: 40,
          order: "unordered",
          subElements: [
            {
              name: "Identifier",
              description:
                "Identificador único do segmento nesse objeto de aprendizagem.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["1", "222", "12"],
            },
            {
              name: "Title",
              description: "Título do segmento.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["Exercícios receptores de TV Digital"],
            },
            {
              name: "Description",
              description: "Descrição do conteúdo do segmento.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["Seção de exercícios de introdução à TVD."],
            },
            {
              name: "Keyword",
              description: "Palavras-chave referentes ao segmento.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 40,
              examples: ["TV Digital", "receptores", "exercícios"],
            },
            {
              name: "SegmentMediaType",
              description: "Descreve o tipo de mídia do segmento.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["document", "audio", "video"],
            },
            {
              name: "Start",
              description: "Início do segmento (tempo, página, seção, etc.).",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["PT00H05M", "Page20Line10"],
            },
            {
              name: "End",
              description: "Fim do segmento (tempo, página, etc.).",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["PT00H10M", "Page25Line20"],
            },
          ],
        },
      ],
    },
    {
      name: "SegmentGroupList",
      description: "Lista de informações sobre grupos de segmentos.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unordered",
      subElements: [
        {
          name: "SegmentGroupInformation",
          description: "Conjunto de informações do grupo de segmentos.",
          minCardinality: 1,
          maxCardinality: 40,
          order: "unordered",
          subElements: [
            {
              name: "Identifier",
              description: "Identificador único do grupo de segmentos.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["Grupo1", "Exercícios"],
            },
            {
              name: "GroupType",
              description: "Tipo de agrupamento de segmentos.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["highlights", "bookmarks", "themeGroup"],
            },
            {
              name: "Title",
              description: "Título do grupo de segmentos.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: ["Atividades e Exercícios do OA"],
            },
            {
              name: "Description",
              description: "Descrição do conteúdo do grupo de segmentos.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 1,
              examples: [
                "Grupo contendo os segmentos com os exercícios deste OA.",
              ],
            },
            {
              name: "Keyword",
              description: "Palavras-chave referentes ao grupo de segmentos.",
              dataType: "string",
              minCardinality: 1,
              maxCardinality: 40,
              examples: ["Exercícios", "Atividades"],
            },
            {
              name: "Segments",
              description: "Segmentos que fazem parte do grupo.",
              minCardinality: 1,
              maxCardinality: 40,
              order: "unordered",
              subElements: [
                {
                  name: "Identifier",
                  description:
                    "Código identificador único do segmento que pertence a este grupo.",
                  dataType: "string",
                  minCardinality: 1,
                  maxCardinality: 40,
                  examples: ["1", "222", "12"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
