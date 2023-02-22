import mongoose from "mongoose";
import { generatePortfolioQueries, generateStockQueries } from "./queries";

export type DBClient = {
  db: typeof mongoose | null;
  PortfolioQueries: ReturnType<typeof generatePortfolioQueries> | null;
  StockQueries: ReturnType<typeof generateStockQueries> | null;
};
