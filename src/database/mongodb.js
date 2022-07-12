import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;

let db = null;
const mongoClient = new MongoClient(MONGO_URI);

mongoClient.connect(() => {
  db = mongoClient.db(DATABASE);
  console.log(chalk.magenta.bold("MongoDB connected"));
});
const objectId = ObjectId;
export { db, objectId };
