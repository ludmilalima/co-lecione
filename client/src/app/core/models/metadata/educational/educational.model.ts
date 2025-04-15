import {
  CharacterStringType,
  DurationType,
  LangStringType,
  MetadataEntrySchema,
  NodeInfo,
} from "../util.model";
import { Context } from "./enums/context.enum";
import { DidacticStrategy } from "./enums/didactic-strategy.enum";
import { Difficulty } from "./enums/difficulty.enum";
import { IntendedEndUserRole } from "./enums/intended-end-user-role.enum";
import { InteractionType } from "./enums/interaction.enum";
import { InteractivityLevel } from "./enums/interactivity-level.enum";
import { InteractivityType } from "./enums/interactivity-type.enum";
import { LearningContentType } from "./enums/learning-content-type.enum";
import { LearningResourceType } from "./enums/learning-resource-type.enum";
import { SemanticDensity } from "./enums/semantic-density.enum";

export class Educational {
  nodeInfo: NodeInfo;
  interactivityType: InteractivityType = new InteractivityType(
    0,
    1,
    "Interactivity Type",
    LOMBaseSchema
  );
  learningResourceType: LearningResourceType = new LearningResourceType(
    0,
    10,
    "Learning Resource Type",
    LOMBaseSchema
  );
  interactivityLevel: InteractivityLevel = new InteractivityLevel(
    0,
    1,
    "Interactivity Level",
    LOMBaseSchema
  );
  semanticDensity: SemanticDensity = new SemanticDensity(
    0,
    1,
    "Semantic Density",
    LOMBaseSchema
  );
  intendedEndUserRole: IntendedEndUserRole = new IntendedEndUserRole(
    0,
    10,
    "Intended End User Role",
    LOMBaseSchema
  );
  context: Context = new Context(0, 10, "Context", LOMBaseSchema);
  typicalAgeRange: LangStringType = new LangStringType(
    0,
    5,
    "Typical Age Range",
    LOMBaseSchema
  );
  difficulty: Difficulty = new Difficulty(0, 1, "Difficulty", LOMBaseSchema);
  typicalLearningTime: DurationType = new DurationType(1, 1, "Typical Learning Time", LOMBaseSchema);
  description: LangStringType = new LangStringType(
    0,
    10,
    "Description",
    LOMBaseSchema
  );
  language: CharacterStringType = new CharacterStringType(
    0,
    10,
    "Language",
    LOMBaseSchema
  );
  learningContentType: LearningContentType = new LearningContentType(
    1,
    1,
    "Learning Content Type",
    LOMBaseSchema
  );
  interaction: InteractionType = new InteractionType();
  didacticStrategy: DidacticStrategy = new DidacticStrategy(
    0,
    40,
    "Didactic Strategy",
    LOMBaseSchema
  );

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

const LOMBaseSchema: MetadataEntrySchema = {
  name: "Educational",
  description:
    "Esta categoria descreve as características educacionais e pedagógicas do objeto de aprendizagem. Estas características são relevantes para aqueles que utilizam o objeto de aprendizagem em um contexto educacional ou de ensino.",
  minCardinality: 0,
  maxCardinality: 100,
  order: "unspecified",
  dataType: "Container",
  subElements: [
    {
      name: "Interactivity Type",
      description:
        "O tipo de interatividade que caracteriza o recurso de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary",
      valueSpace: "active, expositive, mixed",
      examples: ["active", "expositive", "mixed"],
    },
    {
      name: "Learning Resource Type",
      description: "O tipo do recurso de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unspecified",
      dataType: "Vocabulary",
      valueSpace:
        "exercise, simulation, questionnaire, diagram, figure, graph, index, slide, table, narrative text, exam, experiment, problem statement, self-assessment, lecture",
      examples: [
        "exercise",
        "simulation",
        "questionnaire",
        "diagram",
        "figure",
      ],
    },
    {
      name: "Interactivity Level",
      description:
        "O nível de interatividade que caracteriza o recurso de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary",
      valueSpace: "very low, low, medium, high, very high",
      examples: ["low", "medium", "high"],
    },
    {
      name: "Semantic Density",
      description:
        "O grau de concisão com que o recurso de aprendizagem apresenta ideias e informações.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary",
      valueSpace: "very low, low, medium, high, very high",
      examples: ["very low", "medium"],
    },
    {
      name: "Intended End User Role",
      description:
        "O principal papel de usuário final para o qual o recurso de aprendizagem foi projetado.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "Vocabulary",
      valueSpace: "teacher, author, learner, manager",
      examples: ["teacher", "learner"],
    },
    {
      name: "Context",
      description:
        "O contexto educacional para o qual o recurso de aprendizagem foi projetado.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "Vocabulary",
      valueSpace: "school, higher education, training, other",
      examples: ["school", "higher education"],
    },
    {
      name: "Typical Age Range",
      description:
        "A faixa etária típica do público para o qual o recurso de aprendizagem foi projetado.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "String",
      examples: ["7-9", "18-25"],
    },
    {
      name: "Difficulty",
      description: "O nível de dificuldade do recurso de aprendizagem.",
      minCardinality: 1,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Vocabulary",
      valueSpace: "very easy, easy, medium, difficult, very difficult",
      examples: ["easy", "medium", "difficult"],
    },
    {
      name: "Typical Learning Time",
      description:
        "O tempo típico necessário para aprender a usar o recurso de aprendizagem.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "Duration",
      examples: ["PT1H30M"],
    },
    {
      name: "Description",
      description: "Comentários sobre como o recurso de aprendizagem é usado.",
      minCardinality: 0,
      maxCardinality: 1,
      order: "unspecified",
      dataType: "LangString",
    },
    {
      name: "Language",
      description:
        "O idioma no qual o recurso de aprendizagem está disponível.",
      minCardinality: 0,
      maxCardinality: 40,
      order: "unordered",
      dataType: "CharacterString",
      examples: ["en", "pt", "es"],
    },
    {
      name: "Learning Content Type",
      description:
        "Especificação educacional do tipo do conteúdo do objeto de aprendizagem.",
      minCardinality: 1,
      valueSpace: "Factual, Conceitual, Procedimental, Atitudinal",
      dataType: "Vocabulário (enumerado)",
      examples: ["Conceitual"],
    },
    {
      name: "Interaction",
      description:
        "Especifica a interação educacional proposta por este objeto de aprendizagem e seu(s) usuários.",
      minCardinality: 1,
      valueSpace: "Objeto-sujeito, Sujeito 1 – sujeito 2, Objeto",
      dataType: "Vocabulário (enumerado)",
      examples: ["Objeto-sujeito"],
    },
    {
      name: "Didactic Strategy",
      description:
        "Conjunto de ações planejadas e conduzidas pelo professor a fim de promover o envolvimento e comprometimento dos alunos com um conjunto maior de atividades.",
      minCardinality: 0,
      maxCardinality: 40,
      valueSpace:
        "Model Construction, Challenge, Hypothesis and Test Development, Case Study, Question & Answering, Problem Solving",
      dataType: "Vocabulário (enumerado)",
      examples: ["Challenge", "Problem Solving"],
    },
  ],
};
