import express from 'express';
import { User } from '../models/user';

export const userRouter = express.Router();

userRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send(`Failed to find a user: ID ${id}`);
      }
    } catch (error) {
      res.status(404).send(`Failed to find a user: ID ${req.params.id}`);
    }
  });

  userRouter.post('/', async (req, res) => {
    try {
      const userData = req.body;
      const newUser = new User(userData);
      const result = await newUser.save();
  
      if (result) {
        res.status(201).send(`Created a new user: ID ${result._id}.`);
      } else {
        res.status(500).send('Failed to create a new user.');
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
  userRouter.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      const result = await User.findByIdAndUpdate(id, userData);
  
      if (result) {
        res.status(200).send(`Updated a user: ID ${id}.`);
      } else {
        res.status(404).send(`Failed to find a user: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });

  userRouter.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findByIdAndDelete(id);
  
      if (result) {
        res.status(202).send(`Removed a user: ID ${id}`);
      } else {
        res.status(404).send(`Failed to find a user: ID ${id}`);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });
