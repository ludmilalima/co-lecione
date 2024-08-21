import { VocabularyType } from "../../util.model";

export class ColorAvoidance extends VocabularyType {
    override source = 'OBAA';
    override value = ColorAvoidanceEnum;

    getValueOptions(): Array<string> {
        return Object.values(ColorAvoidanceEnum);
    }
}

enum ColorAvoidanceEnum {
    AvoidRed = "avoidRed",
    AvoidRedGreen = "avoidRedGreen",
    AvoidBlueYellow = "avoidBlueYellow",
    AvoidGreenYellow = "avoidGreenYellow",
    AvoidOrange = "avoidOrange",
    AvoidRedBlack = "avoidRedBlack",
    AvoidPurpleGray = "avoidPurpleGray",
    UseMaximumContrast = "useMaximumContrast",
    Monochrome = "monochrome"
}