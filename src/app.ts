import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/config";
import authLimit from "./utils/rateLimiter";

const app: Express = express();

// set security for HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// limit failed requests
if (config.env === "production") {
  app.use("/v1/auth", authLimit);
}

// // v1 api route
// app.use("v1");

// send 404 error for unknown route
app.use((req, res, next) => {
  next(new Error("Not Found"));
});

export default app;
