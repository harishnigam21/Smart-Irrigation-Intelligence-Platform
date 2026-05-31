import cron from "node-cron";

import { AlertType } from "../constants/Alert";
import { createAlert, hasActiveMissingAlert } from "../services/alert";
import { findMissingSensors } from "../services/missingSensor";

export const startMissingSensorJob = () => {
  return cron.schedule("* * * * *", async () => {
    console.log("Checking missing sensors...");

    const sensors = await findMissingSensors();

    for (const sensor of sensors) {
      const id = sensor._id.toString();
      const existingAlert = await hasActiveMissingAlert(id);

      if (existingAlert) continue;

      await createAlert({
        sensorId: id,
        sensorLocalId: sensor.sensorLocalId,
        farmId: sensor.farmId.toString(),
        userId: sensor.userId.toString(),
        type: AlertType.MISSING_SENSOR_DATA,
        severity: "HIGH",
        message: `No reading received from ${sensor.sensorLocalId} for over 2 minutes`,
      });
    }
  });
};
