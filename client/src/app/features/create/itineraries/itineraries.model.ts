export class Itineraries {
    content: Array<{ position: number, objectId: number }>;
    metadata: Array<{ key: string, value: string }>;

    constructor(
        content: Array<{ position: number, objectId: number }>,
        metadata: Array<{ key: string, value: string }>) {
        content.forEach(item => {
            if (!item.position) {
                throw new Error('É obrigatório o preenchimento da chave do conteúdo.');
            }
            if (!item.objectId) {
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
        this.content = content;
        this.metadata = metadata;
    }
}