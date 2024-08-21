import { DateTimeValidatorService } from "../services/date-time-validator.service";
import { LangStringValidatorService } from "../services/lang-string-validator.service";
import { CharacterStringType, DateTimeType, LangStringType } from "../util.model";

export class Annotation {
    minOccurs: number = 0;
    maxOccurs: number = 30;
    entity: CharacterStringType = new CharacterStringType(0, 1);
    date: DateTimeType = new DateTimeType;
    description: LangStringType = new LangStringType(0, 1);

    private dateTimeValidatorService: DateTimeValidatorService;
    private langStringValidatorService: LangStringValidatorService;

    setEntity(entity: string): void {
        this.entity.content.push(entity);
    }

    setDate(date: DateTimeType): void {
        if (!this.dateTimeValidatorService.isValidDateTime(date.dateTime)) {
            throw new Error('Invalid DateTime "dateTime" string');
        } if (!this.langStringValidatorService.validateLangString(date.description.langString[0])) {
            throw new Error('Invalid DataTime "description" string');

        } else {
            this.date = date;
        }
    }

    setDescription(description: LangStringType): void {
        if (!this.langStringValidatorService.validateLangString(description.langString[0])) {
            throw new Error('Invalid LangString string');
        } else {
            this.description = description;
        }
    }
}