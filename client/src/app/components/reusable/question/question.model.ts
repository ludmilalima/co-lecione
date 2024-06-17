import { FormArray } from "@angular/forms";

export class Question {
    topic?: string;
    note?: string;
    figureSrc?: string;
    statement?: string;
    alternatives?: string[];
    discursive?: boolean;
    selectedAlternatives?: FormArray;

    constructor(question: Array<{ key: string, value: string }>) {
        question.forEach(item => {
            switch (item.key) {
                case 'topic':
                    this.topic = item.value;
                    break;
                case 'note':
                    this.note = item.value;
                    break;
                case 'figureSrc':
                    this.figureSrc = item.value;
                    break;
                case 'statement':
                    this.statement = item.value;
                    break;
                case 'alternatives':
                    this.alternatives = item.value.split(',');
                    break;
                case 'discursive':
                    this.discursive = item.value === 'true';
                    break;
                default:
                    throw new Error(`Chave desconhecida: ${item.key}`);
            }
        });
    }
}