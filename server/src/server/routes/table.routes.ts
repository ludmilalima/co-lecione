import express from "express";
import TableContentModel from "../models/tableContent";

export const tableRouter = express.Router();
tableRouter.use(express.json());

tableRouter.get("/", async (_req,res) => {
    try {
        const tableContents = await TableContentModel.find({});
        res.status(200).send(tableContents);
    } catch (error) {
        res.status(500).send(error.message);
    }
});