import { AlertType } from "../constants/Alert";

interface SensorReadingData {
  sensorId: string;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
}

export const detectAnomalies = (reading: SensorReadingData) => {
  const alerts = [];

  if (reading.temperature > 60) {
    alerts.push({
      type: AlertType.HIGH_TEMPERATURE,
      severity: "HIGH",
      message: `Temperature reached ${reading.temperature}°C`,
    });
  }

  if (reading.soilMoisture <= 5) {
    alerts.push({
      type: AlertType.LOW_SOIL_MOISTURE,
      severity: "HIGH",
      message: `Soil moisture dropped to ${reading.soilMoisture}%`,
    });
  }

  if (reading.soilMoisture > 95) {
    alerts.push({
      type: AlertType.HIGH_SOIL_MOISTURE,
      severity: "MEDIUM",
      message: `Soil moisture reached ${reading.soilMoisture}%`,
    });
  }

  if (reading.waterFlow < 0) {
    alerts.push({
      type: AlertType.INVALID_WATER_FLOW,
      severity: "HIGH",
      message: `Invalid water flow value: ${reading.waterFlow}`,
    });
  }

  return alerts;
};
