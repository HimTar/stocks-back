import fastify from "fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import { defaultErrorHandler } from "../utils/errorHandler";

export const BuildFastifyApplication = () => {
  const fastifyApplication = fastify();

  fastifyApplication.register(fastifyCors);
  fastifyApplication.register(fastifyHelmet);

  // Attach default Error handler
  fastifyApplication.setErrorHandler(defaultErrorHandler);

  return fastifyApplication;
};
