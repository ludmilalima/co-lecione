import { VocabularyType } from "../../util.model";

export class Structure extends VocabularyType {
    override value: StructureValue;
}

enum StructureValue {
    atomic = "atomic",
    collection = "collection",
    networked = "networked",
    hierarchical = "hierarchical",
    linear = "linear",
}