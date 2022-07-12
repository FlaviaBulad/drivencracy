import { Router } from "express";

import { createPoll } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", createPoll);

export default pollRouter;
