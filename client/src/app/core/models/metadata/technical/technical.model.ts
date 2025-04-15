import { schema } from "ngx-editor";
import {
  ArrayInfo,
  BooleanType,
  CharacterStringType,
  DurationType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { MimeType } from "./enums/mime-types.enum";
import { Browsers, Name, OperatingSystems } from "./enums/name.enum";
import {
  SpecificBrowsers,
  SpecificMiddleware,
  SpecificName,
  SpecificOperatingSystems,
} from "./enums/specific-name.enum";
import { SpecificType } from "./enums/specific-type.enum";
import { SupportedPlatforms } from "./enums/supported-platforms.enum";
import { Type } from "./enums/type.enum";

export class Technical {
  nodeInfo: NodeInfo;
  format: MimeType = new MimeType(0, 40, "Format", LOMBaseSchema);
  size: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Size",
    LOMBaseSchema
  );
  location: CharacterStringType = new CharacterStringType(
    0,
    1,
    "Location",
    LOMBaseSchema
  );
  requirement: Requirement = new Requirement("Requirement", LOMBaseSchema);
  installationRemarks: LangStringType = new LangStringType(
    0,
    1,
    "Installation Remarks",
    LOMBaseSchema
  );
  otherPlatformRequirements: LangStringType = new LangStringType(
    0,
    1,
    "Other Platform Requirements",
    LOMBaseSchema
  );
  duration: DurationType = new DurationType(0, 1, "Duration", LOMBaseSchema);
  supportedPlatforms: SupportedPlatforms = new SupportedPlatforms(
    0,
    10,
    "Supported Platforms",
    LOMBaseSchema
  );
  platformSpecificFeatures: PlatformSpecificFeaturesType =
    new PlatformSpecificFeaturesType(0, 100, "Platform Specific Features", {
      name: "Platform Specific Features",
      description:
        "Características técnicas específicas relacionadas às plataformas suportadas.",
      subElements: [
        {
          name: "Platform Specific Features",
          description:
            "Características técnicas específicas relacionadas às plataformas suportadas.",
          minCardinality: 0,
          maxCardinality: 10,
          order: "unordered",
          dataType: "aggregate",
        },
      ],
    });
  service: ServiceType = new ServiceType();

  constructor() {
    this.nodeInfo = new NodeInfo(0, 1, LOMBaseSchema.description, "root");

    this.nodeInfo.metadataEntrySchema = LOMBaseSchema;
  }
}

class Requirement extends ArrayInfo {
  override childType: OrCompositeType = new OrCompositeType();
  nodeInfo: NodeInfo;
  orComposite: Array<OrCompositeType> = [];

  constructor(name: string, schema: MetadataEntrySchema) {
    super();
    let innerScheme = schema.subElements.find((item) => item.name === name);
    this.nodeInfo = new NodeInfo(0, 40, innerScheme.description, "root");
    this.nodeInfo.metadataEntrySchema = innerScheme;
  }

  getTypes(): Array<string> {
    return Object.values(Type);
  }

  getNames(type: string): Array<string> {
    switch (type) {
      case "browser":
        return Object.values(Browsers);
      case "operating system":
        return Object.values(OperatingSystems);
      default:
        return [...Object.values(Browsers), ...Object.values(OperatingSystems)];
    }
  }
}

class OrCompositeType extends ArrayInfo {
  override childType: OrComposite = new OrComposite();
  nodeInfo: NodeInfo;
  orComposite: Array<OrComposite> = [];

  constructor() {
    super();

    let scheme: MetadataEntrySchema = {
      name: "OrComposite",
      description:
        "Define um conjunto alternativo de condições para satisfazer este requisito.",
      minCardinality: 1,
      maxCardinality: 40,
      order: "unordered",
      dataType: "aggregate",
    };

    this.nodeInfo = new NodeInfo(0, 40, scheme.description, "root");
    this.nodeInfo.metadataEntrySchema = scheme;
  }
}

class OrComposite {
  type: Type = new Type(1, 1);
  name: Name = new Name(1, 1);
  minimumVersion: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Minimum Version",
    {
      name: "Minimum Version",
      description: "A versão mínima requerida para o requisito.",
      subElements: [
        {
          name: "Minimum Version",
          description: "A versão mínima requerida para o requisito.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "Version format (e.g., '1.0', '2.5')",
          examples: ['"10.0"', '"80.0"'],
        },
      ],
    }
  );
  maximumVersion: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Maximum Version",
    {
      name: "Maximum Version",
      description: "A versão máxima suportada pelo requisito.",
      subElements: [
        {
          name: "Maximum Version",
          description: "A versão máxima suportada pelo requisito.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "Version format (e.g., '1.0', '2.5')",
          examples: ['"11.0"', '"89.0"'],
        },
      ],
    }
  );
}

class PlatformSpecificFeaturesType {
  nodeInfo: NodeInfo;
  platformType: SupportedPlatforms = new SupportedPlatforms(
    1,
    1,
    "Platform Type",
    {
      name: "Platform Type",
      description:
        "Formato técnico específico para a mídia criada para a plataforma.",
      subElements: [
        {
          name: "Platform Type",
          description:
            "Tipo de plataforma digital a que os parâmetros técnicos se aplicam.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "Vocabulary (Enumerated)",
          valueSpace: '"Mobile", "DTV", "Web"',
          examples: ['"DTV"', '"Web"'],
        },
      ],
    }
  );
  specificFormat: MimeType = new MimeType(1, 10, "Specific Format", {
    name: "Specific Format",
    description:
      "Formato técnico específico para a mídia criada para a plataforma.",
    subElements: [
      {
        name: "Specific Format",
        description:
          "Formato técnico específico para a mídia criada para a plataforma.",
        minCardinality: 1,
        maxCardinality: 10,
        order: "unordered",
        dataType: "CharacterString",
        valueSpace: "MIME types (IANA registry)",
        examples: ['"video/mpeg"', '"text/html"'],
      },
    ],
  });
  specificSize: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Specific Size",
    {
      name: "Specific Size",
      description: "Tamanho técnico específico para a mídia em bytes.",
      subElements: [
        {
          name: "Specific Size",
          description: "Tamanho técnico específico para a mídia em bytes.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "Non-negative integer values",
          examples: ['"4200"'],
        },
      ],
    }
  );
  specificLocation: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Specific Location",
    {
      name: "Specific Location",
      description: "Local específico para acessar a mídia para a plataforma.",
      subElements: [
        {
          name: "Specific Location",
          description:
            "Local específico para acessar a mídia para a plataforma.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unordered",
          dataType: "CharacterString",
          valueSpace: "URI",
          examples: ['"https://example.com/resource-platform-specific"'],
        },
      ],
    }
  );
  specificRequirement: SpecificRequirement = new SpecificRequirement();
  specificInstallationRemarks: LangStringType = new LangStringType(
    1,
    1,
    "Specific Installation Remarks",
    {
      name: "Specific Installation Remarks",
      description:
        "Instruções de instalação do objeto de aprendizagem na plataforma especificada.",
      subElements: [
        {
          name: "Specific Installation Remarks",
          description:
            "Instruções de instalação do objeto de aprendizagem na plataforma especificada.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "String (1000)",
          valueSpace: "Defined by IEEE-LOM 4.5",
          examples: [
            '"Unzip the zip file and launch index.html in your web browser."',
          ],
        },
      ],
    }
  );
  specificOtherPlatformRequirements: LangStringType = new LangStringType(
    1,
    1,
    "Specific Other Platform Requirements",
    {
      name: "Specific Other Platform Requirements",
      description:
        "Informações sobre outros requisitos de software e hardware necessários na plataforma definida.",
      subElements: [
        {
          name: "Specific Other Platform Requirements",
          description:
            "Informações sobre outros requisitos de software e hardware necessários na plataforma definida.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "String (1000)",
          valueSpace: "Defined by IEEE-LOM 4.6",
          examples: ['"sound card"', '"runtime X" (IEEE-LOM 4.6)'],
        },
      ],
    }
  );

  constructor(
    minCardinality: number,
    maxCardinality: number,
    name: string,
    schema: MetadataEntrySchema
  ) {
    let innerSchema = schema.subElements.find((item) => item.name === name);
    this.nodeInfo = new NodeInfo(
      minCardinality,
      maxCardinality,
      innerSchema.description,
      "root"
    );

    this.nodeInfo.metadataEntrySchema = innerSchema;
  }
}

class SpecificRequirement extends ArrayInfo {
  override childType: SpecificOrCompositeType = new SpecificOrCompositeType();
  nodeInfo: NodeInfo;
  specificOrComposite: Array<SpecificOrCompositeType> = [];

  constructor() {
    super();

    let scheme: MetadataEntrySchema = {
      name: "Specific Requirement",
      description:
        "Requisitos técnicos específicos necessários para suportar o uso deste objeto de aprendizagem em uma plataforma específica.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "aggregate",
    };
    this.nodeInfo = new NodeInfo(
      scheme.minCardinality,
      scheme.maxCardinality,
      scheme.description,
      "root"
    );
  }

  getSpecificTypes(): Array<string> {
    return Object.values(SpecificType);
  }

  getSpecificNames(type: string): Array<string> {
    switch (type) {
      case "browser":
        return Object.values(SpecificBrowsers);
      case "operating system":
        return Object.values(SpecificOperatingSystems);
      case "middleware":
        return Object.values(SpecificMiddleware);
      default:
        return [...Object.values(Browsers), ...Object.values(OperatingSystems)];
    }
  }
}

class SpecificOrCompositeType extends ArrayInfo {
  override childType: SpecificOrComposite = new SpecificOrComposite();
  nodeInfo: NodeInfo;
  specificOrComposite: Array<SpecificOrComposite> = [];

  constructor() {
    super();

    let schema: MetadataEntrySchema = {
      name: "Specific Or Composite",
      description:
        "Agrupa múltiplas condições alternativas específicas para atender ao requisito técnico em uma plataforma específica.",
      minCardinality: 0,
      maxCardinality: 20,
      order: "unordered",
      dataType: "aggregate",
    };

    this.nodeInfo = new NodeInfo(0, 40, schema.description, "root");
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

class SpecificOrComposite {
  specificType: SpecificType = new SpecificType(1, 1, "Specific Type", {
    name: "Specific Type",
    description:
      "Define o tipo específico de condição alternativa associada ao requisito técnico em uma plataforma específica.",
    subElements: [
      {
        name: "Specific Type",
        description:
          "Define o tipo específico de condição alternativa associada ao requisito técnico em uma plataforma específica.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "Vocabulary (Enumerated)",
        valueSpace: '"hardware", "software", "platform", "browser"',
        examples: ['"hardware"', '"software"', '"platform"', '"browser"'],
      },
    ],
  });
  specificName: SpecificName = new SpecificName(1, 1, "Specific Name", {
    name: "Specific Name",
    description:
      "O nome específico associado ao requisito técnico em uma plataforma específica.",
    subElements: [
      {
        name: "Specific Name",
        description:
          "O nome específico associado ao requisito técnico em uma plataforma específica.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "CharacterString",
        valueSpace: "Definido pelo tipo específico.",
        examples: ['"Intel Processor"', '"Chrome Browser"'],
      },
    ],
  });
  specificMinimumVersion: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Specific Minimum Version",
    {
      name: "Specific Minimum Version",
      description:
        "Versão mínima da tecnologia requerida na plataforma específica.",
      subElements: [
        {
          name: "Specific Minimum Version",
          description:
            "Versão mínima da tecnologia requerida na plataforma específica.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "Version format (e.g., '1.0', '2.5')",
          examples: ['"10.0"', '"80.0"'],
        },
      ],
    }
  );
  specificMaximumVersion: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Specific Maximum Version",
    {
      name: "Specific Maximum Version",
      description:
        "Maior versão aceitável da tecnologia requerida na plataforma específica.",
      subElements: [
        {
          name: "Specific Maximum Version",
          description:
            "Maior versão aceitável da tecnologia requerida na plataforma específica.",
          minCardinality: 1,
          maxCardinality: 1,
          order: "unspecified",
          dataType: "CharacterString",
          valueSpace: "Version format (e.g., '1.0', '2.5')",
          examples: ['"11.0"', '"89.0"'],
        },
      ],
    }
  );
}

class ServiceType extends ArrayInfo {
  override childType: Service = new Service();
  nodeInfo: NodeInfo;
  serviceType: Array<Service> = [];

  constructor() {
    super();

    let schema: MetadataEntrySchema = {
      name: "Service",
      description:
        "Container para a especificação de serviços relacionados a este objeto.",
      minCardinality: 0,
      maxCardinality: 100,
      order: "unspecified",
      dataType: "Container",
    };

    this.nodeInfo = new NodeInfo(0, 100, schema.description, "root");
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

class Service {
  nodeInfo: NodeInfo;
  name: CharacterStringType = new CharacterStringType(1, 1, "Name", {
    name: "Name",
    description:
      "O nome do serviço. Pode ser um conceito definido pela ontologia associada.",
    subElements: [
      {
        name: "Name",
        description:
          "O nome do serviço. Pode ser um conceito definido pela ontologia associada.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "CharacterString",
        examples: [
          '"portuguese content recommendation"',
          '"web search"',
          '"question-answer user interface"',
          '"instant messaging"',
        ],
      },
    ],
  });
  type: CharacterStringType = new CharacterStringType(1, 1, "Type", {
    name: "Type",
    description:
      "O tipo do serviço. Também pode ser um conceito definido pela ontologia associada.",
    subElements: [
      {
        name: "Type",
        description:
          "O tipo do serviço. Também pode ser um conceito definido pela ontologia associada.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "CharacterString",
        examples: [
          '"recommendation"',
          '"search-engine"',
          '"fipa-df"',
          '"fipa-ams"',
          '"persistence"',
          '"SMS provider"',
        ],
      },
    ],
  });
  provides: BooleanType = new BooleanType(1, 1, "Provides", {
    name: "Provides",
    description:
      "Define se o objeto fornece ou solicita o serviço. Este metadado define o uso do metadado location.",
    subElements: [
      {
        name: "Provides",
        description:
          "Define se o objeto fornece ou solicita o serviço. Este metadado define o uso do metadado location.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "boolean",
        examples: [
          "True: o serviço é fornecido pelo objeto",
          "False: o serviço é solicitado pelo objeto",
        ],
      },
    ],
  });
  essential: BooleanType = new BooleanType(1, 1, "Essential", {
    name: "Essential",
    description:
      "Define se o serviço é obrigatório (essencial) ou opcional em relação à correta execução do objeto.",
    subElements: [
      {
        name: "Essential",
        description:
          "Define se o serviço é obrigatório (essencial) ou opcional em relação à correta execução do objeto.",
        minCardinality: 1,
        maxCardinality: 1,
        order: "unspecified",
        dataType: "boolean",
        examples: [
          "True: o serviço é obrigatório",
          "False: o serviço é opcional",
        ],
      },
    ],
  });
  protocol: CharacterStringType = new CharacterStringType(1, 100, "Protocol", {
    name: "Protocol",
    description:
      "O nome do protocolo utilizado para comunicação com o serviço. É uma informação dependente de cada serviço. O valor também pode ser associado a um conceito ou indivíduo presente na ontologia.",
    subElements: [
      {
        name: "Protocol",
        description:
          "O nome do protocolo utilizado para comunicação com o serviço. É uma informação dependente de cada serviço. O valor também pode ser associado a um conceito ou indivíduo presente na ontologia.",
        minCardinality: 0,
        maxCardinality: 40,
        order: "unspecified",
        dataType: "CharacterString",
        examples: ['"fipa-request"', '"SPARQL"', '"JSP"', '"HTTP"', '"RMI"'],
      },
    ],
  });
  ontology: OntologyType = new OntologyType();
  language: CharacterStringType = new CharacterStringType(0, 100, "Language");
  details: DetailsType = new DetailsType();

  constructor() {
    let schema: MetadataEntrySchema = {
      name: "Service",
      description:
        "Container para a especificação de serviços relacionados a este objeto.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unspecified",
      dataType: "Container",
    };

    this.nodeInfo = new NodeInfo(
      schema.minCardinality,
      schema.maxCardinality,
      schema.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

class OntologyType extends ArrayInfo {
  override childType: Ontology = new Ontology();
  nodeInfo: NodeInfo;
  ontologyType: Array<Ontology> = [];

  constructor() {
    super();
    let schema: MetadataEntrySchema = {
      name: "Ontology",
      description:
        "Ontologias associadas a este serviço. Geralmente este tipo de ontologia fornece uma especificação formal do contexto do serviço.",
      subElements: [
        {
          name: "Ontology",
          description:
            "Ontologias associadas a este serviço. Geralmente este tipo de ontologia fornece uma especificação formal do contexto do serviço.",
          minCardinality: 0,
          maxCardinality: 40,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"OBAA Ontology"', '"WordNet"', '"GU MO"'],
        },
      ],
    };

    this.nodeInfo = new NodeInfo(
      schema.minCardinality,
      schema.maxCardinality,
      schema.description,
      "root"
    );
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

class Ontology {
  nodeInfo: NodeInfo;
  ontologyLanguage: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Ontology Language",
    {
      name: "Ontology Language",
      description: "A linguagem utilizada para especificar a ontologia.",
      subElements: [
        {
          name: "Ontology Language",
          description: "A linguagem utilizada para especificar a ontologia.",
          minCardinality: 0,
          maxCardinality: 40,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"OWL-FULL"', '"OWL-DL"', '"OWL-RDF"'],
        },
      ],
    }
  );
  ontologyLocation: CharacterStringType = new CharacterStringType(
    1,
    1,
    "Ontology Location",
    {
      name: "Ontology Location",
      description:
        "A URL, URI ou qualquer outra especificação da localização eletrônica da ontologia.",
      subElements: [
        {
          name: "Ontology Location",
          description:
            "A URL, URI ou qualquer outra especificação da localização eletrônica da ontologia.",
          minCardinality: 0,
          maxCardinality: 40,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"http://giani.ufrgs.br/"'],
        },
      ],
    }
  );

  constructor() {
    let schema: MetadataEntrySchema = {
      name: "Ontology",
      description:
        "Ontologias associadas a este serviço. Geralmente este tipo de ontologia fornece uma especificação formal do contexto do serviço.",
      subElements: [
        {
          name: "Ontology",
          description:
            "Ontologias associadas a este serviço. Geralmente este tipo de ontologia fornece uma especificação formal do contexto do serviço.",
          minCardinality: 0,
          maxCardinality: 40,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"OBAA Ontology"', '"WordNet"', '"GU MO"'],
        },
      ],
    };

    this.nodeInfo = new NodeInfo(0, 1, schema.description, "root");
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

class DetailsType {
  nodeInfo: NodeInfo;
  details: CharacterStringType = new CharacterStringType(1, 20, "Details", {
    name: "Details",
    description:
      "Especificação de detalhes do serviço fora do escopo de metadados (ex.: parâmetros).",
    subElements: [
      {
        name: "Details",
        description:
          "Especificação de detalhes do serviço fora do escopo de metadados (ex.: parâmetros).",
        minCardinality: 0,
        maxCardinality: 20,
        order: "unspecified",
        dataType: "CharacterString",
        examples: ['"request: learner information"'],
      },
    ],
  });
  serviceLocation: CharacterStringType = new CharacterStringType(
    1,
    20,
    "Service Location",
    {
      name: "Service Location",
      description:
        "A URL, URI ou qualquer outra especificação para acessar o serviço.",
      subElements: [
        {
          name: "Service Location",
          description:
            "A URL, URI ou qualquer outra especificação para acessar o serviço.",
          minCardinality: 1,
          maxCardinality: 20,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"http://gia.inf.ufrgs.br/recommendation"'],
        },
      ],
    }
  );

  constructor() {
    let schema: MetadataEntrySchema = {
      name: "Details",
      description:
        "Especificação de detalhes do serviço fora do escopo de metadados (ex.: parâmetros).",
      subElements: [
        {
          name: "Details",
          description:
            "Especificação de detalhes do serviço fora do escopo de metadados (ex.: parâmetros).",
          minCardinality: 0,
          maxCardinality: 20,
          order: "unspecified",
          dataType: "CharacterString",
          examples: ['"request: learner information"'],
        },
      ],
    };
    this.nodeInfo = new NodeInfo(0, 20, schema.description, "root");
    this.nodeInfo.metadataEntrySchema = schema;
  }
}

export const LOMBaseSchema: MetadataEntrySchema = {
  name: "Technical",
  description:
    "Agrupa os requisitos técnicos e as características técnicas do objeto de aprendizagem.",
  order: "unspecified",
  subElements: [
    {
      name: "Format",
      description:
        "Os tipos de dados técnicos usados para codificar este objeto de aprendizagem. Exemplos incluem MIME types.",
      minCardinality: 1,
      maxCardinality: 40,
      order: "unordered",
      dataType: "CharacterString",
      valueSpace: "MIME types (IETF RFC 2046)",
      examples: ['"video/mpeg"', '"text/html"', '"application/pdf"'],
    },
    {
      name: "Size",
      description:
        "O tamanho deste objeto de aprendizagem em bytes. Este é um valor inteiro representando o número de bytes.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "CharacterString",
      valueSpace: "Non-negative integer values",
      examples: ['"102400"', '"2048"'],
    },
    {
      name: "Location",
      description:
        "Um local onde este objeto de aprendizagem está ou pode ser encontrado. Este é tipicamente um URL ou URI.",
      minCardinality: 1,
      maxCardinality: 10,
      order: "unordered",
      dataType: "CharacterString",
      valueSpace: "URI",
      examples: ['"https://example.com/resource.pdf"'],
    },
    {
      name: "Requirement",
      description:
        "Descreve os requisitos técnicos necessários para usar este objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "aggregate",
      subElements: [
        {
          name: "OrComposite",
          description:
            "Define um conjunto alternativo de condições para satisfazer este requisito.",
          minCardinality: 1,
          maxCardinality: 40,
          order: "unordered",
          dataType: "aggregate",
          subElements: [
            {
              name: "Type",
              description: "O tipo de requisito.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              dataType: "Vocabulary (Enumerated)",
              valueSpace:
                '"operating system", "browser", "software", "hardware"',
              examples: ['"operating system"', '"browser"'],
            },
            {
              name: "Name",
              description: "O nome do requisito.",
              minCardinality: 1,
              maxCardinality: 1,
              order: "unspecified",
              dataType: "CharacterString",
              valueSpace: "Defined according to the Type.",
              examples: ['"Windows"', '"Chrome"'],
            },
            {
              name: "Minimum Version",
              description: "A versão mínima requerida para o requisito.",
              minCardinality: 0,
              maxCardinality: 1,
              order: "unspecified",
              dataType: "CharacterString",
              valueSpace: "Version format (e.g., '1.0', '2.5')",
              examples: ['"10.0"', '"80.0"'],
            },
            {
              name: "Maximum Version",
              description: "A versão máxima suportada pelo requisito.",
              minCardinality: 0,
              maxCardinality: 1,
              order: "unspecified",
              dataType: "CharacterString",
              valueSpace: "Version format (e.g., '1.0', '2.5')",
              examples: ['"11.0"', '"89.0"'],
            },
          ],
        },
      ],
    },
    {
      name: "Installation Remarks",
      description:
        "Comentários ou instruções para instalar este objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 2000 caracteres)",
      examples: [
        '("en", "Extract the ZIP file and run the setup executable.")',
      ],
    },
    {
      name: "Other Platform Requirements",
      description:
        "Outros requisitos de plataforma que não estão cobertos por requisitos mais específicos.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "LangString",
      valueSpace: "CharacterString (máximo permitido: 2000 caracteres)",
      examples: ['("en", "Requires a GPU with DirectX 12 support.")'],
    },
    {
      name: "Duration",
      description:
        "Tempo ou duração típica necessária para usar este objeto de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Duration",
      valueSpace: "ISO 8601 duration format",
      examples: ['"PT1H30M"', '"PT45M"'],
    },
    {
      name: "Supported Platforms",
      description:
        "Lista de plataformas digitais para as quais o Objeto de Aprendizagem está previsto: Web, DTV e Mobile. Item não obrigatório, para manter compatibilidade LOM, mas recomendável.",
      minCardinality: 0,
      maxCardinality: 10,
      order: "unspecified",
      dataType: "string",
      valueSpace: "Mobile, DTV, Web",
      examples: ['"DTV"', '"Web"'],
    },
  ],
};
