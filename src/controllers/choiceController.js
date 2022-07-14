import db from "../database/mongodb.js";
import { ObjectId } from "mongodb";

export async function createChoice(req, res) {
  const { title, pollId } = req.body;

  try {
    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(pollId) });

    if (!pollExist) {
      return res.status(404).send("A enquete não existe.");
    }

    const choiceExists = await db
      .collection("choices")
      .findOne({ title: title });

    if (choiceExists) {
      return res.status(409).send("Opção já existe");
    }

    await db
      .collection("choices")
      .insertOne({ title, pollId: new ObjectId(pollId) });

    return res.status(201).send(choice);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function addVote(req, res) {
  const id = req.params.id;

  const vote = {
    createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
    choiceId: id,
  };

  try {
    const findChoice = await db
      .collection("choices")
      .findOne({ _id: new ObjectId(id) });

    if (!findChoice) {
      return res.status(404).send("Opção não existe");
    }

    const findPoll = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(isChoice.poolId) });

    const pollExpiration = findPoll.expiredAt;
    const presentTime = dayjs().format("YYYY-MM-D hh:mm");

    if (presentTime > pollExpiration) {
      return res.status(403).send("A enqueta já expirou");
    }

    await db.collection("votes").insertOne(vote);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
