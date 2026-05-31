import { Worker } from "bullmq";

import { saveReading } from "../services/reading";
import { detectAnomalies } from "../services/anomaly";
import { createAlert } from "../services/alert";
import { updateSensorLastSeen } from "../services/sensor";
import { redisConfig } from "../config/redis";

export const startSensorWorker = () => {
  return new Worker(
    "sensor-processing",
    async (job) => {
      const reading = job.data;

      await saveReading({
        sensorId: reading.sensorId,
        sensorLocalId: reading.sensorLocalId,
        timestamp: new Date(reading.timestamp),
        soilMoisture: reading.soilMoisture,
        waterFlow: reading.waterFlow,
        temperature: reading.temperature,
      });

      await updateSensorLastSeen(reading.sensorId);

      const anomalies = detectAnomalies(reading);

      for (const anomaly of anomalies) {
        await createAlert({
          sensorId: reading.sensorId,
          sensorLocalId: reading.sensorLocalId,
          farmId: reading.farmId,
          userId: reading.userId,
          type: anomaly.type,
          severity: anomaly.severity as "LOW" | "MEDIUM" | "HIGH",
          message: anomaly.message,
        });
      }
    },
    {
      connection: redisConfig,
    },
  );
};
