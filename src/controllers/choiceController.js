import db from "../database/mongodb.js";
import { ObjectId } from "mongodb";

export async function createChoice(req, res) {
  const { title, pollId } = req.body;
  const choice = req.body;

  try {
    const pollExist = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(pollId) });

    if (!pollExist) {
      return res.status(404).send("A enquete não existe.");
    }

    const pollExpiration = pollExist.expiredAt;
    const isExpired = dayjs().isAfter(pollExpiration, "days");
    if (isExpired) {
      return res.status(403).send("Enquete já expirou");
    }

    const choiceExists = await db
      .collection("choices")
      .findOne({ title: title });

    if (choiceExists) {
      return res.status(409).send("Opção já existe");
    }

    await db
      .collection("choices")
      .insertOne({ title, pollId: new ObjectId(pollId), votes: 0 });

    return res.status(201).send(choice);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function addVote(req, res) {
  const id = req.params.id;

  try {
    const findChoice = await db
      .collection("choices")
      .findOne({ _id: new ObjectId(id) });

    if (!findChoice) {
      return res.status(404).send("Opção não existe");
    }

    const findPoll = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(findChoice.pollId) });

    const pollExpiration = findPoll.expiredAt;
    const isExpired = dayjs().isAfter(pollExpiration, "days");
    if (isExpired) {
      return res.status(403).send("Enquete já expirou");
    }

    await db
      .collection("choices")
      .findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { votes: 1 } });

    res.status(201).send("Votou!");
  } catch (error) {
    res.sendStatus(500);
  }
}
