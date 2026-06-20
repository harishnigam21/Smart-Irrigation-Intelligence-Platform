import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FarmInSummary {
  _id: string;
  nickName: string;
  soilType: string;
  info: {
    points: [number, number][];
  };
}
export interface DeviceInSummary {
  _id: string;
  farmId: string;
  nickName: string;
  macAddress: string;
  farmPoint: [number, number];
  hardware: {
    telemetrySummary: {
      status: "online" | "offline" | "error";
      lastSeen: Date;
    };
  };
}
export interface SensorInSummary {
  _id: string;
  deviceId: string;
  pinNumber: number;
  sensorType: string;
  status: string;
  lastSeen: Date;
}
export interface ReadingData {
  _id: string;
  deviceId: {
    _id: string;
    nickName: string;
  };
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
  createdAt: Date;
}
interface ReadingInSummary {
  data: ReadingData[];
  temperature: number;
  soilMoisture: number;
  waterFlow: number;
}
export interface Summary {
  farms: FarmInSummary[];
  device: DeviceInSummary[];
  sensor: SensorInSummary[];
  alerts: string[];
  reading: ReadingInSummary;
}
const initialState: Summary = {
  farms: [],
  device: [],
  sensor: [],
  alerts: [],
  reading: {
    data: [],
    temperature: 0,
    soilMoisture: 0,
    waterFlow: 0,
  },
};
const SummarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<Summary>) => {
      const data = action.payload;
      state.alerts = data.alerts;
      state.device = data.device;
      state.farms = data.farms;
      state.reading = data.reading;
      state.sensor = data.sensor;
    },
    addReading: (state, action: PayloadAction<ReadingData>) => {
      if (!action.payload) {
        return;
      }
      const readingDateArray = state.reading.data;
      if (readingDateArray) {
        if (readingDateArray.length >= 10) {
          state.reading.data = readingDateArray.slice(0, 9);
        }
        state.reading.data.unshift(action.payload);
      } else {
        state.reading.data = [action.payload];
      }
    },
    setReading: (state, action: PayloadAction<ReadingData[]>) => {
      if (!action.payload) {
        return;
      }
      state.reading.data = action.payload;
    },
    setAlertID: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        return;
      }
      state.alerts.unshift(action.payload);
    },
    addSensor: (state, action: PayloadAction<SensorInSummary>) => {
      if (action.payload) state.sensor.unshift(action.payload);
    },
    addFarm: (state, action: PayloadAction<FarmInSummary>) => {
      if (action.payload) state.farms.unshift(action.payload);
    },
  },
});
export const {
  setSummary,
  addReading,
  setReading,
  setAlertID,
  addSensor,
  addFarm,
} = SummarySlice.actions;
export default SummarySlice.reducer;
