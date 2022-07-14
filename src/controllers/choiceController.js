import db from "../database/mongodb.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function createChoice(req, res) {
  const { title, pollId } = req.body;
  const choice = req.body;

  const getPollId = ObjectId(pollId);

  try {
    const pollExist = await db.collection("polls").findOne({ _id: getPollId });

    if (!pollExist) {
      return res.status(404).send("A enquete não existe.");
    }

    const pollExpiration = pollExist.expireAt;
    console.log("expiração", pollExpiration);

    const now = dayjs().format("YYYY-MM-DD HH:mm");

    if (now > pollExpiration) {
      return res.status(403).send("Enquete já expirou");
    }

    const choiceExists = await db
      .collection("choices")
      .findOne({ title: title });

    if (choiceExists) {
      return res.status(409).send("Opção já existe");
    }
    await db.collection("choices");
    await db.collection("choices").insertOne({ ...choice, votes: 0 });

    return res.status(201).send(choice);
  } catch (error) {
    return res.sendStatus(500);
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

    const pollExpiration = findPoll.expireAt;
    console.log("expiração", pollExpiration);

    const now = dayjs().format("YYYY-MM-DD HH:mm");

    if (now > pollExpiration) {
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
