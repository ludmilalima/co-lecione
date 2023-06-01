import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface User extends Document {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, 'O campo "name" é obrigatório.'],
        minlength: [3, 'O campo "name" deve conter no mínimo 3 caracteres.'],
        match: [/^[A-Za-z\s]+$/, 'O campo "name" deve conter apenas letras e espaços.']
    },
    email: {
        type: String,
        required: [true, 'O campo "email" é obrigatório.'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'O campo "email" deve ser um email válido.']
    },
    password: {
        type: String,
        required: [true, 'O campo "password" é obrigatório.'],
        minlength: [6, 'O campo "password" deve conter no mínimo 6 caracteres.']
    }
});

export const User = mongoose.model<User>('User', userSchema);