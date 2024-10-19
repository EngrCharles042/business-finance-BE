import Joi from "joi";

const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("development", "production"),
    PORT: Joi.number().default(5432),
    USER: Joi.string().description("postgres database username"),
    HOST: Joi.string().description("postgres database host"),
    DATABASE_NAME: Joi.string()
      .description("postgres database name"),
    DATABASE_PASSWORD: Joi.string()
      .description("postgres database password"),
    JWT_SECRET: Joi.string().required().description("jwt secret"),
    JWT_ACCESS_EXPIRATION_MINUTE: Joi.number()
      .default(30)
      .description("jwt expiration minute"),
    BASE_URL: Joi.string()
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

export default config;
