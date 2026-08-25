import dotenv from "dotenv";
dotenv.config();
const envVariables = {
  PORT: process.env.PORT,
  IN_PRODUCTION: process.env.IN_PRODUCTION,
  CLIENT_URL: process.env.CLIENT_URL,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  MONGO_URI: process.env.MONGO_URI,
};
export default envVariables;
