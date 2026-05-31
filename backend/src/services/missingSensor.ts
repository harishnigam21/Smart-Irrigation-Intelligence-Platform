import { Sensor } from "../models/Sensor";

export const findMissingSensors = async () => {
  const twoMinutesAgo = new Date(
    Date.now() - 2 * 60 * 1000
  );

  return Sensor.find({
    lastSeen: {
      $lt: twoMinutesAgo,
    },
    status: "active",
  });
};