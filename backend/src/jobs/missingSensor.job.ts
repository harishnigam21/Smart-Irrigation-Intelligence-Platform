import cron from "node-cron";

import { AlertType } from "../constants/Alert";
import { createAlert, hasActiveMissingAlert } from "../services/alert";
import { findMissingSensors } from "../services/missingSensor";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";
import Device from "../models/Device";

//later use mongoose bulk for 1 DB call
export const startMissingSensorJob = () => {
  return cron.schedule("* * * * *", async () => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      console.log("Checking missing sensors...");
      const devices = await findMissingSensors(session);
      for (const device of devices) {
        const id = device._id.toString();
        const existingAlert = await hasActiveMissingAlert(id, session);
        await Device.findByIdAndUpdate(
          id,
          {
            $set: { "hardware.telemetrySummary.status": "error" },
          },
          { session, runValidators: true },
        );
        if (existingAlert) continue;
        const alert = await createAlert(
          {
            deviceId: id,
            farmId: device.farmId.toString(),
            userId: device.userId.toString(),
            type: AlertType.MISSING_SENSOR_DATA,
            severity: "HIGH",
            message: `No reading received from ${device.nickName} for over 2 minutes`,
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
      console.error("From Missing Sensor Job", error);
    } finally {
      await session.endSession();
    }
  });
};
