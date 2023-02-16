import mongoose from "mongoose";

export interface Portfolio extends mongoose.Document {
  title: string;
  description: string;
}

const ProtfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model<Portfolio>("portfolio", ProtfolioSchema);

export default Portfolio;
