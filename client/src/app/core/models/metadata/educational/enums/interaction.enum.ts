import { VocabularyType } from "../../util.model";
import { Perception } from "./perception.enum";
import { Reciprocity } from "./reciprocity.enum";

export class Interaction extends VocabularyType {
    override source: string = 'BOAA';
    override value: InteractionEnum;
    perception: Perception = new Perception(1, 1);
    synchronism: boolean;
    coPresence: boolean;
    reciprocity: Reciprocity = new Reciprocity(1, 1);

    getValueOptions(): Array<string> {
        return Object.values(InteractionEnum);
    }
}

enum InteractionEnum {
    objetoSujeito = 'objeto-sujeito',
    sujeito1Sujeito2Objeto = 'sujeito1-sujeito2-objeto',
}