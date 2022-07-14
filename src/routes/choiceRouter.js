import { Router } from "express";

import { createChoice, addVote } from "../controllers/choiceController.js";
import { choiceValidation } from "../middlewares/choiceValidation.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, createChoice);
choiceRouter.post("/choice/:id/vote", addVote);

export default choiceRouter;
