import { FastifyInstance } from "fastify";
import { logger } from "../external";
import { PortfolioRoutes } from "./portfolio";

export const registerRoutes = (app: FastifyInstance) => {
  logger.info("Registering Portfolio Routes");

  // Registring Portfolio Routes
  app.register(PortfolioRoutes, { prefix: "/portfolio" });

  logger.info("Routes successfully registerd !");
};
