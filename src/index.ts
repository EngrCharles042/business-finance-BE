import app from "./app";
import config from "./config/config";
import logger from "./modules/logger";
import { Server } from "http";
import { Sequelize } from "sequelize";

let server: Server;
export const sequelize = new Sequelize(
  config.postgres.databaseName,
  config.postgres.user,
  config.postgres.password,
  {
    host: config.postgres.host,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected to database");

    server = app.listen(config.port, () => {
      logger.info(`Listening on port ${config.port}`);
    });
  })
  .catch((err: any) => {
    logger.error("Unable to connect to the database:", err);
    process.exit(1);
  });

const existHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
    logger.error(error);
    existHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
