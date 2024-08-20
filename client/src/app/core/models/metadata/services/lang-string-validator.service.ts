import { Injectable } from '@angular/core';
import { IsoLanguageCodeEnum } from '../accessibility/enums/iso-language-code.enum';

@Injectable({
    providedIn: 'root',
})
export class LangStringValidatorService {
    constructor() { }

    validateLangString(langString: { content: string; language: IsoLanguageCodeEnum }): boolean {
        return this.validateLanguage(langString.language) && this.validateString(langString.content);
    }

    private validateLanguage(language: IsoLanguageCodeEnum): boolean {
        const languageRegex = /^[a-z]{2,3}(-[A-Z]{2})?(-[a-zA-Z0-9]{3,8})*$/;

        return languageRegex.test(language);
    }

    private validateString(content: string): boolean {
        // Verifica se a string não está vazia e se contém caracteres válidos
        return typeof content === 'string' && content.trim().length > 0;
    }
}
