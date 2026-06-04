import { Alert } from "../models/Alert";
import { AlertType } from "../constants/Alert";
import { Sensor } from "../models/Sensor";
import { ClientSession } from "mongoose";

interface CreateAlertInput {
  sensorId: string;
  sensorLocalId: string;
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
export const hasActiveMissingAlert = async (sensorId: string) => {
  return Alert.findOne({
    sensorId,
    type: AlertType.MISSING_SENSOR_DATA,
  });
};

export const updateSensorLastSeen = async (sensorId: string) => {
  await Sensor.findOneAndUpdate(
    { sensorId },
    {
      lastSeen: new Date(),
      status: "active",
    },
    {
      upsert: true,
      new: true,
    },
  );

  await Alert.deleteMany({
    sensorId,
    type: AlertType.MISSING_SENSOR_DATA,
  });
};
