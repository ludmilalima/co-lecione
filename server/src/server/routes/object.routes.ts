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
 * /objects/read-all:
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
 *   post:
 *     summary: Search objects with any metadata
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                 value:
 *                   type: string
 *             description: An array of metadata objects
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       500:
 *         description: Error message.
 * /objects/search-by-keys:
 *   get:
 *     summary: Search objects by keys
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: An array of keys to search for
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       404:
 *         description: No objects found.
 *       500:
 *         description: Internal server error.
  * /objects/search-by-values:
 *   get:
 *     summary: Search objects by values
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: An array of values to search for
 *     responses:
 *       200:
 *         description: An array of object objects.
 *       404:
 *         description: No objects found.
 *       500:
 *         description: Internal server error.
 * /objects/search-id/{id}:
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
 * /objects/update-id/{id}:
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
 * /objects/delete-id/{id}:
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
    try {
        const objectData = req.body;

        const existingObject = await ObjectModel.findOne(objectData);
        if (existingObject) {
            return res.status(409).json({ message: 'An object with the same content already exists.' });
        }

        const newObject = new ObjectModel(objectData);
        await newObject.save();

        return res.status(201).json(newObject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/read-all', async (req, res) => {
    try {
        const objects = await ObjectModel.find();

        if (objects.length === 0) {
            return res.status(404).json({ message: 'Não foram encontrados objetos.' });
        }

        return res.status(200).json(objects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.put('/update-id/:id', async (req, res) => {
    try {
        const objectId = req.params.id;
        const objectData = req.body;

        if (!objectId || !objectData) {
            return res.status(400).json({ message: 'Object id and data are required.' });
        }

        const updatedObject = await ObjectModel.findByIdAndUpdate(objectId, objectData, { new: true });

        if (!updatedObject) {
            return res.status(404).json({ message: 'Object not found.' });
        }

        return res.status(200).json(updatedObject);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.delete('/delete-id/:id', async (req, res) => {
    try {
        const objectId = req.params.id;

        if (!objectId) {
            return res.status(400).json({ message: 'Object id is required.' });
        }

        const deletedObject = await ObjectModel.findByIdAndDelete(objectId);

        if (!deletedObject) {
            return res.status(404).json({ message: 'Object not found.' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-all', async (req, res) => {
    try {
        const metadata = req.body;

        if (!metadata || !Array.isArray(metadata) || metadata.length === 0) {
            return res.status(400).json({ message: 'Invalid metadata.' });
        }

        const objects = await ObjectModel.find({
            metadata: {
                $all: metadata.map((item: { key: string, value: string }) => ({
                    $elemMatch: { key: item.key, value: item.value }
                }))
            }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'Não foram encontrados objetos.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.post('/search-any', async (req, res) => {
    try {
        const metadata = req.body;

        if (!metadata || !Array.isArray(metadata) || metadata.length === 0) {
            return res.status(400).json({ message: 'Invalid metadata.' });
        }

        const objects = await ObjectModel.find({
            $or: metadata.map((item) => ({
                metadata: { $elemMatch: { key: item.key, value: item.value } }
            }))
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'Não foram encontrados objetos.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-by-keys', async (req, res) => {
    try {
        const keys = req.body;

        if (!keys || !Array.isArray(keys) || keys.length === 0) {
            return res.status(400).json({ message: 'Invalid keys.' });
        }

        const objects = await ObjectModel.find({
            'metadata.key': { $in: keys }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'Não foram encontrados objetos.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-by-values', async (req, res) => {
    try {
        const keys = req.body;

        if (!keys || !Array.isArray(keys) || keys.length === 0) {
            return res.status(400).json({ message: 'Invalid keys.' });
        }

        const objects = await ObjectModel.find({
            'metadata.value': { $in: keys }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'Não foram encontrados objetos.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

objectRouter.get('/search-id/:id', async (req, res) => {
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