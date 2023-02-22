import { BadRequest } from "http-errors";
import { dbClient, isValidMongoId } from "../../db";

export const isPortfolioExist = async (id: string | null) => {
  if (!isValidMongoId(id)) throw new BadRequest("Invalid portfolio Id");

  const portfolio = await dbClient.PortfolioQueries?.findById(id!);

  if (!portfolio) throw new BadRequest("Invalid portfolio Id");

  return portfolio;
};
