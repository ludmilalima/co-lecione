import express from "express";
import CardModel from "../models/card";
import { Console } from "console";

export const cardRouter = express.Router();
cardRouter.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         avatarSrc:
 *           type: string
 *           description: The source of the avatar image
 *         headerImageSrc:
 *           type: string
 *           description: The source of the header image
 *         title:
 *           type: string
 *           description: The title of the card
 *         subtitle:
 *           type: string
 *           description: The subtitle of the card
 *         content:
 *           type: string
 *           description: The content of the card
 *         action:
 *           type: string
 *           description: The action of the card
 *         metadata:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 * /cards/create:
 *   post:
 *     summary: Create a new card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: A card object.
 */
cardRouter.post('/create', async (req, res) => {
    const cardData = req.body;

    // Check if a card with the same content already exists
    const existingCard = await CardModel.findOne(cardData);
    if (existingCard) {
        return res.status(409).json({ error: 'A card with the same content already exists' });
    }

    const card = new CardModel(cardData);
    console.log(card);
    try {
        const savedCard = await card.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Get all cards
 *     responses:
 *       200:
 *         description: An array of card objects.
 *       500:
 *         description: Error message.
 */
cardRouter.get('/', async (req, res) => {
    try {
        const cards = await CardModel.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Get a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The card ID.
 *     responses:
 *       200:
 *         description: A card object.
 *       404:
 *         description: The card was not found.
 *       500:
 *         description: Error message.
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         avatarSrc:
 *           type: string
 *           description: The source of the avatar image
 *         headerImageSrc:
 *           type: string
 *           description: The source of the header image
 *         title:
 *           type: string
 *           description: The title of the card
 *         subtitle:
 *           type: string
 *           description: The subtitle of the card
 *         content:
 *           type: string
 *           description: The content of the card
 *         action:
 *           type: string
 *           description: The action of the card
 *         metadata:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 * /cards/{id}:
 *   put:
 *     summary: Update a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The card ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: The updated card object.
 *       404:
 *         description: The card was not found.
 *       500:
 *         description: Error message.
 */
cardRouter.put('/:id', async (req, res) => {
    try {
        const updatedCard = await CardModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The card ID.
 *     responses:
 *       200:
 *         description: The card was deleted successfully.
 *       404:
 *         description: The card was not found.
 *       500:
 *         description: Error message.
 */
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
