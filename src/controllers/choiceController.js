import { db } from "../database/mongodb.js";

export async function createChoice(req, res) {
  const choice = {
    title: req.body.title,
    pollId: req.body.pollId,
  };

  try {
    const getPollId = ObjectId(pollId);
    const pollExist = await db.collection("polls").findOne({ _id: getPollId });

    if (!pollExist) {
      return res.status(404).send("A enquete não existe.");
    }

    const pollExpiration = pollExist.expireAt;
    const presentDay = dayjs().format("YYYY-MM-D hh:mm");

    if (presentDay > pollExpiration) {
      return res.status(403).send("A enqueta já expirou");
    }

    const choiceExists = await db
      .collection("choices")
      .findOne({ title: choice.title });

    if (choiceExists) {
      return res.status(409).send("Título já existente");
    }

    await db.collection("choices").insertOne(choice);

    return res.status(201).send("Opção adicionada à enquete");
  } catch (error) {
    res.status(500).send("Não foi possível adicionar a opção à enquete", error);
  }
}
