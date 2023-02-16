import { FastifyInstance, FastifyRequest } from "fastify";
import { BadRequest } from "http-errors";

import { dbClient, isValidMongoId } from "../../db";
import { Portfolio } from "../../db/models";

import { PortfolioAdd, PortfolioDelete, PortfolioGet } from "./schema";

export default async (app: FastifyInstance) => {
  app.get("/get-all", {
    handler: async (req, reply) => {
      const portfolios = await dbClient.PortfolioQueries?.find();

      reply.send({ portfolios });
    },
  });

  app.get("/get", {
    schema: PortfolioGet,
    handler: async (
      req: FastifyRequest<{ Querystring: { id: string } }>,
      reply
    ) => {
      const id = req.query.id;

      if (!isValidMongoId(id)) throw new BadRequest("Invalid portfolio Id");

      const portfolio = await dbClient.PortfolioQueries?.findById(id);

      if (!portfolio) throw new BadRequest("Invalid portfolio Id");

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

      if (!isValidMongoId(id)) throw new BadRequest("Invalid portfolio Id");

      const portfolio = await dbClient.PortfolioQueries?.findById(id);

      if (!portfolio) throw new BadRequest("Invalid portfolio Id");

      await dbClient.PortfolioQueries?.deleteById(id);

      reply.send({ success: true });
    },
  });
};
