import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;

let db = null;
const mongoClient = new MongoClient(MONGO_URI);

try {
  mongoClient.connect();

  db = mongoClient.db(DATABASE);
  console.log(chalk.magenta.bold("MongoDB connected"));
} catch (error) {
  console.log(chalk.bold.red("MongoDB connection error"));
  console.log(error);
}
export default db;
