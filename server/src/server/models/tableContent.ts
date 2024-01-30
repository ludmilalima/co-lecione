import mongoose from 'mongoose';

const tableContentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    contentId: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const TableContentModel = mongoose.model('TableContent', tableContentSchema);
export default TableContentModel;
