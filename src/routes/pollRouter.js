import { Router } from "express";

import {
  createPoll,
  getPoll,
  getPollChoices,
} from "../controllers/pollController.js";
import { pollValidation } from "../middlewares/pollValidation.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, createPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("poll/:id/choice", getPollChoices);
pollRouter.get("poll/:id/result");

export default pollRouter;
