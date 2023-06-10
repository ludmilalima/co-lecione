import express from 'express';
import UserModel from '../models/user';

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
    const newUser = new UserModel(userData);
    
    await newUser.validate();
    
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
function uuidv4(): any {
  throw new Error('Function not implemented.');
}

