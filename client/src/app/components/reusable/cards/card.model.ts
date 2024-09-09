export class Card {
    avatarSrc?: string;
    headerImageSrc?: string;
    title?: string;
    subtitle?: string;
    content?: Object;
    actionTitle?: string;
    actionLink?: string;

    constructor(card: Array<{ key: string, value: string }>) {
        card.forEach(item => {
            switch (item.key) {
                case 'avatarSrc':
                    this.avatarSrc = item.value;
                    break;
                case 'headerImageSrc':
                    this.headerImageSrc = item.value;
                    break;
                case 'title':
                    this.title = item.value;
                    break;
                case 'subtitle':
                    this.subtitle = item.value;
                    break;
                case 'content':
                    this.content = item.value;
                    break;
                case 'actionTitle':
                    this.actionTitle = item.value;
                    break
                case 'actionLink':
                    this.actionLink = item.value;
                    break;
                default:
                    throw new Error(`Chave desconhecida: ${item.key}`);
            }
        });
    }
}