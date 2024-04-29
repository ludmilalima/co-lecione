import mongoose, { Schema } from 'mongoose';

export interface Card extends mongoose.Document {
    avatarSrc?: string;
    headerImageSrc?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    action?: string;
    resourceType: string;
    metadata: { key: string, value: string }[];
}

const CardSchema: Schema<Card> = new mongoose.Schema({
    avatarSrc: {
        type: String,
        required: false
    },
    headerImageSrc: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    action: {
        type: String,
        required: false
    },
    resourceType: {
        type: String,
        required: true
    },
    metadata: [{
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }]
});

const CardModel = mongoose.model<Card>('Card', CardSchema);
export default CardModel;