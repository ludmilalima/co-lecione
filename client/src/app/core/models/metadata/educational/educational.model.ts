import { CharacterStringType, DurationType, LangStringType } from "../util.model";
import { Context } from "./enums/context.enum";
import { Difficulty } from "./enums/difficulty.enum";
import { IntendedEndUserRole } from "./enums/intended-end-user-role.enum";
import { InteractivityLevel } from "./enums/interactivity-level.enum";
import { InteractivityType } from "./enums/interactivity-type.enum";
import { LearningResourceType } from "./enums/learning-resource-type.enum";
import { SemanticDensity } from "./enums/semantic-density.enum";

export class Educational {
    minOccurs: number = 0;
    maxOccurs: number = 100;
    interactivityType: InteractivityType = new InteractivityType(0, 1);
    learningResourceType: LearningResourceType = new LearningResourceType(0, 10);
    interactivityLevel: InteractivityLevel = new InteractivityLevel(0, 1);
    semanticDensity: SemanticDensity = new SemanticDensity(0, 1);
    intendedEndUserRole: IntendedEndUserRole = new IntendedEndUserRole(0, 10);
    context: Context = new Context(0, 10);
    typicalAgeRange: LangStringType = new LangStringType(0, 5);
    difficulty: Difficulty = new Difficulty(0, 1);
    typicalLearningTime: DurationType;
    description: LangStringType = new LangStringType(0, 10);
    language: CharacterStringType = new CharacterStringType(0, 10);
}