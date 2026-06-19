import mongoose from "mongoose";
import { ISensorReading, SensorReading } from "../models/SensorReadings";
import { io, userSockedIds } from "../socket/socket";
import { AuthRequest } from "../types/AuthRequest";
export type ReadingType = Pick<
  ISensorReading,
  "soilMoisture" | "waterFlow" | "temperature"
> & {
  deviceId: string;
  userId: string;
};
export const getReadingDB = async (
  query: Record<string, string>,
  req: AuthRequest,
) => {
  const reading = await SensorReading.find({ ...query, userId: req.user!._id })
    .populate("deviceId", "nickName")
    .sort({ createdAt: -1 })
    .limit(10)
    .lean<{
      _id: string;
      deviceId: { nickName: string };
      soilMoisture: number;
      waterFlow: number;
      temperature: number;
      createdAt: Date;
    }>();
  return reading;
};
export const saveReading = async (data: ReadingType, userId: string) => {
  const newReading = await SensorReading.create(data);
  await newReading.populate("deviceId", "nickName");
  const device = newReading.deviceId as unknown as {
    _id: mongoose.Types.ObjectId;
    nickName: string;
  };
  const targetSocketID = userSockedIds[userId];
  if (targetSocketID && newReading) {
    io.to(targetSocketID).emit("newReading", {
      _id: newReading._id,
      deviceId: {
        _id: device._id,
        nickName: device.nickName,
      },
      soilMoisture: newReading.soilMoisture,
      waterFlow: newReading.waterFlow,
      temperature: newReading.temperature,
      createdAt: newReading.createdAt,
    });
  }
  return newReading;
};
