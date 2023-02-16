import mongoose from "mongoose";
import { generatePortfolioQueries } from "./queries";

export type DBClient = {
  db: typeof mongoose | null;
  PortfolioQueries: ReturnType<typeof generatePortfolioQueries> | null;
};
