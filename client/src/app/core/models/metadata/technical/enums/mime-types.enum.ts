import * as mimeDb from 'mime-db';
import { VocabularyType } from '../../util.model';

export class MimeType extends VocabularyType{
    override value: string;

    getValueOptions(): string[] {
        return Object.values(TopLevel);
    }

    getMimeSubtypes(topLevel: string): string[] {
        return Object.keys(mimeDb)
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