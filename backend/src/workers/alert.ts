import { Worker } from "bullmq";

import { redisConfig } from "../config/redis";
import { createAlert, CreateAlertInput } from "../services/alert";

export const startAlertWorker = () => {
  const worker = new Worker(
    "alert-processing",
    async (job) => {
      const reading: CreateAlertInput = job.data;
      try {
        await createAlert(reading);
        console.log("Assigned job to Alert Worker");
      } catch (error) {
        console.error("Error from Alert Worker", error);
      }
    },
    {
      connection: redisConfig,
    },
  );
  worker.on("ready", () => {
    console.log("Alert Worker is ready");
  });

  worker.on("active", (job) => {
    console.log("Alert Worker is Active:", job.id);
  });

  worker.on("completed", (job) => {
    console.log("Alert Worker job is Completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.log("Alert Worker Failed:", job?.id, err);
  });

  worker.on("error", (err) => {
    console.error("Alert Worker error:", err);
  });
  return worker;
};
