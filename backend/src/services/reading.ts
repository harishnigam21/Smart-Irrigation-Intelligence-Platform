import { ClientSession } from "mongoose";
import { ISensorReading, SensorReading } from "../models/SensorReadings";
export type ReadingType = Pick<
  ISensorReading,
  "deviceId" | "soilMoisture" | "waterFlow" | "temperature"
>;
export const saveReading = async (
  data: ReadingType,
  session: ClientSession,
) => {
  const [newReading] = await SensorReading.create([data], { session: session });
  return newReading;
};
