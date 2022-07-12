import { db } from "../database/mongodb.js";

import dayjs from "dayjs";

export async function createPoll(req, res) {
  try {
    const { title, expireAt } = req.body;
    const poll = req.body;

    if (expireAt === "") {
      let addExpireAt = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");
      const pollComplete = { title, expireAt: addExpireAt };

      await db.collection("polls").insertOne(pollComplete);
      return res.status(201).send("Enquete criada!");
    }
    await db.collection("polls").insertOne(poll);
    return res.status(201).send("Enquete criada!");
  } catch (error) {
    res.status(500).send("Falha ao tentar criar a enquete: ", error);
  }
}
