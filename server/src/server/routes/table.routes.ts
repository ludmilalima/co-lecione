import express from "express";
import TableContentModel from "../models/table";

export const tablesRouter = express.Router();
tablesRouter.use(express.json());

tablesRouter.get('/', async (_req,res) => {
    try {
        const tableContents = await TableContentModel.find({});
        res.status(200).json(tableContents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});