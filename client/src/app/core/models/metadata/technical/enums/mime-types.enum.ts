import * as mimeDb from 'mime-db';

export class MimeTypes {
    private mimeTypes: { [key: string]: string } = mimeDb;

    getTopLevelMimeTypes(): string[] {
        return Object.values(TopLevel);
    }

    getMimeSubtypes(topLevel: string): string[] {
        return Object.keys(this.mimeTypes)
            .filter(key => key.startsWith(topLevel));
    }
}

enum TopLevel {
    application = 'application',
    audio = 'audio',
    font = 'font',
    image = 'image',
    message = 'message',
    model = 'model',
    multipart = 'multipart',
    text = 'text',
    video = 'video'
}