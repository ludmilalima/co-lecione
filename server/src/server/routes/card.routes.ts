import express from "express";
import CardModel from "../models/card";

export const cardRouter = express.Router();
cardRouter.use(express.json());

// POST: Create a new card
cardRouter.post('/', async (req, res) => {
    const card = new CardModel(req.body);
    try {
        const savedCard = await card.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// GET: Retrieve all cards
cardRouter.get('/', async (req, res) => {
    try {
        const cards = await CardModel.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// GET: Retrieve a specific card by ID
cardRouter.get('/:id', async (req, res) => {
    try {
        const card = await CardModel.findById(req.params.id);
        if (card) {
            res.status(200).json(card);
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// PUT: Update a specific card
cardRouter.put('/:id', async (req, res) => {
    try {
        const updatedCard = await CardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// DELETE: Delete a specific card
cardRouter.delete('/:id', async (req, res) => {
    try {
        const deletedCard = await CardModel.findByIdAndDelete(req.params.id);
        if (deletedCard) {
            res.status(200).json({ message: 'Card deleted successfully' });
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});