import { Alert } from "../models/Alert";
import { AlertType } from "../constants/Alert";
import { ClientSession } from "mongoose";
import { io, userSockedIds } from "../socket/socket";

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
  const userId = payload.userId;
  const targetSocketID = userSockedIds[userId];
  if (targetSocketID && newAlert) {
    io.to(targetSocketID).emit("newAlert", {
      _id: newAlert._id,
      type: newAlert.type,
      status: newAlert.status,
      severity: newAlert.severity,
      message: newAlert.message,
      createdAt: newAlert.createdAt,
    });
  }
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
