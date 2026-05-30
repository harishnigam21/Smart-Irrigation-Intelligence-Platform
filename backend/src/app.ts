import express from "express";
import cors from "cors";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/cors";
import Auth from "./routes/Auth";
const app = express();

//App level middlewares
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));

//App level Routes
app.use("/", Auth);

app.get("/", (_, res) => {
  res.send("Smart Irrigation Intelligence Platform API Running..");
});

export default app;
