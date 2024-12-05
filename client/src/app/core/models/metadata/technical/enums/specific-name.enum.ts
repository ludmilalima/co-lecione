import { VocabularyType } from "../../util.model";

export class SpecificName extends VocabularyType {
  override value: SpecificNameEnum;

  override getValueOptions(): Array<string> {
    return Object.values(SpecificNameEnum);
  }
}

enum SpecificNameEnum {
  pcDos = "pc-dos",
  msWindows = "ms-windows",
  macOs = "macos",
  unix = "unix",
  multiOs = "multi-os",
  netscapeCommunicator = "netscape-communicator",
  msInternetExplorer = "ms-internet-explorer",
  opera = "opera",
  amaya = "amaya",
  mozillaFirefox = "mozilla-firefox",
  appleSafari = "apple-safari",
  googleChrome = "google-chrome",
  ginga = "ginga",
  mhp = "mhp",
  arib = "arib",
  davic = "davic",
  dase = "dase",
  gem = "gem",
  any = "any",
  none = "none",
}

export class SpecificOperatingSystems extends VocabularyType {
  override value: SpecificOperatingSystemsEnum;

  override getValueOptions(): Array<string> {
    return Object.values(SpecificOperatingSystemsEnum);
  }
}

enum SpecificOperatingSystemsEnum {
  pcDos = "pc-dos",
  msWindows = "ms-windows",
  macOs = "macos",
  unix = "unix",
  multiOs = "multi-os",
  none = "none",
}

export class SpecificBrowsers extends VocabularyType {
  override value: SpecificBrowsersEnum;

  override getValueOptions(): Array<string> {
    return Object.values(SpecificOperatingSystemsEnum);
  }
}

enum SpecificBrowsersEnum {
  any = "any",
  netscapeCommunicator = "netscape-communicator",
  msInternetExplorer = "ms-internet-explorer",
  opera = "opera",
  amaya = "amaya",
  mozillaFirefox = "mozilla-firefox",
  appleSafari = "apple-safari",
  googleChrome = "google-chrome",
}

export class SpecificMiddleware extends VocabularyType {
  override value: SpecificMiddlewareEnum;

  override getValueOptions(): Array<string> {
    return Object.values(SpecificMiddlewareEnum);
  }
}

enum SpecificMiddlewareEnum {
  ginga = "ginga",
  mhp = "mhp",
  arib = "arib",
  davic = "davic",
  dase = "dase",
  gem = "gem",
  any = "any",
  none = "none",
}
