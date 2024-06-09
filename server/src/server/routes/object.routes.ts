import express from "express";
import ObjectModel from "../models/object";

export const objectRouter = express.Router();
objectRouter.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Objects
 *   description: Operations about objects
 * components:
 *   schemas:
 *     Object:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The type of the object
 *         content:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *         metadata:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 * /objects/create:
 *   post:
 *     summary: Create a new object
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Object'
 *     responses:
 *       201:
 *         description: An object object.
 * /objects/list-all:
 *   get:
 *     summary: Get all objects
 *     tags: [Objects]
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       500:
 *         description: Error message.
 * /objects/search-all:
 *   get:
 *     summary: Search objects with all metadata
 *     tags: [Objects]
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       500:
 *         description: Error message.
 * /objects/search-any:
 *   get:
 *     summary: Search objects with any metadata
 *     tags: [Objects]
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       500:
 *         description: Error message.
 * /objects/search-id:
 *   get:
 *     summary: Search object by ID
 *     tags: [Objects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The object ID.
 *     responses:
 *       200:
 *         description: An object object.
 *       404:
 *         description: The object was not found.
 *       500:
 *         description: Error message.
 * /objects/update-id:
 *   put:
 *     summary: Update object by ID
 *     tags: [Objects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The object ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Object'
 *     responses:
 *       200:
 *         description: An object object.
 *       404:
 *         description: The object was not found.
 *       500:
 *         description: Error message.
 * /objects/delete-id:
 *   delete:
 *     summary: Delete object by ID
 *     tags: [Objects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The object ID.
 *     responses:
 *       204:
 *         description: The object was deleted successfully.
 *       404:
 *         description: The object was not found.
 *       500:
 *         description: Error message.
 */

objectRouter.post('/create', async (req, res) => {
    console.log('Creating object:', req.body);
    try {
        const objectData = req.body;

        // Check if an object with the same content already exists
        const existingObject = await ObjectModel.findOne(objectData);
        if (existingObject) {
            return res.status(409).json({ message: 'An object with the same content already exists.' });
        }

        const newObject = new ObjectModel(objectData);
        await newObject.save();

        return res.status(201).json(newObject);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/list-all', async (req, res) => {
    try {
        const objects = await ObjectModel.find();
        return res.status(200).json(objects);
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-all', async (req, res) => {
    try {
        const metadata = req.body;
        const objects = await ObjectModel.find({ metadata: { $all: metadata } });
        return res.status(200).json(objects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-any', async (req, res) => {
    try {
        const metadata = req.body;
        const objects = await ObjectModel.find({ metadata: { $in: metadata } });
        return res.status(200).json(objects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-id:id', async (req, res) => {
    try {
        const object = await ObjectModel.findById(req.params.id);
        if (!object) {
            return res.status(404).json({ message: 'Object not found.' });
        }
        return res.status(200).json(object);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.put('/update-id:id', async (req, res) => {
    try {
        const objectData = req.body;
        const object = await ObjectModel.findByIdAndUpdate(req.params.id, objectData, { new: true });
        if (!object) {
            return res.status(404).json({ message: 'Object not found.' });
        }
        return res.status(200).json(object);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.delete('/delete-id:id', async (req, res) => {
    try {
        const object = await ObjectModel.findByIdAndDelete(req.params.id);
        if (!object) {
            return res.status(404).json({ message: 'Object not found.' });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
