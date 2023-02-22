import { FastifyInstance } from "fastify";
import { logger } from "../external";
import { PortfolioRoutes } from "./portfolio";
import { StockRoutes } from "./stock";

export const registerRoutes = (app: FastifyInstance) => {
  logger.info("Registering Portfolio Routes");

  // Registring Portfolio Routes
  app.register(PortfolioRoutes, { prefix: "/portfolio" });
  app.register(StockRoutes, { prefix: "/stock" });

  logger.info("Routes successfully registerd !");
};
