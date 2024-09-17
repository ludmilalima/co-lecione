export class Objects {
    _id?: string;
    type: string;
    content: Array<{ key: string, value: string }>;
    metadata: Array<{ key: string, value: string }>;

    constructor(
        type: string,
        content: Array<{ key: string, value: string }>,
        metadata: Array<{ key: string, value: string }>) {
        if (!type) {
            throw new Error('É obrigatória a especificação do tipo do objeto.');
        }
        content.forEach(item => {
            if (!item.key) {
                throw new Error('É obrigatório o preenchimento da chave do conteúdo.');
            }
            if (!item.value) {
                throw new Error('É obrigatório o preenchimento do valor do conteúdo.');
            }
        });
        metadata.forEach(item => {
            if (!item.key) {
                throw new Error('É obrigatório o preenchimento da chave do metadado.');
            }
            if (!item.value) {
                throw new Error('É obrigatório o preenchimento do valor do metadado.');
            }
        });
        this.type = type;
        this.content = content;
        this.metadata = metadata;
    }
}