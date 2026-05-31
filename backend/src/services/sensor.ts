import { Sensor } from "../models/Sensor";

export const updateSensorLastSeen = async (
  sensorId: string
) => {
  await Sensor.findOneAndUpdate(
    { sensorId },
    {
      lastSeen: new Date(),
      status: "active",
    },
    {
      upsert: true,
      new: true,
    }
  );
};