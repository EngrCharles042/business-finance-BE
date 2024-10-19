"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("development", "production"),
    PORT: joi_1.default.number().default(5432),
    USER: joi_1.default.string().description("postgres database username"),
    HOST: joi_1.default.string().description("postgres database host"),
    DATABASE_NAME: joi_1.default.string()
        .description("postgres database name"),
    DATABASE_PASSWORD: joi_1.default.string()
        .description("postgres database password"),
    JWT_SECRET: joi_1.default.string().required().description("jwt secret"),
    JWT_ACCESS_EXPIRATION_MINUTE: joi_1.default.number()
        .default(30)
        .description("jwt expiration minute"),
    BASE_URL: joi_1.default.string()
        .default(`https://localhost:${process.env.PORT}/v1`)
        .description("Base url for the app"),
})
    .unknown();
const { value: envVar, error } = envVarSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    env: envVar.NODE_ENV,
    port: envVar.PORT,
    postgres: {
        user: envVar.USER,
        host: envVar.HOST,
        databaseName: envVar.DATABASE_NAME,
        password: envVar.DATABASE_PASSWORD,
    },
    jwt: {
        secret: envVar.JWT_SECRET,
        expirationMiunte: envVar.JWT_ACCESS_EXPIRATION_MINUTE,
    },
    baseUrl: envVar.BASE_URL,
};
exports.default = config;
