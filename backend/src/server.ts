import dotenv from "dotenv";
import http from "http";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./socket/socket";
import { startSensorWorker } from "./workers/sensor";
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  startSensorWorker();
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

startServer();
