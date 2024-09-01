import { VocabularyType } from "../../util.model";

export class OperatingSystems extends VocabularyType {
    override value: OperatingSystemsEnum;

    override getValueOptions(): Array<string> {
        return Object.values(OperatingSystemsEnum);
    }
}

enum OperatingSystemsEnum {
    pcDos = 'pc-dos',
    msWindows = 'ms-windows',
    macos = 'macos',
    unix = 'unix',
    multiOs = 'multi-os',
    none = 'none'
}

export class Browsers extends VocabularyType {
    override value: BrowsersEnum;

    override getValueOptions(): Array<string> {
        return Object.values(BrowsersEnum);
    }
}

enum BrowsersEnum {
    any = 'any',
    netscapeCommunicator = 'netscape-communicator',
    msInternetExplorer = 'ms-internet-explorer',
    opera = 'opera',
    amaya = 'amaya',
}