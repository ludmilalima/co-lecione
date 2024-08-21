import { VocabularyType } from "../../util.model";

export class SignLanguage extends VocabularyType {
    override source = 'OBAA';
    override value = SignLanguageEnum;

    getValueOptions(): Array<string> {
        return Object.values(SignLanguageEnum);
    }
}

enum SignLanguageEnum {
    AmericanASL = "American-ASL",
    BritishBSL = "British-BSL",
    BrazilianBRA = "Brazilian-BRA",
    NativeGuaraniGUA = "Native-Guarani-GUA",
    SpanishSPA = "Spanish-SPA",
    FrenchLSF = "French-LSF",
    JapaneseJSL = "Japanese-JSL",
    OTHER = "OTHER"
}