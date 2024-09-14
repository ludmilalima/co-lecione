import mongoose from "mongoose";

export interface LearningPlan extends mongoose.Document {
    content: { position: string, objectId: string }[];
    metadata: { key: string, value: string }[];
}

const LearningPlanSchema = new mongoose.Schema({
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