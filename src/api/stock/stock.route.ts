import { FastifyInstance, FastifyRequest } from "fastify";
import { BadRequest } from "http-errors";

import { dbClient, isValidMongoId } from "../../db";
import { Stock } from "../../db/models";
import { isPortfolioExist } from "../portfolio";
import { isStockExist } from "./helper";

import {
  StockAdd,
  StockDelete,
  StockGetByPortfolio,
  StockUpdate,
} from "./schema";

export default async (app: FastifyInstance) => {
  app.get("/get-all", {
    handler: async (req, reply) => {
      const stocks = await dbClient.StockQueries?.find();

      reply.send({ stocks });
    },
  });

  app.get("/get", {
    schema: StockGetByPortfolio,
    handler: async (
      req: FastifyRequest<{ Querystring: { portfolioId: string } }>,
      reply
    ) => {
      const portfolioId = req.query.portfolioId;

      // Check if portfolio exist
      await isPortfolioExist(portfolioId);

      const stocks = await dbClient.StockQueries?.findByPortfolioId(
        portfolioId
      );

      reply.send({ stocks: stocks ?? [] });
    },
  });

  app.post("/add", {
    schema: StockAdd,
    handler: async (req, reply) => {
      const body = req.body as Stock;

      const portfolioId = body.portfolioId;

      // Check if portfolio exist
      await isPortfolioExist(portfolioId);

      // Check if date is valid
      body.history = body.history.map((history) => {
        try {
          return {
            price: history.price,
            date: new Date(history.date),
            quantity: history.quantity,
            action: history.action,
          };
        } catch (err) {
          throw new BadRequest("Invalid Purchase history date");
        }
      });

      await dbClient.StockQueries?.insert(body);

      reply.send({ success: true });
    },
  });

  app.post("/update", {
    schema: StockUpdate,
    handler: async (req, reply) => {
      const body = req.body as Stock;

      const stockId = body._id;

      // Check if stock exist
      await isStockExist(stockId);

      // Check if date is valid
      body.history = body.history.map((history) => {
        try {
          return {
            price: history.price,
            date: new Date(history.date),
            quantity: history.quantity,
            action: history.action,
          };
        } catch (err) {
          throw new BadRequest("Invalid Purchase history date");
        }
      });

      await dbClient.StockQueries?.update(body);

      reply.send({ success: true });
    },
  });

  app.delete("/delete", {
    schema: StockDelete,
    handler: async (
      req: FastifyRequest<{ Querystring: { id: string } }>,
      reply
    ) => {
      const id = req.query.id;

      // Check if stock exists
      await isStockExist(id);

      await dbClient.StockQueries?.deleteById(id);

      reply.send({ success: true });
    },
  });
};
