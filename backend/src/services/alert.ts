import { Alert } from "../models/Alert";
import { AlertType } from "../constants/Alert";
import { Sensor } from "../models/Sensor";
import mongoose, { ClientSession } from "mongoose";
import Device from "../models/Device";

interface CreateAlertInput {
  deviceId: string;
  farmId: string;
  userId: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
}

export const createAlert = async (
  payload: CreateAlertInput,
  session: ClientSession,
) => {
  const [newAlert] = await Alert.create([payload], { session });
  return newAlert;
};
export const hasActiveMissingAlert = async (
  deviceId: string,
  session: ClientSession,
) => {
  return Alert.findOne({
    deviceId,
    type: AlertType.MISSING_SENSOR_DATA,
  }).session(session);
};

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

  await Alert.deleteMany({
    deviceId,
    type: AlertType.MISSING_SENSOR_DATA,
  });
};
