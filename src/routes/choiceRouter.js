import { Router } from "express";
import { createChoice } from "../controllers/choiceController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", createChoice);

export default choiceRouter;
