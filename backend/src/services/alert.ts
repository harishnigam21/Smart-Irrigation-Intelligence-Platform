import { Alert } from "../models/Alert";
import { AlertType } from "../constants/Alert";
import mongoose, { ClientSession } from "mongoose";
import { io, userSockedIds } from "../socket/socket";
import { SystemMetrics } from "../models/SystemMetrics";

export interface CreateAlertInput {
  deviceId: string;
  farmId: string;
  userId: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
}

export const createAlert = async (payload: CreateAlertInput) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [newAlert] = await Alert.create([payload], { session });
    if (newAlert) {
      await SystemMetrics.findOneAndUpdate(
        { userId: newAlert.userId },
        {
          $addToSet: { activeSensors: newAlert._id },
        },
        { upsert: true, session },
      );
    }
    await newAlert.populate("deviceId", "_id nickName");
    await session.commitTransaction();
    const userId = newAlert.userId.toString();
    const targetSocketID = userSockedIds[userId];
    if (targetSocketID && newAlert) {
      io.to(targetSocketID).emit("newAlert", {
        _id: newAlert._id,
        type: newAlert.type,
        status: newAlert.status,
        severity: newAlert.severity,
        message: newAlert.message,
        createdAt: newAlert.createdAt,
        important: newAlert.important,
        star: newAlert.star,
        deleted: newAlert.deleted,
        deviceId: newAlert.deviceId,
      });
    }
    return newAlert;
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
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

// export const updateSensorLastSeen = async (
//   deviceId: string,
//   session: ClientSession,
// ) => {
//   const targetDeviceId = new mongoose.Types.ObjectId(deviceId);
//   const currentTimestamp = new Date();
//   await Device.updateOne(
//     { _id: targetDeviceId },
//     {
//       $set: {
//         "hardware.telemetrySummary.lastSeen": currentTimestamp,
//         "hardware.telemetrySummary.status": "online",
//       },
//     },
//     { session },
//   );
//   await Sensor.updateMany(
//     { deviceId: targetDeviceId },
//     {
//       $set: {
//         lastSeen: currentTimestamp,
//         status: "active",
//       },
//     },
//     { session },
//   );

//   await Alert.deleteMany(
//     {
//       deviceId,
//       type: AlertType.MISSING_SENSOR_DATA,
//     },
//     { session },
//   );
// };
