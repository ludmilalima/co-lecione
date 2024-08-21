import * as mimeDb from 'mime-db';
import { VocabularyType } from '../../util.model';

export class MimeType extends VocabularyType{
    override value: string;
    mimeTypes: { [key: string]: string } = mimeDb;

    getValueOptions(): string[] {
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