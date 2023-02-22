import { BadRequest } from "http-errors";
import { dbClient, isValidMongoId } from "../../db";

export const isStockExist = async (id: string | null) => {
  if (!isValidMongoId(id)) throw new BadRequest("Invalid stock Id");

  const stock = await dbClient.StockQueries?.findById(id!);

  if (!stock) throw new BadRequest("Invalid stock Id");

  return stock;
};
