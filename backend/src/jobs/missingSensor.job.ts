import cron from "node-cron";

import { AlertType } from "../constants/Alert";
import { hasActiveMissingAlert } from "../services/alert";
import { findMissingSensors } from "../services/missingSensor";
import mongoose from "mongoose";
import Device from "../models/Device";
import { alertQueue } from "../queues/Alert";

//later use mongoose bulk for 1 DB call
export const startMissingSensorJob = () => {
  return cron.schedule("* * * * *", async () => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      console.log("Checking missing sensors...");
      const devices = await findMissingSensors(session);
      if (Device.length > 0) {
        const devicePromises = devices.map(async (device) => {
          const id = device._id.toString();
          const existingAlert = await hasActiveMissingAlert(id, session);
          await Device.findByIdAndUpdate(
            id,
            {
              $set: { "hardware.telemetrySummary.status": "error" },
            },
            { session, runValidators: true },
          );
          if (!existingAlert) {
            await alertQueue.add("alert-reading", {
              deviceId: id,
              farmId: device.farmId.toString(),
              userId: device.userId.toString(),
              type: AlertType.MISSING_SENSOR_DATA,
              severity: "HIGH",
              message: `No reading received from ${device.nickName} for over 2 minutes`,
            });
          }
        });
        await Promise.all(devicePromises);
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
