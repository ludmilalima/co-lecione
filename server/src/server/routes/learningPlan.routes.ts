import express from "express";
import LearningPlanModel from "../models/learningPlan";

export const learningPlanRouter = express.Router();
learningPlanRouter.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Learning Plans
 *   description: Operations about learning plans
 * components:
 *   schemas:
 *     LearningPlan:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the learning plan.
 *         description:
 *           type: string
 *           description: The description of the learning plan.
 *         author:
 *           type: string
 *           description: The author of the learning plan.
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: The creation date of the learning plan.
 *         updateDate:
 *           type: array
 *           items:
 *             type: string
 *             format: date-time
 *           description: The update dates of the learning plan.
 *         content:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 description: The position of the content.
 *               objectId:
 *                 type: string
 *                 description: The ID of the content object.
 *           description: The content of the learning plan.
 *         metadata:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: The key of the metadata.
 *               value:
 *                 type: string
 *                 description: The value of the metadata.
 *           description: The metadata of the learning plan.
 * /learning-plans/create:
 *   post:
 *     summary: Create a new learning plan
 *     tags: [Learning Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPlan'
 *     responses:
 *       201:
 *         description: A learning plan object.
 *       409:
 *         description: A learning plan with the same content already exists.
 *       500:
 *         description: Internal server error.
 * /learning-plans/read-all:
 *   get:
 *     summary: Get all learning plans
 *     tags: [Learning Plans]
 *     responses:
 *       200:
 *         description: An array of learning plan objects.
 *       404:
 *         description: No learning plans found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/update/:id:
 *   put:
 *     summary: Update learning plan by ID
 *     tags: [Learning Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The learning plan ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPlan'
 *     responses:
 *       200:
 *         description: A learning plan object.
 *       404:
 *         description: Learning plan not found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/delete/:id:
 *   delete:
 *     summary: Delete learning plan by ID
 *     tags: [Learning Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The learning plan ID.
 *     responses:
 *       204:
 *         description: The learning plan was deleted successfully.
 *       404:
 *         description: Learning plan not found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/search-all:
 *   get:
 *     summary: Search learning plans with all metadata
 *     tags: [Learning Plans]
 *     responses:
 *       200:
 *         description: An array of learning plan objects.
 *       404:
 *         description: No learning plans found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/search-any:
 *   get:
 *     summary: Search learning plans with any metadata
 *     tags: [Learning Plans]
 *     responses:
 *       200:
 *         description: An array of learning plan objects.
 *       404:
 *         description: No learning plans found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/search-by-keys:
 *   get:
 *     summary: Search learning plans by keys
 *     tags: [Learning Plans]
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
 *         description: An array of learning plan objects.
 *       404:
 *         description: No learning plans found.
 *       500:
 *         description: Internal server error.
 * /learning-plans/search-by-values:
 *   get:
 *     summary: Search learning plans by values
 *     tags: [Learning Plans]
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
 *         description: An array of learning plan objects.
 *       404:
 *         description: No learning plans found.
 *       500:
 *         description: Internal server error.
 */

learningPlanRouter.post('/create', async (req, res) => {
    try {
        const learningPlanData = req.body;

        const existingLeaningPlan = await LearningPlanModel.findOne(learningPlanData);
        if (existingLeaningPlan) {
            return res.status(409).json({ message: 'A learning plan with the same content already exists.' });
        }

        const newLearningPlan = new LearningPlanModel(learningPlanData);
        await newLearningPlan.save();

        return res.status(201).json(newLearningPlan);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
        console.error(error);
    }
});

learningPlanRouter.get('/read-all', async (req, res) => {
    try {
        const learningPlans = await LearningPlanModel.find();

        if (learningPlans.length === 0) {
            return res.status(404).json({ message: 'No learning plans found.' });
        }

        return res.status(200).json(learningPlans);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
        console.error(error);
    }
});

learningPlanRouter.put('/update/:id', async (req, res) => {
    try {
        const learningPlanId = req.params.id;
        const learningPlanData = req.body;

        if (!learningPlanId || !learningPlanData) {
            return res.status(400).json({ message: 'Learning plan id and data are required.' });
        }

        const updatedLearningPlan = await LearningPlanModel.findByIdAndUpdate(learningPlanId, learningPlanData, { new: true });

        if (!updatedLearningPlan) {
            return res.status(404).json({ message: 'Learning plan not found.' });
        }

        return res.status(200).json(updatedLearningPlan);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
        console.error(error);
    }
});

learningPlanRouter.delete('/delete/:id', async (req, res) => {
    try {
        const learningPlanId = req.params.id;

        if (!learningPlanId) {
            return res.status(400).json({ message: 'Learning plan id is required.' });
        }

        const deletedLearningPlan = await LearningPlanModel.findByIdAndDelete(learningPlanId);

        if (!deletedLearningPlan) {
            return res.status(404).json({ message: 'Learning plan not found.' });
        }

        return res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
        console.error(error);
    }
});

learningPlanRouter.get('/search-all', async (req, res) => {
    try {
        const metadata = req.body;

        if (!metadata || !Array.isArray(metadata) || metadata.length === 0) {
            return res.status(400).json({ message: 'Invalid metadata.' });
        }

        const objects = await LearningPlanModel.find({
            metadata: {
                $all: metadata.map((item: { key: string, value: string }) => ({
                    $elemMatch: { key: item.key, value: item.value }
                }))
            }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-any', async (req, res) => {
    try {
        const metadata = req.body;

        if (!metadata || !Array.isArray(metadata) || metadata.length === 0) {
            return res.status(400).json({ message: 'Invalid metadata.' });
        }

        const objects = await LearningPlanModel.find({
            $or: metadata.map((item: { key: string, value: string }) => ({
                metadata: { $elemMatch: { key: item.key, value: item.value } }
            }))
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-by-keys', async (req, res) => {
    try {
        const keys = req.body;

        if (!keys || !Array.isArray(keys) || keys.length === 0) {
            return res.status(400).json({ message: 'Invalid keys.' });
        }

        const objects = await LearningPlanModel.find({
            'metadata.key': { $in: keys }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-by-values', async (req, res) => {
    try {
        const keys = req.body;

        if (!keys || !Array.isArray(keys) || keys.length === 0) {
            return res.status(400).json({ message: 'Invalid keys.' });
        }

        const objects = await LearningPlanModel.find({
            'metadata.value': { $in: keys }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-id/:id', async (req, res) => {
    try {
        const object = await LearningPlanModel.findById(req.params.id);

        if (!object) {
            return res.status(404).json({ message: 'Object not found.' });
        }

        return res.status(200).json(object);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-by-authors', async (req, res) => {
    try {
        const authors = req.body;

        if (!authors || !Array.isArray(authors) || authors.length === 0) {
            return res.status(400).json({ message: 'Invalid authors.' });
        }

        const objects = await LearningPlanModel.find({
            author: { $in: authors }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

learningPlanRouter.get('/search-by-titles', async (req, res) => {
    try {
        const titles = req.body;

        if (!titles || !Array.isArray(titles) || titles.length === 0) {
            return res.status(400).json({ message: 'Invalid titles.' });
        }

        const objects = await LearningPlanModel.find({
            title: { $in: titles }
        });

        if (objects.length === 0) {
            return res.status(404).json({ message: 'No itineraries found.' });
        }

        return res.status(200).json(objects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});