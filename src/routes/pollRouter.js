import { Router } from "express";

import { createPoll, getPoll } from "../controllers/pollController.js";
import { pollValidation } from "../middlewares/pollValidation.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, createPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
