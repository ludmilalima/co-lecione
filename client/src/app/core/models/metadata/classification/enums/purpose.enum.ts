import { VocabularyType } from "../../util.model";

export class Purpose extends VocabularyType {
    override value: PurposeEnum;
}

enum PurposeEnum {
    Discipline = "discipline",
    Idea = "idea",
    Prerequisite = "prerequisite",
    EducationalObjective = "educational objective",
    AccessibilityRestrictions = "accessibility restrictions",
    EducationalLevel = "educational level",
    SkillLevel = "skill level",
    SecurityLevel = "security level",
    Competency = "competency"
}