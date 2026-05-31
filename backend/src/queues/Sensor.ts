import { Queue } from "bullmq";
import { redisConfig } from "../config/redis";

export const sensorQueue = new Queue("sensor-processing", {
  connection: redisConfig,
});
