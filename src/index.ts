import { makeDatabaseConnection } from "./db";

import { registerRoutes } from "./api";

import { BuildFastifyApplication, logger } from "./external";
import { Config, loadConfigs } from "./config";

const StartServer = async () => {
  // Loading Config Variables
  loadConfigs();

  // Connecting to database
  await makeDatabaseConnection();

  // Building Minimal Fastify Server
  const app = BuildFastifyApplication();

  // Registring Routes
  registerRoutes(app);

  // Starting and Listening
  app.listen({ port: Config.port }, function (err, address) {
    if (err) {
      logger.error(JSON.stringify(err));
      process.exit(1);
    }

    logger.info(`Server Listening on PORT : ${address}`);
  });
};

StartServer();
