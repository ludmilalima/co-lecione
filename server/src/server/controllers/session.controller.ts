import { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função para fazer login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Encontre o usuário com o e-mail fornecido
    const user = await UserModel.findOne({ email });

    if (!user) {
      // Usuário não encontrado
      return res.status(404).send('Usuário não encontrado.');
    }

    // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Senha inválida
      return res.status(401).send('Senha inválida.');
    }

    // Gerar um token de autenticação
    const token = jwt.sign({ userId: user._id }, 'secret_key');

    // Autenticação bem-sucedida
    res.status(200).json({ token });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).send(error);
  }
};

// Função para fazer logout (não é necessária no backend, mas pode ser usada no frontend)
export const logout = (req: Request, res: Response) => {
  // Implemente as ações necessárias para fazer logout do usuário, se necessário
  res.status(200).json({ message: 'Logout realizado com sucesso' });
};
