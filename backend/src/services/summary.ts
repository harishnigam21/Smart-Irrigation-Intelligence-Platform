import { Sensor } from "../models/Sensor";
import { Alert } from "../models/Alert";
import { SensorReading } from "../models/SensorReadings";
import { getCache, setCache } from "./cache";
import { AuthRequest } from "../types/AuthRequest";
import { Farm } from "../models/Farm";
const CACHE_KEY = "system-summary";
export const getSystemSummary = async (req: AuthRequest) => {
  const cached = await getCache<any>(CACHE_KEY);

  if (cached) {
    return cached;
  }
  const totalSensors = await Sensor.distinct("_id", { userId: req.user!.id });
  const activeSensors = await Sensor.distinct("_id", {
    userId: req.user!.id,
    status: "active",
  });
  const totalFarms = await Farm.distinct("_id", { userId: req.user!.id });
  const activeAlerts = await Alert.distinct("_id", {
    userId: req.user!.id,
    status: true,
  });

  const readings = await SensorReading.find({ userId: req.user!.id })
    .sort({
      timestamp: -1,
    })
    .limit(100);

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
    totalSensors: totalSensors.length,
    activeSensors: activeSensors.length,
    totalFarms: totalFarms.length,
    activeAlerts: activeAlerts.length,
    averageTemperature: Number(averageTemperature.toFixed(2)),
    averageSoilMoisture: Number(averageSoilMoisture.toFixed(2)),
    averageWaterFlow: Number(averageWaterFlow.toFixed(2)),
  };

  await setCache(CACHE_KEY, summary, 30);

  return summary;
};
