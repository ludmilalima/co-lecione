import express from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import { logout, verifyToken } from '../controllers/session.controller';
import jwt from 'jsonwebtoken';

export const userRouter = express.Router();

userRouter.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a user: ID ${req.params.id}`);
  }
});

userRouter.get('/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Verifique se o e-mail já está cadastrado no banco de dados
    const existingUser = await UserModel.findOne({ email });

    // Se o e-mail já existe, retorne true; caso contrário, retorne false
    const isEmailRegistered = !!existingUser;
    res.json({ isEmailRegistered });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const userData = req.body;
    // Criptografe a senha do usuário usando o bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // Crie um novo usuário com a senha criptografada
    const newUser = new UserModel({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    const result = await newUser.save();

    if (result) {
      res.status(201).send(`Created a new user: ID ${result._id}.`);
    } else {
      res.status(500).send('Failed to create a new user.');
    }

    console.log('Usuário salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o usuário:', error);
    res.status(400).send(error);
  }
});

userRouter.post('/login', async (req, res) => {
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

    // Gere um token JWT com o ID do usuário como payload
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    console.log(token);

    // Retorne o token como resposta
    res.status(200).json({ token });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).send(error);
  }
});

// Rota para logout de usuário
userRouter.post('/logout', logout);

// Rota protegida para obter informações do usuário
userRouter.get('/me', verifyToken, async (req, res) => {
  try {
    // Acessar o ID do usuário autenticado através de req.userId
    const userId = req.userId; // Obtenha o ID do usuário autenticado
    // Consulte o banco de dados ou faça qualquer outra lógica necessária para obter as informações do usuário com o ID fornecido
    const user = await UserModel.findById(userId);
    if (user) {
      // Realizar a lógica necessária para retornar as informações do usuário
      res.status(200).json({ userId: req.userId, message: 'Informações do usuário.' });
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).send(error);
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const result = await UserModel.findByIdAndUpdate(id, userData);

    if (result) {
      res.status(200).send(`Updated a user: ID ${id}.`);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.findByIdAndDelete(id);

    if (result) {
      res.status(202).send(`Removed a user: ID ${id}`);
    } else {
      res.status(404).send(`Failed to find a user: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
