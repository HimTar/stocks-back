import { FastifyInstance } from "fastify";
import { logger } from "../external";
import { PortfolioRoutes } from "./portfolio";
import { StockRoutes } from "./stock";

export const registerRoutes = (app: FastifyInstance) => {
  // Registring Portfolio Routes
  logger.info("Registering Portfolio Routes");
  app.register(PortfolioRoutes, { prefix: "/portfolio" });

  logger.info("Registering Stock Routes");
  app.register(StockRoutes, { prefix: "/stock" });

  logger.info("Routes successfully registerd !");
};
