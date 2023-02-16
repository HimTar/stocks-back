import mongoose from "mongoose";
import { logger } from "../../external";
import { Portfolio } from "../models";

export const generatePortfolioQueries = (
  PortfolioModel: mongoose.Model<Portfolio>
) => {
  logger.info("Generating Queries for Portfolio Collection");

  if (!PortfolioModel) throw new Error("Database not connected properly");

  return Object.freeze({
    find: async (params: Record<string, unknown> = {}) => {
      return (await PortfolioModel?.find(params)) || [];
    },
    findById: async (id: string) => {
      return (await PortfolioModel?.findById(id)) || null;
    },
    insert: async (portfolio: Portfolio) => {
      const newPortfolio = new PortfolioModel(portfolio);

      await newPortfolio.save();
    },
    deleteById: async (id: string) => {
      await PortfolioModel.findByIdAndDelete(id);
    },
  });
};
