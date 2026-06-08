import { Worker } from "bullmq";

import { saveReading } from "../services/reading";
import { detectAnomalies } from "../services/anomaly";
import { createAlert } from "../services/alert";
import { updateSensorLastSeen } from "../services/sensor";
import { redisConfig } from "../config/redis";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";

export const startSensorWorker = () => {
  return new Worker(
    "sensor-processing",
    async (job) => {
      const reading = job.data;
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        await saveReading(
          {
            deviceId: reading.deviceId,
            soilMoisture: reading.soilMoisture,
            waterFlow: reading.waterFlow,
            temperature: reading.temperature,
          },
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
};
