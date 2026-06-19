import { Queue } from "bullmq";
import { redisConfig } from "../config/redis";

export const alertQueue = new Queue("alert-processing", {
  connection: redisConfig,
});
