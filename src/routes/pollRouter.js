import { Router } from "express";

import { createPoll, getPoll } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", createPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
