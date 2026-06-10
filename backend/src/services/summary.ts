import { Sensor } from "../models/Sensor";
import { Alert } from "../models/Alert";
import { SensorReading } from "../models/SensorReadings";
import { getCache, setCache } from "./cache";
import { AuthRequest } from "../types/AuthRequest";
import { Farm } from "../models/Farm";
import Device from "../models/Device";
const CACHE_KEY = "system-summary";
export const getSystemSummary = async (req: AuthRequest) => {
  const cached = await getCache<any>(CACHE_KEY);

  if (cached) {
    return cached;
  }
  const totalSensors = await Sensor.find({ userId: req.user!._id })
    .select("_id deviceId pinNumber sensorType status lastSeen")
    .lean();

  const totalDevices = await Device.find({ userId: req.user!._id })
    .select(
      "_id farmId nickName macAddress farmPoint hardware.telemetrySummary.status hardware.telemetrySummary.lastSeen",
    )
    .lean();

  const totalFarms = await Farm.find({ userId: req.user!._id })
    .select("_id nickName soilType info.points")
    .lean();

  const activeAlerts = await Alert.distinct("_id", {
    userId: req.user!._id,
    status: true,
  }).lean();

  const readings = await SensorReading.find({ userId: req.user!._id })
    .populate("deviceId", "nickName")
    .sort({
      createdAt: -1,
    })
    .select("_id deviceId soilMoisture waterFlow temperature createdAt")
    .limit(100)
    .lean();
  const averageTemperature =
    readings.reduce((sum, item) => sum + item.temperature, 0) /
    (readings.length || 1);

  const averageSoilMoisture =
    readings.reduce((sum, item) => sum + item.soilMoisture, 0) /
    (readings.length || 1);

  const averageWaterFlow =
    readings.reduce((sum, item) => sum + item.waterFlow, 0) /
    (readings.length || 1);

  const summary = {
    farms: totalFarms,
    device: totalDevices,
    sensor: totalSensors,
    alerts: activeAlerts,
    reading: {
      data: readings,
      temperature: Number(averageTemperature.toFixed(2)),
      soilMoisture: Number(averageSoilMoisture.toFixed(2)),
      waterFlow: Number(averageWaterFlow.toFixed(2)),
    },
  };

  await setCache(CACHE_KEY, summary, 30);

  return summary;
};
