import { Router } from "express";
import { createChoice } from "../controllers/choiceController.js";

import { choiceValidation } from "../middlewares/choiceValidation.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, createChoice);

export default choiceRouter;
