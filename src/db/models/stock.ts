import mongoose from "mongoose";

export interface StockHistory {
  price: number;
  quantity: number;
  date: Date;
  action: "BUY" | "SELL";
}

export interface Stock extends mongoose.Document {
  title: string;
  code?: string;
  portfolioId: string;
  currentPrice: number;
  history: StockHistory[];
}

const StockSchema = new mongoose.Schema<Stock>(
  {
    portfolioId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    history: [
      {
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        date: { type: Date, required: true },
        action: {
          type: String,
          enum: ["BUY", "SELL"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Stock = mongoose.model<Stock>("stock", StockSchema);

export default Stock;
