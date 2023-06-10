import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<User> = new Schema({
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

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;