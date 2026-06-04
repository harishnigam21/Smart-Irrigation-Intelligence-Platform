import mongoose, { ClientSession } from "mongoose";
import Device from "../models/Device";
import { Sensor } from "../models/Sensor";

export const updateSensorLastSeen = async (
  deviceId: string,
  session: ClientSession,
) => {
  const targetDeviceId = new mongoose.Types.ObjectId(deviceId);
  const currentTimestamp = new Date();
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
};
