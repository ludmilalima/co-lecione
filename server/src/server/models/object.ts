import mongoose, { Schema } from "mongoose";

export interface Object extends mongoose.Document {
    type: string;
    content: { key: string, value: string }[];
    metadata: { key: string, value: string }[];
}

const ObjectSchema: Schema<Object> = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'É obrigatória a especificação do tipo do objeto.']
    },
    content: [{
        key: {
            type: String,
            required: [true, 'É obrigatório o preenchimento da chave do conteúdo.']
        },
        value: {
            type: String,
            required: [true, 'É obrigatório o preenchimento do valor do conteúdo.']
        }
    }],
    metadata: [{
        key: {
            type: String,
            required: [true, 'É obrigatório o preenchimento da chave do metadado.']
        },
        value: {
            type: String,
            required: [true, 'É obrigatório o preenchimento do valor do metadado.']
        }
    }]
});

const ObjectModel = mongoose.model<Object>('Object', ObjectSchema);
export default ObjectModel;