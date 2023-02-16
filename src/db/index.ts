import mongoose from "mongoose";

import { PortfolioModel } from "./models";
import { generatePortfolioQueries } from "./queries";

import { Config } from "../config";
import { DBClient } from "./interface";
import { logger } from "../external";

export const dbClient: DBClient = {
  db: null,
  PortfolioQueries: null,
};

export const makeDatabaseConnection = async () => {
  logger.info("Connecting to database");

  // For mongoose warning
  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(Config.databaseURL);

  dbClient.db = connection;
  dbClient.PortfolioQueries = generatePortfolioQueries(PortfolioModel);

  logger.info("Established Connection to database");

  return dbClient;
};

export const isValidMongoId = (id: string) => {
  try {
    return mongoose.isValidObjectId(id);
  } catch (err) {
    return false;
  }
};
