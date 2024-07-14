import mongoose from "mongoose";

export interface LearningPlan extends mongoose.Document {
    title: string;
    description: string;
    author: string;
    creationDate: Date;
    updateDate: Date[];
    content: { position: string, objectId: string }[];
    metadata: { key: string, value: string }[];
}

const LearningPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'É obrigatório o preenchimento do título do plano de aprendizagem.']
    },
    description: {
        type: String,
        required: [true, 'É obrigatório o preenchimento da descrição do plano de aprendizagem.']
    },
    author: {
        type: String,
        required: [true, 'É obrigatório o preenchimento do autor do plano de aprendizagem.']
    },
    creatiobDate: {
        type: Date,
        required: [true, 'É obrigatório o preenchimento da data de criação do plano de aprendizagem.']
    },
    updateData: {
        type: [Date],
        required: false
    },
    content: [{
        position: {
            type: String,
            required: [true, 'É obrigatório o preenchimento da posição do conteúdo.']
        },
        objectId: {
            type: String,
            required: [true, 'É obrigatório o preenchimento do id do objeto.']
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

const LearningPlanModel = mongoose.model<LearningPlan>('LearningPlan', LearningPlanSchema);
export default LearningPlanModel;