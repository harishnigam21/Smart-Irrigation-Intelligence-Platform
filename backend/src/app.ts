import express from "express";
import cors from "cors";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/cors";
const app = express();

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
export default app;
