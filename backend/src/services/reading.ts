import { SensorReading } from "../models/SensorReading";

export const saveReading = async (data: {
  sensorId: string;
  sensorLocalId: string;
  timestamp: Date;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
}) => {
  return SensorReading.create(data);
};
