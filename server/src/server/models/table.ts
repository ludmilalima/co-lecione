import mongoose, { Document, Schema } from 'mongoose';

export interface TableContent extends Document {
    contentId: number;
    content: string;
}

const tableContentSchema: Schema<TableContent> = new Schema({
    contentId: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const TableContentModel = mongoose.model<TableContent>('TableContent', tableContentSchema);
export default TableContentModel;
