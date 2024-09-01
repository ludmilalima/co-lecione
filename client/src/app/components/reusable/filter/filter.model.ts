export class UnitSelect {
    label: string;
    options: Array<string>;

    constructor(label: string, options: Array<string>) {
        this.label = label;
        this.options = options;
    }
}

export class SimpleTextInput {
    key: string;
    value: string;
    label: string;
    required?: boolean;

    constructor(key: string, label: string) {
        this.key = key;
        this.label = label;
    }
}