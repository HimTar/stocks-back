import mongoose from "mongoose";
import { logger } from "../../external";
import { Stock, StockHistory } from "../models";

export const generateStockQueries = (StockModel: mongoose.Model<Stock>) => {
  logger.info("Generating Queries for Stock Collection");

  if (!StockModel) throw new Error("Database not connected properly");

  return Object.freeze({
    find: async (params: Record<string, unknown> = {}) => {
      return (await StockModel?.find(params)) || [];
    },
    findById: async (id: string) => {
      return (await StockModel?.findById(id)) || null;
    },
    findByPortfolioId: async (id: string) => {
      return (await StockModel?.find({ portfolioId: id }).sort()) || null;
    },
    insert: async (stock: Stock) => {
      const newStock = new StockModel(stock);

      await newStock.save();
    },
    update: async (stock: Stock) => {
      const oldStock = await StockModel?.findById(stock._id);

      stock.history = [
        ...(oldStock?.history ?? []),
        ...(stock?.history ?? []),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      await StockModel.updateOne({ _id: stock._id }, { $set: stock });
    },
    insertStockHistory: async (history: StockHistory, stockId: string) => {
      const stock = await StockModel?.findById(stockId);
      const newHistory = [history, ...(stock?.history ?? [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      await stock?.update({ $set: { history: newHistory } });
    },
    deleteById: async (id: string) => {
      await StockModel.findByIdAndDelete(id);
    },
    deleteByPortfolioId: async (id: string) => {
      await StockModel.deleteMany({ portfolioId: id });
    },
  });
};
