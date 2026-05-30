export interface SensorReadingPayload {
  sensorLocalId: string;
  timestamp: string;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
}
