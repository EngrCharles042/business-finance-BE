"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./modules/logger"));
let server;
const pool = new pg_1.Pool(config_1.default.postgres);
pool.connect((err, client, release) => {
    if (err) {
        return logger_1.default.info("Error connecting to Database", err.stack);
    }
    logger_1.default.info("Connected to database");
    server = app_1.default.listen(config_1.default.port, () => {
        logger_1.default.info(`Listening on port ${config_1.default.port}`);
    });
    // release th client back to the pool
    release();
});
const existHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.default.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.default.error(error);
    existHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
