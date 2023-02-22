import { FastifyInstance, FastifyRequest } from "fastify";

import { dbClient } from "../../db";
import { Portfolio } from "../../db/models";
import { isPortfolioExist } from "./helper";

import { PortfolioAdd, PortfolioDelete, PortfolioGet } from "./schema";

export default async (app: FastifyInstance) => {
  app.get("/get-all", {
    handler: async (req, reply) => {
      const portfolios = await dbClient.PortfolioQueries?.find();

      const portfolioStocks = await Promise.all(
        portfolios?.map(async (folio) => {
          const stocks = await dbClient.StockQueries?.findByPortfolioId(
            folio._id
          );

          return {
            ...folio.toObject(),
            stocks,
          };
        }) ?? []
      );

      reply.send({ portfolios: portfolioStocks });
    },
  });

  app.get("/get", {
    schema: PortfolioGet,
    handler: async (
      req: FastifyRequest<{ Querystring: { id: string } }>,
      reply
    ) => {
      const id = req.query.id;

      const portfolio = await isPortfolioExist(id);

      reply.send(portfolio);
    },
  });

  app.post("/add", {
    schema: PortfolioAdd,
    handler: async (req, reply) => {
      const body = req.body as Portfolio;

      await dbClient.PortfolioQueries?.insert(body);

      reply.send({ success: true });
    },
  });

  app.delete("/delete", {
    schema: PortfolioDelete,
    handler: async (
      req: FastifyRequest<{ Querystring: { id: string } }>,
      reply
    ) => {
      const id = req.query.id;

      await isPortfolioExist(id);

      await dbClient.PortfolioQueries?.deleteById(id);

      reply.send({ success: true });
    },
  });
};
