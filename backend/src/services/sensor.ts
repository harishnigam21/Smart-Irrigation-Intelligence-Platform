import mongoose from "mongoose";
import Device from "../models/Device";
import { Sensor } from "../models/Sensor";

export const updateSensorLastSeen = async (deviceId: string) => {
  const targetDeviceId = new mongoose.Types.ObjectId(deviceId);
  const currentTimestamp = new Date();
  const session = await mongoose.startSession();
  try {
    await Device.updateOne(
      { _id: targetDeviceId },
      {
        $set: {
          "hardware.telemetrySummary.lastSeen": currentTimestamp,
          "hardware.telemetrySummary.status": "online",
        },
      },
      { session },
    );
    await Sensor.updateMany(
      { deviceId: targetDeviceId },
      {
        $set: {
          lastSeen: currentTimestamp,
          status: "active",
        },
      },
      { session },
    );
  } catch (error) {
    await session.abortTransaction();
    console.error("Error at Sensor Service for updateSensorLastSeen", error);
  } finally {
    await session.endSession();
  }
};
