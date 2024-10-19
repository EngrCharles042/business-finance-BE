"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const rateLimiter_1 = __importDefault(require("./utils/rateLimiter"));
const app = (0, express_1.default)();
// set security for HTTP headers
app.use((0, helmet_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// parse json request body
app.use(express_1.default.json());
//parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// limit failed requests
if (config_1.default.env === "production") {
    app.use("/v1/auth", rateLimiter_1.default);
}
// v1 api route
app.use("v1");
// send 404 error for unknown route
app.use((req, res, next) => {
    next(new Error("Not Found"));
});
exports.default = app;
