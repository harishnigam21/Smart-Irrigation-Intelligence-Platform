import { Worker } from "bullmq";

import { saveReading } from "../services/reading";
import { detectAnomalies } from "../services/anomaly";
import { updateSensorLastSeen } from "../services/sensor";
import { redisConfig } from "../config/redis";
import { alertQueue } from "../queues/Alert";

export const startSensorWorker = () => {
  const worker = new Worker(
    "sensor-processing",
    async (job) => {
      const reading = job.data;
      const userId = reading.userId as string;
      await saveReading(
        {
          userId: reading.userId,
          deviceId: reading.deviceId,
          soilMoisture: reading.soilMoisture,
          waterFlow: reading.waterFlow,
          temperature: reading.temperature,
        },
        userId,
      );
      await updateSensorLastSeen(reading.deviceId);

      const anomalies = detectAnomalies(reading);
      if (anomalies.length > 0) {
        const alertPromises = anomalies.map((anomaly) =>
          alertQueue.add("alert-reading", {
            deviceId: reading.deviceId,
            farmId: reading.farmId,
            userId: reading.userId,
            type: anomaly.type,
            severity: anomaly.severity as "LOW" | "MEDIUM" | "HIGH",
            message: anomaly.message,
          }),
        );
        await Promise.all(alertPromises);
      }
    },
    {
      connection: redisConfig,
    },
  );
  worker.on("ready", () => {
    console.log("Sensor Worker is ready");
  });

  worker.on("active", (job) => {
    console.log("Sensor Worker is Active:", job.id);
  });

  worker.on("completed", (job) => {
    console.log("Sensor Worker job Completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.log("Sensor Worker Failed:", job?.id, err);
  });

  worker.on("error", (err) => {
    console.error("Sensor Worker error:", err);
  });
  return worker;
};
