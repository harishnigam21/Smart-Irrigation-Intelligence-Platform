import { ClientSession } from "mongoose";
import Device from "../models/Device";

export const findMissingSensors = async (session: ClientSession) => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

  return Device.find({
    "hardware.telemetrySummary.lastSeen": {
      $lt: twoMinutesAgo,
    },
    "hardware.telemetrySummary.status": "online",
  }).session(session);
};
