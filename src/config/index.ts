import dotenv from "dotenv";
import { logger } from "../external";

export const Config = {
  environment: "",
  isDevEnvironment: true,
  isProdEnvironment: false,
  databaseURL: "",
  port: 4000,
  host: "0.0.0.0",
};

export const loadConfigs = () => {
  logger.info("Loading Env Variables");

  // Set the NODE_ENV to 'development' by default
  process.env.NODE_ENV = process.env.NODE_ENV ?? "development";

  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }

  // Setting up Config Variables
  Config.environment = process.env.NODE_ENV;
  Config.isDevEnvironment = process.env.NODE_ENV === "development";
  Config.isProdEnvironment = process.env.NODE_ENV === "production";
  Config.databaseURL =
    process.env.NODE_ENV === "development"
      ? process.env.DEV_MONGO_URI ?? ""
      : process.env.PROD_MONGO_URI ?? "";

  if (process.env.PORT) Config.port = parseInt(process.env.PORT);

  logger.info("Env Variables loaded successfully");

  return Config;
};
