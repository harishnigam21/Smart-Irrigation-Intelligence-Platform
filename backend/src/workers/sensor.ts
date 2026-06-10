import { Worker } from "bullmq";

import { saveReading } from "../services/reading";
import { detectAnomalies } from "../services/anomaly";
import { createAlert } from "../services/alert";
import { updateSensorLastSeen } from "../services/sensor";
import { redisConfig } from "../config/redis";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";

export const startSensorWorker = () => {
  const worker = new Worker(
    "sensor-processing",
    async (job) => {
      const reading = job.data;
      const userId = reading.userId as string;
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        await saveReading(
          {
            userId: reading.userId,
            deviceId: reading.deviceId,
            soilMoisture: reading.soilMoisture,
            waterFlow: reading.waterFlow,
            temperature: reading.temperature,
          },
          userId,
          session,
        );
        await updateSensorLastSeen(reading.deviceId, session);

        const anomalies = detectAnomalies(reading);

        for (const anomaly of anomalies) {
          const alert = await createAlert(
            {
              deviceId: reading.deviceId,
              farmId: reading.farmId,
              userId: reading.userId,
              type: anomaly.type,
              severity: anomaly.severity as "LOW" | "MEDIUM" | "HIGH",
              message: anomaly.message,
            },
            session,
          );
          if (alert) {
            await SystemMetrics.findOneAndUpdate(
              { userId: alert.userId },
              {
                $addToSet: { activeSensors: alert._id },
              },
              { upsert: true, session },
            );
          }
        }
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        console.error(error);
      } finally {
        await session.endSession();
      }
    },
    {
      connection: redisConfig,
    },
  );
  worker.on("ready", () => {
    console.log("Worker ready");
  });

  worker.on("active", (job) => {
    console.log("Active:", job.id);
  });

  worker.on("completed", (job) => {
    console.log("Completed:", job.id);
  });

  worker.on("failed", (job, err) => {
    console.log("Failed:", job?.id, err);
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });
  return worker;
};
