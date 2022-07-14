import db from "../database/mongodb.js";
import { ObjectId } from "mongodb";

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

export async function getPoll(_, res) {
  const polls = await db.collection("polls").find({}).toArray();

  try {
    if (polls.length === 0) {
      return res.status(204).send("Nenhuma enquete cadastrada");
    }
    return res.status(200).send(polls);
  } catch (error) {
    return res.status(500).send("Falha ao tentar pegar as enquetes", error);
  }
}

export async function getPollChoices(req, res) {
  const pollId = req.params.id;

  try {
    const pollChoices = await db
      .collection("choices")
      .find({ pollId: pollId })
      .toArray();
    if (pollChoices.length === 0) {
      return res.status(404).send("Enquete não existe");
    }

    return res.status(200).send(pollChoices);
  } catch (error) {
    return res.status(500).send("Falha ao tentar pegar as opções", error);
  }
}

export async function getPollResult(req, res) {
  const pollId = req.params.id;

  try {
    const pollExist = await db.collection("polls").findOne({ _id: pollId });

    if (!pollExist) {
      return res.status(404).send("Enquete não existe.");
    }

    const pollChoices = await db
      .collection("choices")
      .find({ pollId: pollId })
      .toArray();

    let mostVoted = 0;
    let mostVotedTitle = "";

    for (let i = 0; i < pollChoices.length; i++) {
      let votes = choices[i].votes;

      if (votes > mostVoted) {
        votes = mostVoted;
        mostVotedTitle = pollChoices[i].title;
      }
    }

    const result = {
      title: mostVotedTitle,
      votes: mostVoted,
    };

    const poll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(pollId) });

    const results = { ...poll, result };

    return res.status(201).send(results);
  } catch (error) {
    return res.status(500).send("Falha ao tentar pegar o resultado", error);
  }
}
