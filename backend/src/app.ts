import express from "express";
import cors from "cors";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/cors";
import Auth from "./routes/Auth";
import Farm from "./routes/Farm";
import Sensor from "./routes/Sensor";
import Summary from "./routes/Summary";
import Health from "./routes/health";
import Device from "./routes/Device";
import Alert from "./routes/Alert";
const app = express();

//App level middlewares
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));

//App level Routes
app.use("/", Health);
app.use("/api", Auth);
app.use("/api", Farm);
app.use("/api", Sensor);
app.use("/api", Summary);
app.use("/api", Device);
app.use("/api", Alert);

app.get("/", (_, res) => {
  res.send("Smart Irrigation Intelligence Platform API Running..");
});

export default app;
